/*
Cycle of 60 years:
- [0, 25): Growing
- [25, 50): Stable
- [50, 59 + 11/12): Decaying
- [59 + 11/12 , 59 + 11.5/12): Dead
- [59 + 11.5/12, 60): Rebirth
*/

const GROW_END = 25;
const STABLE_END = 50;
const DECAY_END = 59 + 11/12;
const DEAD_END = 59 + 11.5/12;
const CYCLE_END = 60;

// Shape: 1 - (1 - px)^n = py
function getGrowthFunc(px, py) {
  // Solving for n:
  // (1 - px)^n = 1 - py
  // n = log_{1 - px} (1 - py)
  // n = ln(1 - py) / ln(1 - px)
  const n = Math.log(1 - py) / Math.log(1 - px);
  return x => 1 - Math.pow(1 - x, n);
}

class Brain {
  constructor(visualTraits, layersConfig, weights_b64) {
    const { model, inputDim } = loadModel(layersConfig, weights_b64);
    this.model = model;
    this.inputDim = inputDim;
  
    this.iteration = 0;
    this.stage = 0;    

    const ts1 = new Date(parseInt(visualTraits.birthYear), 0, 1).getTime();
    const ts2 = new Date(parseInt(visualTraits.birthYear) + 1, 0, 1).getTime();
    this.birthDate = new Date(Math.floor((ts1 + ts2) / 2));

    console.log(this.birthDate);
    
    const lifeCycle = LifeCycle.filter(e => e[0] == visualTraits.lifeCycle)[0][2];
    this.growSpeed = 365.0 / lifeCycle;

    this.growthFunc = getGrowthFunc(0.4, 0.8);
  }

  updateAge(time) {
    const deltaTimestamp = time.getTime() - this.birthDate.getTime();
    console.log(deltaTimestamp);
    const deltaYear = deltaTimestamp / (1000 * 60 * 60 * 24 * 365);
    const age = deltaYear * this.growSpeed;
    this.iteration = Math.floor(age / CYCLE_END);        
    const cycleTime = age - this.iteration * CYCLE_END;

    let growth = 0;
    if (cycleTime < GROW_END) {
      let x = map(cycleTime, 0, GROW_END, 0, 1);
      growth = this.growthFunc(x);
      this.stage = 1;
      this.stageRatio = map(cycleTime, 0, GROW_END, 0, 1);
    } else if (cycleTime < STABLE_END) {
      growth = 1;
      this.stage = 2;
      this.stageRatio = map(cycleTime, GROW_END, STABLE_END, 0, 1);
    } else if (cycleTime < DECAY_END) {
      growth = map(cycleTime, STABLE_END, DECAY_END, 1, 0);
      this.stage = 3;
      this.stageRatio = map(cycleTime, STABLE_END, DECAY_END, 0, 1);
    } else if (cycleTime < DEAD_END) {
      growth = 0;
      this.stage = 4;
      this.stageRatio = map(cycleTime, DECAY_END, DEAD_END, 0, 1);
    } else if (cycleTime < CYCLE_END) {
      growth = 0;
      this.stage = 5;
      this.stageRatio = map(cycleTime, DEAD_END, CYCLE_END, 0, 1);
    }

    this.model.updateNeurons(growth, this.iteration);
  }

  getBrainStatus() {
    return {
      totalNeurons: this.model.getTotalNeurons(),
      neuronsLife: this.model.getNeuronsLife(),
      stage: this.stage,
      inputDim: this.inputDim,
      stageRatio: this.stageRatio,
    };
  }
  
  classifyImage(pixels) {
    const img_tensor = new Tensor(pixels, 1, pixels.length);
  
    const result_tensor = this.model.forward(img_tensor);
    const result = result_tensor.mat[0];
   
    return result;
  }  
}
