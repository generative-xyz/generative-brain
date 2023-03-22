class Tensor {
  constructor(data, n, m) {
    this.n = n;
    this.m = m;
    this.mat = [];
    
    let p = 0;
    for(let i = 0; i < this.n; ++i) {
      this.mat.push([]);
      for(let j = 0; j < this.m; ++j) {
        this.mat[i].push(p < data.length ? data[p] : 0.0);
        p += 1;
      }
    }
    return this;
  }

  copy() {
    return new Tensor(this.mat.flat(), this.n, this.m);
  }
}

// The "Tensorfake" library
class tfake {
  static __linear = (x) => x;
  static __relu = (x) => Math.max(x, 0);
  static __leaky_relu = (x) => x > 0 ? x : x * 0.2;
  static __sigmoid = (x) => 1 / (1 + Math.exp(-x));
  static __tanh = (x) => Math.tanh(x);

  static __apply_unary_op(a, op) {
    const res = a.copy();
    for(let i = 0; i < res.n; ++i) {
      for(let j = 0; j < res.m; ++j) {
        res.mat[i][j] = op(res.mat[i][j]);
      }
    }
    return res;
  }

  static linear = (a) => tfake.__apply_unary_op(a, tfake.__linear);
  static relu = (a) => tfake.__apply_unary_op(a, tfake.__relu);
  static leaky_relu = (a) => tfake.__apply_unary_op(a, tfake.__leaky_relu);
  static sigmoid = (a) => tfake.__apply_unary_op(a, tfake.__sigmoid);
  static tanh = (a) => tfake.__apply_unary_op(a, tfake.__tanh);
  
  static __add = (a, b) => a + b;
  static __mul = (a, b) => a * b;

  static __apply_binary_op = (a, b, op) => {
    if (typeof b !== 'object') {
      b = new Tensor([b], 1, 1);
    }

    const res = a.copy();
    for(let i = 0; i < res.n; ++i) {
      for(let j = 0; j < res.m; ++j) {
        res.mat[i][j] = op(res.mat[i][j], b.mat[i%b.n][j%b.m]);
      }
    }
    return res;
  }

  static mul = (a, b) => tfake.__apply_binary_op(a, b, tfake.__mul);
  static add = (a, b) => tfake.__apply_binary_op(a, b, tfake.__add);

  static matMul(a, b) {
    const res = new Tensor([], a.n, b.m);
    for(let i = 0; i < res.n; ++i) {
      for(let j = 0; j < res.m; ++j) {
        for(let k = 0; k < a.m; ++k) {
          res.mat[i][j] += a.mat[i][k] * b.mat[k][j];
        }
      }
    }
    return res;
  }

  static softmax(a) {
    const res = tfake.__apply_unary_op(a, x => Math.exp(x));
    const sum_e = res.mat.flat().reduce((a, b) => a + b);
    for(let i = 0; i < a.n; ++i) {
      for(let j = 0; j < a.m; ++j) {
        res.mat[i][j] /= sum_e;
      }
    }
    return res;
  }
}

class RescaleLayer {
  constructor(scale, offset) {
    this.scale = scale;
    this.offset = offset;
  }

  forward(x) {
    return tfake.add(tfake.mul(x, this.scale), this.offset);
  }
}

class FlattenLayer {
  constructor() {}

  forward(x) {
    return x.map(e => e.flat());
  }
}

class DenseLayer {
  constructor(out_dim, activation, w, b) {
    this.out_dim = out_dim;
    this.activation = activation;
    this.w = w;
    this.b = b;
  }

  forward(x) {
    const y = tfake.add(tfake.matMul(x, this.w), this.b);
    const z = (this.activation == null) ? y : this.activation(y);
    return z;
  }
}

class MultilayerPerceptron {
  constructor(preprocessLayers, hiddenLayers, outputLayer) {
    this.preprocessLayers = preprocessLayers;
    this.hiddenLayers = hiddenLayers;
    this.outputLayer = outputLayer;

    this.totalNeurons = this.hiddenLayers.map(e => e.out_dim);
  }

  updateNeurons(t, iteration) {
    const neurons = clone(this.totalNeurons);
    const sumNeurons = neurons.reduce((a, b) => a + b);

    const sumInactiveNeurons = sumNeurons * (1 - t);
    for(let iter = 0; iter < sumInactiveNeurons; ++iter) {
      const ratio = neurons.map((x, i) => (x-1) / this.totalNeurons[i]);
      const ind = ratio.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
      neurons[ind] -= Math.min(sumInactiveNeurons - iter, 1);
    }

    this.neuronsLife = [];
    for(let i = 0; i < neurons.length; ++i) {
      const seed = (iteration + 1) * 100 + i;
      randomSeed(seed);
      
      const order = [];
      for(let j = 0; j < this.totalNeurons[i]; ++j) {
        order.push(j);
      }
      shuffle(order);
  
      const life = Array(this.totalNeurons[i]).fill(0);
      for(let j = 0; j < neurons[i]; ++j) {
        life[order[j]] = Math.min(neurons[i] - j, 1);
      }
      this.neuronsLife.push(life);
    }
  }

  getTotalNeurons() {
    return clone(this.totalNeurons);
  }

  getNeuronsLife() {
    return clone(this.neuronsLife);
  }

  forward(x) {
    for (const layer of this.preprocessLayers) {
      x = layer.forward(x);
    }
    for (const [i, layer] of this.hiddenLayers.entries()) {
      x = layer.forward(x);
      const life = new Tensor(this.neuronsLife[i], 1, x.m);
      x = tfake.mul(x, life);
    }
    x = this.outputLayer.forward(x);
    return tfake.softmax(x);
  }
}

function getActivation(name) {
  switch (name) {
    case "relu": 
      return tfake.relu;
    case "sigmoid": 
      return tfake.sigmoid;
    case "tanh": 
      return tfake.tanh;
    case "leaky_relu": 
      return tfake.leaky_relu;
    case "linear":
    default:
      return tfake.linear;
  }  
}

function loadModel(layersConfig, weights_b64) {
  const preprocessLayers = [];
  const hiddenLayers = [];

  const weights = base64ToFloatArray(weights_b64);

  let dim = null;
  let p = 0;
  let inputDim = [];
  for(const info of layersConfig.config.layers) {
    if (info.class_name == "InputLayer") {
      dim = info.config.batch_input_shape.slice(1);
      inputDim = dim;
    } else if (info.class_name == "Rescaling") {
      preprocessLayers.push(new RescaleLayer(info.config.scale, info.config.offset))
    } else if (info.class_name == "Flatten") {
      dim = [dim.reduce((a, b) => a * b)]
    } else if (info.class_name == "Dense") {
      const nxt_dim = [info.config.units];
      const w_size = dim[0] * nxt_dim[0];
      const b_size = nxt_dim[0];

      const w_array = weights.subarray(p, p + w_size);
      p += w_size;
      const b_array = weights.subarray(p, p + b_size);
      p += b_size;

      const w_tensor = new Tensor(w_array, dim[0], nxt_dim[0]);
      const b_tensor = new Tensor(b_array, 1, nxt_dim[0]);
      const activation = getActivation(info.config.activation);

      hiddenLayers.push(new DenseLayer(nxt_dim[0], activation, w_tensor, b_tensor));

      dim = nxt_dim;
    }
  }

  const outputLayer = hiddenLayers.pop();

  const model = new MultilayerPerceptron(preprocessLayers, hiddenLayers, outputLayer);

  return { model, inputDim };
}

// Modified from https://gist.github.com/sketchpunk/f5fa58a56dcfe6168a9328e7c32a4fd4
function base64ToFloatArray(base64) {
  // Base64 string converted to a char array
  const blob	= window.atob(base64);
  // How many floats can be made, but be even
	const fLen = blob.length / Float32Array.BYTES_PER_ELEMENT;
  // ArrayBuffer/DataView to convert 4 bytes into 1 float.          
  const dView = new DataView( new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT) );
  // Final Output at the correct size
  const fAry = new Float32Array(fLen);
  // Position
  let p = 0; 

  for(let j=0; j < fLen; j++){
    p = j * 4;
    for(let b = 0; b < 4; ++b) {
      dView.setUint8(b,blob.charCodeAt(p+b));
    }
    fAry[j] = dView.getFloat32(0,true);
  }
  return fAry;
}
