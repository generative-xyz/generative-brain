class Node {
  constructor(p, v, size, col) {
    this.p = p;
    this.v = v;
    this.size = size;
    this.col = col;
  }
  
  update() {
    this.p.add(this.v);
  }
  
  draw(canvas, paperColor, shape, fillMode) {
    const {x, y} = this.p;
    
    let nodeColor;
    let strokeColor;
    if (fillMode == 1) {
      nodeColor = strokeColor = this.col;
    } else if (fillMode == 2) {
      nodeColor = addAlpha(paperColor,1);
      strokeColor = this.col;
    } else {
      nodeColor = addAlpha(paperColor,0);
      strokeColor = addAlpha(this.col,1);
    }
    
    canvas.stroke(strokeColor);
    canvas.fill(nodeColor);
    if (shape == 1) {
      canvas.ellipse(x,y,this.size);
    } else if (shape == 2) {
      canvas.rect(x,y,this.size*7/8);
    } else if (shape == 3) {
      canvas.beginShape();
      canvas.vertex(x-this.size*4/7,y);
      canvas.vertex(x,y-this.size*4/7);
      canvas.vertex(x+this.size*4/7,y);
      canvas.vertex(x,y+this.size*4/7);
      canvas.endShape(CLOSE);
    } else {
      let n = 4;
      let theta = TAU/n;
      let innerRadius = this.size/5;
      let outerRadius = this.size*4/7;
      let rotation = PI;
      canvas.beginShape();
      for (let i=0; i<n; i++) {
        canvas.vertex(x+cos(i*theta+rotation)*outerRadius, y+sin(i*theta+rotation)*outerRadius);
        canvas.vertex(x+cos((i+0.5)*theta+rotation)*innerRadius, y+sin((i+0.5)*theta+rotation)*innerRadius);
      }
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
  
  draw(canvas, paperColor) {
    const [p1, p2] = this.getEndpoints();
    
    const {x: x1, y: y1} = p1;
    const {x: x2, y: y2} = p2;
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
  constructor(gradientFill, totalNeurons, wall) {
    this.wall = wall;

    const n = totalNeurons.length;

    this.nodes = [];
    for(let i = 0; i < n; ++i) {
      for(let j = 0; j < totalNeurons[i]; ++j) {
        const pos = createVector(random(wall.xLeft, wall.xRight), random(wall.yTop, wall.yBottom));
        const vel = getRandomVector(0.1, 0.5);
        const size = random(5, 12.5);
        this.nodes.push(new Node(pos, vel, size, gradientFill[i]));        
      }
    }
    
    const lineGradientFill = clone(gradientFill);
    lineGradientFill.unshift(gradientFill[0]);
    lineGradientFill.push(gradientFill[gradientFill.length-1]);
    
    this.lines = [];
    for(let i = 0; i <= n; ++i) {
      const prev = (i == 0) ? 1 : totalNeurons[i-1];
      const nxt = (i == n) ? 1 : totalNeurons[i];
      const count = prev * nxt;

      for(let j = 0; j < count; ++j) {
        const pos = createVector(random(wall.xLeft, wall.xRight), random(wall.yTop, wall.yBottom));
        const len = random(10, 25);
        const angle = random(TAU);
        const v = getRandomVector(0.1, 0.5);
        const angV = random(0.005, 0.01);
        this.lines.push(new Line(pos, len, angle, v, angV, lineGradientFill[i], lineGradientFill[i+1]));
      }
    }
    
  }
  
  reflectNode(node) {
    const {xLeft, yTop, xRight, yBottom} = this.wall;
    const {p, v} = node;
    if ((p.x < xLeft && v.x < 0) || (p.x > xRight && v.x > 0)) v.x = -v.x;
    if ((p.y < yTop && v.y < 0) || (p.y > yBottom && v.y > 0)) v.y = -v.y;
  }

  reflectLine(line) {
    const {xLeft, yTop, xRight, yBottom} = this.wall;
    const [p1, p2] = line.getEndpoints();
    const v = line.v;
    
    if ((min(p1.x, p2.x) < xLeft && v.x < 0) || (max(p1.x, p2.x) > xRight && v.x > 0)) v.x = -v.x;
    if ((min(p1.y, p2.y) < yTop && v.y < 0) || (max(p1.y, p2.y) > yBottom && v.y > 0)) v.y = -v.y;
  }
  
  update() {
    for (const node of this.nodes) {
      node.update();
      this.reflectNode(node);
    }    
    for (const line of this.lines) {
      line.update();
      this.reflectLine(line);
    }    
  }
  
  draw(canvas, paperColor, shape, fillMode) {
    for (const line of this.lines) {
      line.draw(canvas, paperColor);
    }
    for (const node of this.nodes) {
      node.draw(canvas, paperColor, shape, fillMode);
    }
  }
}