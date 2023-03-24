class Node {
  constructor(p, v, size, col, shape) {
    this.p = p;
    this.v = v;
    this.size = size;
    this.shape = shape;
    this.col = col;
  }

  getRadius() {
    if (shape == 1) return this.size * 1/2;
    if (shape == 2) return this.size * 7/16;
    if (shape == 3) return this.size * 4/7;
    if (shape == 4) return this.size * 4/7;
    return 0;
  }
  
  update() {
    this.p.add(this.v);
  }
  
  draw(canvas, paperColor, fillMode, scale) {
    const x = this.p.x * scale;
    const y = this.p.y * scale;
    const size = this.size * scale;
    const {col, shape} = this;
    
    let nodeColor;
    let strokeColor;
    if (fillMode == 1) {
      nodeColor = strokeColor = col;
    } else if (fillMode == 2) {
      nodeColor = addAlpha(paperColor,1);
      strokeColor = col;
    } else {
      nodeColor = addAlpha(paperColor,0);
      strokeColor = addAlpha(col,1);
    }
    
    let opacity = 1;

    canvas.stroke(addAlpha(strokeColor,map(opacity,0,1,0.25,1)));
    canvas.fill(addAlpha(nodeColor,map(opacity,0,1,0.15,1)));
    if (fillMode == 3) {
      canvas.fill(addAlpha(nodeColor,0));
    }
    if (shape == 1) {
      canvas.ellipse(x,y,size,size);
    } else if (shape == 2) {
      canvas.rect(x,y,size*7/8,size*7/8);
    } else if (shape == 3) {
      canvas.beginShape();
      canvas.vertex(x-size*4/7,y);
      canvas.vertex(x,y-size*4/7);
      canvas.vertex(x+size*4/7,y);
      canvas.vertex(x,y+size*4/7);
      canvas.endShape(CLOSE);
    }
  }
}

class Line {
  constructor(center, len, angle, v, angV, c1, c2) {
    this.center = center;
    this.len = len;
    this.angle = angle;
    this.v = v;
    this.angV = angV;
    this.c1 = c1;
    this.c2 = c2;    
  }
  
  getEndpoints() {
    const delta = createVector(this.len/2 * cos(this.angle), this.len/2 * sin(this.angle));
    const p1 = Vector.add(this.center, delta);
    const p2 = Vector.sub(this.center, delta);
    return [p1, p2];
  }
  
  update() {
    this.center.add(this.v);
    this.angle += this.angV;
  }
  
  draw(canvas, scale) {
    const [p1, p2] = this.getEndpoints();
    
    const x1 = p1.x * scale;
    const y1 = p1.y * scale;
    const x2 = p2.x * scale;
    const y2 = p2.y * scale;
    const color1 = this.c1;
    const color2 = this.c2;
    const opacity = 1;
  
    // linear gradient from start to end of line
    var grad = canvas.drawingContext.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    canvas.drawingContext.strokeStyle = grad;
    canvas.drawingContext.globalAlpha = opacity; // set opacity
    canvas.line(x1, y1, x2, y2);
    canvas.drawingContext.globalAlpha = 1; // reset opacity to default value
  }
}

function getRandomVector(minMag, maxMag) {
  const angle = random(TAU);
  const mag = random(minMag, maxMag);
  return createVector(mag * cos(angle), mag * sin(angle));
}

class ParticleSystem {
  constructor(gradientFill, totalNeurons, wall, nodeShape, maxR) {
    this.wall = wall;
    this.maxR = maxR;

    const n = totalNeurons.length;

    this.nodes = [];
    for(let i = 0; i < n; ++i) {
      const layerNodes = [];
      const count = totalNeurons[i] * 0.25;
      for(let j = 0; j < count; ++j) {
        const pos = createVector(random(wall.xLeft, wall.xRight), random(wall.yTop, wall.yBottom));
        const vel = getRandomVector(0.02 * maxR, 0.05 * maxR);
        const size = random(10, 25) * maxR;
        layerNodes.push(new Node(pos, vel, size, gradientFill[i], nodeShape));        
      }
      this.nodes.push(layerNodes);
    }
    
    const lineGradientFill = clone(gradientFill);
    lineGradientFill.unshift(gradientFill[0]);
    lineGradientFill.push(gradientFill[gradientFill.length-1]);
    
    this.lines = [];
    for(let i = 0; i <= n; ++i) {
      const layerLines = [];

      const prev = (i == 0) ? 1 : totalNeurons[i-1];
      const nxt = (i == n) ? 1 : totalNeurons[i];
      const count = prev * nxt * 1.5;

      for(let j = 0; j < count; ++j) {
        const pos = createVector(random(wall.xLeft, wall.xRight), random(wall.yTop, wall.yBottom));
        const len = random(5 * maxR, 10 * maxR);
        const angle = random(TAU);
        const v = getRandomVector(0.02 * maxR, 0.05 * maxR);
        const angV = random(0.0002, 0.001);
        layerLines.push(new Line(pos, len, angle, v, angV, lineGradientFill[i], lineGradientFill[i+1]));
      }

      this.lines.push(layerLines)
    }
  }
  
  reflectNode(node) {
    const {xLeft, yTop, xRight, yBottom} = this.wall;
    const {p, v} = node;
    const r = node.getRadius();
    if ((p.x - r < xLeft && v.x < 0) || (p.x + r > xRight && v.x > 0)) v.x = -v.x;
    if ((p.y - r < yTop && v.y < 0) || (p.y + r > yBottom && v.y > 0)) v.y = -v.y;
  }

  reflectLine(line) {
    const {xLeft, yTop, xRight, yBottom} = this.wall;
    const [p1, p2] = line.getEndpoints();
    const v = line.v;
    
    if ((min(p1.x, p2.x) < xLeft && v.x < 0) || (max(p1.x, p2.x) > xRight && v.x > 0)) v.x = -v.x;
    if ((min(p1.y, p2.y) < yTop && v.y < 0) || (max(p1.y, p2.y) > yBottom && v.y > 0)) v.y = -v.y;
  }
  
  update() {
    for(const layerLines of this.lines) {
      for (const line of layerLines) {
        line.update();
        this.reflectLine(line);
      }
    }

    for(const layerNodes of this.nodes) {
      for (const node of layerNodes) {
        node.update();
        this.reflectNode(node);
      }    
    }    
  }
  
  draw(canvas, paperColor, fillMode, drawRatio, maxR) {
    const scale = maxR / this.maxR;

    for(const layerLines of this.lines) {
      const drawCount = layerLines.length * drawRatio;
      for (let i = 0; i < drawCount; ++i) {
        layerLines[i].draw(canvas, scale);
      }
    }

    for(const layerNodes of this.nodes) {
      const drawCount = layerNodes.length * drawRatio;
      for (let i = 0; i < drawCount; ++i) {
        layerNodes[i].draw(canvas, paperColor, fillMode, scale);
      }
    }
  }
}
