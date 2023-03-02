const modelSeed = '1';
// const modelSeed = toString(Date.now());

new Q5("global");

let border;  // screen padding
let maxR;
let inputImg;
let img;
let drewInputWindow = false;
let drewResultWindow = false;
let drewInfoWindow = false;
let drewAnim = true;
let isProcessPhase;
let processingLayer;
let animCanvas;  // canvas for animation
let animLineCanvas;
let progress;
let animationLoopCount;
let animationLoopMax;

let xsize;  // spacing between layers
let ysize;  // spacing between rows
let layerNum;  // number of hidden layers
let maxNodeGrow;  // max nodes in one layer in growing state
let maxNodeDecay;  // max nodes in one layer in decay state
let nodesFinal = [];  // array of amount of nodes for each layer when final
let nodesPresent = [];  // array of amount of nodes for each layer at the moment
let state; let liveState = [' ','Growing','Decay','Dead']  // 1-growing, 2-decay, 3-dead
let shape; let activationFunction = [' ','Sigmoid','ReLU','LeakyReLU','Tanh'];  // 1-ellipse, 2-square, 3-diamond, 4-triangle
let shapeStroke;  // 0.75, 2, 4
let lineStroke;  // 0.75, 1.25, 2
let nodeSize;
let classNum;  // number of classes will be classified
let inputNum;  // number of input nodes
let nodeCanvas;  // canvas for drawing nodes
let lineCanvas;  // canvas for drawing lines
let patternCanvas;  // canvas for drawing pattern
let popupCanvas;  // canvas for popup window
let infoCanvas;  // canvas for info window
let nodeColor;  // color of node's fill
let innerColor;  // color of inner fill
let strokeColor;  // color of node and line's stroke
let nodeDecayColor;
let innerDecayColor;
let strokeDecayColor;
let paperColor;  // color of paper
let paperBG; let framework = [' ','Theano','Torch','TensorFlow','Caffe'];  // 1-white, 2-black, 3-blueprint, 4-yellow brown
let colorPalette; let dataSet = [' ','MNIST','CIFAR','IMAGENET','IRIS'];  // 1-no fill, 2-basic inner fill, 3-yellow inner fill, 4-red inner fill 
let spacing;  // pattern spacing
let pattern; let paper = ['Plain','Ruled','Dotted','Squared'];  // 0-Plain, 1-Ruled, 2-Dotted, 3-Squared

let seed;  // 1-2023
let architecture;  // random, random triangle, regular triangle, zigzag, symmetric, rectangle
let birthYear;  // 1943, 1951, 1957, 1969, 1970, 1980, 1982, 1986, 1988, 1997, 1998, 2002, 2009, 2012, 2014, 2015, 2016, 2023
let growPeriod;  // year, month, week, day
let epochs;  // 4-10

let nodeSet = [];
let lineSet = [];
let currentNode = 0;
let currentLine = 0;
let drawSpeed; let acceleration = [' ','Basic','Standard','Advanced'];  // 1-basic, 2-standard, 3-advance
let speedAcce;
let frameCount = 0;
let drewInputLine = false;
let drewOutputLine = false;

let toadCanvas;
let punkCanvas;
let moonCanvas;
let nounCanvas;
let percentage;

let isIdleMode;
let traits;
let brain;
let output_prediction;

function setup() {
  let w = windowHeight; 
  let h = windowHeight;
  createCanvas(w,h);
  lineCanvas = createGraphics(w,h);
  nodeCanvas = createGraphics(w,h);
  patternCanvas = createGraphics(w,h);
  popupCanvas = createGraphics(w,h);
  animCanvas = createGraphics(w,h);
  animLineCanvas = createGraphics(w,h);
  infoCanvas = createGraphics(w,h);
  toadCanvas = new toadDraw(1000,1000,paperColor,strokeColor);
  punkCanvas = new punkDraw(1000,1000,paperColor,strokeColor);
  moonCanvas = new moonDraw(1000,1000,paperColor,strokeColor);
  nounCanvas = new nounDraw(1000,1000,paperColor,strokeColor);
  window.addEventListener('dblclick', doubleClicked);
  setupRandom();
  setupModel();
  setupSketch();
}

function setupRandom() {
  seed = parseInt(modelSeed);
  randomSeed(seed);
  noiseSeed(seed);
}

function setupModel() {  
  traits = getTraits();
  brain = new Brain(traits);
}

function doubleClicked() {
  if (!isIdleMode) return;
  isIdleMode = false;
  drewInputWindow = true;
  img = null;
  inputImg = createFileInput(handleFile);
  inputImg.position(width/2-75*maxR,height/2-10*maxR);
  if (paperBG == 1) {
    inputImg.style('color','black');
  } else {inputImg.style('color','white')}
  processButton = createButton('Process');
  processButton.position(width/2-155*maxR,height/2+35*maxR);
  processButton.size(150*maxR,40*maxR);
  processButton.style('opacity','0');
  processButton.mouseClicked(() => {
    if (img == null) return;
    frameCount = 0;
    isProcessPhase = true;
    processingLayer = 0;
    animationLoopCount = 0;
    drewLineAnim = true;
    progress = border;
  });
  closeButton = createButton('Close');
  closeButton.position(width/2+5*maxR,height/2+35*maxR);
  closeButton.size(150*maxR,40*maxR);
  closeButton.style('opacity','0');
  closeButton.mouseClicked(() => {
    closeWindow();
    isIdleMode = true;
  });
}

function closeWindow() {
  drewInputWindow = false;
  inputImg.hide();
  processButton.hide();
  closeButton.hide();
}

function processPhase() {
  closeWindow();
  progress += (width-border*2-xsize/2)/(15*2*layerNum);
  animLineCanvas.fill(paperColor);
  animLineCanvas.noStroke();
  animLineCanvas.rect(progress,0,width,height);
  
  if (frameCount >= 15 && drewAnim == true) {
    drewAnim = false;
    frameCount = 0;
  } 
  if (drewAnim) {
    drawNodeSet(processingLayer,state,paperColor,paperColor,paperColor,1,animCanvas);
  }
  if (frameCount >= 15 && drewAnim == false) {
    drewAnim = true;
    frameCount = 0;
    processingLayer += 1;
    if (processingLayer == layerNum) {
      ++animationLoopCount;
      processingLayer = 0;
      progress = border;
      if (animationLoopCount == animationLoopMax) {
        isProcessPhase = false;
        resultWindow();
      }
    }
  }
}

function resultWindow() {
  drewResultWindow = true;
  tryButton = createButton('Try Again');
  tryButton.position(width/2-155*maxR,height/2+280*maxR);
  tryButton.size(150*maxR,40*maxR);
  tryButton.style('opacity','0');
  tryButton.mouseClicked(tryAgain);
  closeResultButton = createButton('Close');
  closeResultButton.position(width/2+5*maxR,height/2+280*maxR);
  closeResultButton.size(150*maxR,40*maxR);
  closeResultButton.style('opacity','0');
  closeResultButton.mouseClicked(closeResult);
}

function tryAgain() {
  drewResultWindow = false;
  tryButton.hide();
  closeResultButton.hide();
  drewInputWindow = true;
  inputImg.show();
  processButton.show();
  closeButton.show();
}

function closeResult() {
  isIdleMode = true;
  drewResultWindow = false;
  setupSketch();
  tryButton.hide();
  closeResultButton.hide();
}

function keyTyped() {
  if ((key === 'i' || key === 'I') && drewInfoWindow == false) {
    drewInfoWindow = true;
  } else if ((key === 'i' || key === 'I') && drewInfoWindow == true) {
    drewInfoWindow = false;
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data,'');
    img.hide();

    const graphic = createGraphics(28, 28);
    graphic.image(img.elt, 0, 0, 28, 28);
    graphic.loadPixels();

    const data = graphic.pixels.filter((_, i) => i%4 != 3);
    const predictions = brain.classifyImage(data);
    percentage = predictions.map(x => Math.round(x * 100));
  } else{img = null}
}

function setupSketch() {
  maxR = min(width,height)/1024;
  drewInfoWindow = false;
  
  inputNodes = 3;
  classNum = 4;
  
  brain.updateAge(new Date());
  const brainStatus = brain.getBrainStatus();
  console.log(brainStatus);

  nodesFinal = brainStatus.totalNeurons;
  nodesPresent = brainStatus.activeNeurons;
  nodesPresent.unshift(inputNodes);
  nodesPresent.push(classNum);
  nodesFinal.unshift(inputNodes);
  nodesFinal.push(classNum);
  layerNum = nodesFinal.length;
  maxNodeGrow = max(...nodesPresent);
  maxNodeDecay = max(...nodesFinal);  
  
  architecture = traits.structure_gen;
  birthYear = traits.birthYear;
  growPeriod = traits.growthPeriod;
  epochs = traits.epoch_num;

  border = 50*maxR;
  spacing = 50*maxR;
  state = brainStatus.stage;
  shape = activationFunction.indexOf(traits.activation_func);
  shapeStroke = NodeStroke.filter(e => e[0] == traits.nodeStroke)[0][2] * maxR;
  lineStroke = LineStroke.filter(e => e[0] == traits.lineStroke)[0][2] * maxR;
  drawSpeed = acceleration.indexOf(traits.hardwareAcceleration);
  paperBG = framework.indexOf(traits.backgroundColor);
  colorPalette = dataSet.indexOf(traits.nodeType);
  pattern = paper.indexOf(traits.pattern);

  state = 1 
  // shape = 4 
  // shapeStroke = 3.6953125 
  // lineStroke = 1.84765625 
  // drawSpeed = 3 
  // paperBG = 3 
  // colorPallete = 1 
  // pattern = 0

  console.log(nodesFinal, nodesPresent, state, shape, shapeStroke, lineStroke, drawSpeed, paperBG, colorPalette, pattern);
  
  if (paperBG == 1) {
    paperColor = 'white';
    strokeColor = 'black';
    nodeDecayColor = 240;
    innerDecayColor = nodeDecayColor;
    strokeDecayColor = 230;
  } else if (paperBG == 2) {
    paperColor = 'black';
    strokeColor = 'white';
    nodeDecayColor = 20;
    innerDecayColor = nodeDecayColor;
    strokeDecayColor = 30;
  } else if (paperBG == 3) {
    paperColor = '#104da8';
    strokeColor = 'white';
    nodeDecayColor = '#155baf';
    innerDecayColor = nodeDecayColor;
    strokeDecayColor = '#1860b5';
  } else {
    paperColor = '#b99566';
    strokeColor = 'white';
    nodeDecayColor = '#c7a575';
    innerDecayColor = nodeDecayColor;
    strokeDecayColor = '#d5b78b';
  }
  if (colorPalette == 1) {
    nodeColor = paperColor;
    innerColor = paperColor;
  } else if (colorPalette == 2) {
    nodeColor = paperColor;
    innerColor = strokeColor;
  } else if (colorPalette == 3) {
    nodeColor = paperColor;
    innerColor = '#fdd017';
  } else {
    nodeColor = strokeColor;
    innerColor = '#cc1100';
  }

  xsize = (width - border*2) / layerNum;
  if (state == 1) {
    ysize = (height - border*2) / maxNodeGrow;
  } else {ysize = (height - border*2) / maxNodeDecay}
  nodeSize = min(xsize,ysize)/2;

  nodeSet = [];
  lineSet = [];
  currentNode = 0;
  currentLine = 0;
  frameCount = 0;
  drewInputLine = false;
  drewOutputLine = false;
  isIdleMode = true;
  for (let i=0; i<layerNum; i++) {
    nodeSet.push(i);
  }
  for (let i=0; i<layerNum-1; i++) {
    lineSet.push(i);
  }
  
  if (drawSpeed == 1) {
    speedAcce = 40;
    animationLoopMax = 5;
  } else if (drawSpeed == 2) {
    speedAcce = 15;
    animationLoopMax = 3;
  } else {
    speedAcce = 2;
    animationLoopMax = 1;
  }
}

function draw() {
  background(paperColor);
  
  animLineCanvas.background(255);
  eraseCanvas(animLineCanvas);
  
  animCanvas.background(255);
  animCanvas.rectMode(CENTER);
  eraseCanvas(animCanvas);
  animCanvas.strokeWeight(shapeStroke*3/2);
  
  popupCanvas.background(255);
  popupCanvas.rectMode(CENTER);
  eraseCanvas(popupCanvas);
  popupCanvas.textAlign(CENTER);
  popupCanvas.textStyle(BOLD);
  popupCanvas.stroke(strokeColor);
  popupCanvas.strokeWeight(4*maxR);
  popupCanvas.fill(paperColor);
  
  infoCanvas.background(255);
  infoCanvas.rectMode(CENTER);
  eraseCanvas(infoCanvas);
  infoCanvas.textAlign(LEFT);
  infoCanvas.stroke(strokeColor);
  infoCanvas.strokeWeight(4*maxR);
  infoCanvas.fill(paperColor);
  
  nodeCanvas.background(255);
  nodeCanvas.rectMode(CENTER);
  eraseCanvas(nodeCanvas);
  nodeCanvas.stroke(strokeColor);
  nodeCanvas.strokeWeight(shapeStroke);

  lineCanvas.background(255);
  eraseCanvas(lineCanvas);
  lineCanvas.stroke(strokeColor);
  lineCanvas.strokeWeight(lineStroke);
  
  patternCanvas.background(255);
  eraseCanvas(patternCanvas);
  patternCanvas.stroke(strokeColor);
  patternCanvas.strokeWeight(0.2*maxR);
  createPattern(pattern);
  
  // draw neural nodes
  for (let i=0; i<currentNode; i++) {
    let node = nodeSet[i];
    drawNodeSet(node,state,nodeDecayColor,innerDecayColor,strokeDecayColor,1,nodeCanvas);
    drawNodeSet(node,state,nodeColor,innerColor,strokeColor,2,nodeCanvas);
  }
  if (frameCount >= speedAcce && currentNode < nodeSet.length) {
    let node = nodeSet[currentNode];
    drawNodeSet(node,state,nodeDecayColor,innerDecayColor,strokeDecayColor,1,nodeCanvas);
    drawNodeSet(node,state,nodeColor,innerColor,strokeColor,2,nodeCanvas);
    currentNode++;
    frameCount = 0;
  }
  
  // draw input lines
  if (frameCount >= speedAcce && drewInputLine == false) {
    drewInputLine = true;
    frameCount = 0;
  }
  if (drewInputLine) drawInputLine(lineCanvas);

  // draw neural lines
  for (let i=0; i<currentLine; i++) {
    let neuline = lineSet[i];
    drawLineSet(neuline,state,lineCanvas);
  }
  if (frameCount >= speedAcce && currentLine < lineSet.length) {
    let neuline = lineSet[currentLine];
    drawLineSet(neuline,state,lineCanvas);
    currentLine++;
    frameCount = 0;
  }  
  
  // draw output lines
  if (frameCount >= speedAcce && drewOutputLine == false) {
    drewOutputLine = true;
    frameCount = 0;
  }
  if (drewOutputLine) drawOutputLine(lineCanvas);  
  
  image(lineCanvas,0,0);
  if (isProcessPhase) {
    processPhase();
  }
  image(animLineCanvas,0,0);
  image(patternCanvas,0,0);
  image(nodeCanvas,0,0);
  if (drewAnim) image(animCanvas,0,0);
  if (drewInputWindow) {
    drawInputWindow();
    image(popupCanvas,0,0);
  }
  if (drewResultWindow) {
    drawResultWindow();
    image(popupCanvas,0,0);

    color1 = 0; color2 = 0; color3 = 0; color4 = 0;
    if (percentage[0] == max(...percentage)) {
      color1 = 1;
    } else if (percentage[1] == max(...percentage)) {
      color2 = 1;
    } else if (percentage[2] == max(...percentage)) {
      color3 = 1;
    } else {color4 = 1}
    
    toadCanvas.draw(color1);
    punkCanvas.draw(color2);
    moonCanvas.draw(color3);
    nounCanvas.draw(color4);
  }
  if (drewInfoWindow) {
    drawInfoWindow();
    image(infoCanvas,0,0);
  }
    
  frameCount++; 
}

function drawInputLine(canvas) {
  for (let i=0; i<inputNodes; i++) {
    let x1 = (border+(xsize/2-nodeSize/2))/2;
    let x2 = border+xsize/2;
    let y;
    if (inputNodes%2 == 0) {
      y = height/2-inputNodes/2*ysize+ysize/2+i*ysize;
    } else {y = height/2-(inputNodes-1)/2*ysize+i*ysize}
    canvas.line(x1,y,x2,y);
  }
}

function drawOutputLine(canvas) {
  for (let c=0; c<classNum; c++) { 
    let x1 = width-(border+(xsize/2-nodeSize/2))/2;
    let x2 = width-(border+xsize/2);
    let y;
    if (classNum%2 == 0) {
      y = height/2-classNum/2*ysize+ysize/2+c*ysize;
    } else {y = height/2-(classNum-1)/2*ysize+c*ysize}
    canvas.line(x1,y,x2,y);
  }
}

function drawLineSet(amount,state,canvas) {
  if (state == 1) {
    let nodeAmount = nodesPresent[amount];
    let nextNodeAmount = nodesPresent[amount+1];
    let x1;
    let y1;
    let x2;
    let y2;
    for (let r=0; r<nodeAmount; r++) {
      x1 = amount*xsize + xsize/2 + border;
      x2 = x1 + xsize;
      if (nodeAmount%2 == 0) {
        y1 = height/2 - nodeAmount/2*ysize + ysize/2 + r*ysize;
      } else {y1 = height/2 - (nodeAmount-1)/2*ysize + r*ysize}
      for (let n=0; n<nextNodeAmount; n++) {
        if (nextNodeAmount%2 == 0) {
          y2 = height/2 - nextNodeAmount/2*ysize + ysize/2 + n*ysize;
        } else {y2 = height/2 - (nextNodeAmount-1)/2*ysize + n*ysize}
        canvas.line(x1,y1,x2,y2);
      }
    }
  }
  if (state == 2) {
    let nodeAmount = nodesFinal[amount];
    let nextNodeAmount = nodesFinal[amount+1];
    let nodeLiveAmount = nodesPresent[amount];
    let nextNodeLiveAmount = nodesPresent[amount+1];
    let x1;
    let y1;
    let x2;
    let y2;
    for (let r=0; r<nodeLiveAmount; r++) {
      x1 = amount*xsize + xsize/2 + border;
      x2 = x1 + xsize;      
      if (nodeAmount%2 == 0 && nodeLiveAmount%2 == 0) {
        y1 = height/2 - nodeLiveAmount/2*ysize + ysize/2 + r*ysize;
      } else if (nodeAmount%2 == 0 &&nodeLiveAmount%2 != 0) {
        y1 = height/2 - (nodeLiveAmount-1)/2*ysize + r*ysize - ysize/2;
      } else if (nodeAmount%2 != 0 && nodeLiveAmount%2 == 0) {
        y1 = height/2 - nodeLiveAmount/2*ysize + r*ysize;
      } else {y1 = height/2 - (nodeLiveAmount-1)/2*ysize + r*ysize}
      for (let n=0; n<nextNodeLiveAmount; n++) {
        if (nextNodeAmount%2 == 0 && nextNodeLiveAmount%2 == 0) {
          y2 = height/2 - nextNodeLiveAmount/2*ysize + ysize/2 + n*ysize;
        } else if (nextNodeAmount%2 == 0 &&nextNodeLiveAmount%2 != 0) {
          y2 = height/2 - (nextNodeLiveAmount-1)/2*ysize + n*ysize - ysize/2;
        } else if (nextNodeAmount%2 != 0 && nextNodeLiveAmount%2 == 0) {
          y2 = height/2 - nextNodeLiveAmount/2*ysize + n*ysize;
        } else {y2 = height/2 - (nextNodeLiveAmount-1)/2*ysize + n*ysize}
        canvas.line(x1,y1,x2,y2);
      }
    }
  }
}

function drawNodeSet(amount,state,nodeColor,innerColor,strokeColor,layer,canvas) {
  if (state == 1) {
    let nodeAmount = nodesPresent[amount];
    let x;
    let y;
    for (let r=0; r<nodeAmount; r++) {
      x = amount*xsize + xsize/2 + border;
      if (nodeAmount%2 == 0) {
        y = height/2 - nodeAmount/2*ysize + ysize/2 + r*ysize;
      } else {y = height/2 - (nodeAmount-1)/2*ysize + r*ysize}
      drawNode(x,y,nodeSize,shape,nodeColor,innerColor,strokeColor,canvas);
    }
  }
  if (state == 2) {
    let nodeAmount = nodesFinal[amount];
    let nodeLiveAmount = nodesPresent[amount];
    let x;
    let y;
    if (layer == 1) {
      for (let r=0; r<nodeAmount; r++) {
        x = amount*xsize + xsize/2 + border;
        if (nodeAmount%2 == 0) {
          y = height/2 - nodeAmount/2*ysize + ysize/2 + r*ysize;
        } else {y = height/2 - (nodeAmount-1)/2*ysize + r*ysize}
        drawNode(x,y,nodeSize,shape,nodeColor,innerColor,strokeColor,canvas);
      }
    } else if (layer == 2) {
      for (let r=0; r<nodeLiveAmount; r++) {
        x = amount*xsize + xsize/2 + border;
        if (nodeAmount%2 == 0 && nodeLiveAmount%2 == 0) {
          y = height/2 - nodeLiveAmount/2*ysize + ysize/2 + r*ysize;
        } else if (nodeAmount%2 == 0 &&nodeLiveAmount%2 != 0) {
          y = height/2 - (nodeLiveAmount-1)/2*ysize + r*ysize - ysize/2;
        } else if (nodeAmount%2 != 0 && nodeLiveAmount%2 == 0) {
          y = height/2 - nodeLiveAmount/2*ysize + r*ysize;
        } else {y = height/2 - (nodeLiveAmount-1)/2*ysize + r*ysize}
        drawNode(x,y,nodeSize,shape,nodeColor,innerColor,strokeColor,canvas);
      }
    }
  }
}

function drawNode(x,y,size,shape,nodeColor,innerColor,strokeColor,canvas) {
  if (shape == 1) {
    canvas.stroke(strokeColor);
    canvas.fill(nodeColor);
    canvas.ellipse(x,y,size);
    canvas.noStroke();
    canvas.fill(innerColor);
    canvas.ellipse(x,y,size/2);
  } else if (shape == 2) {
    canvas.stroke(strokeColor);
    canvas.fill(nodeColor);
    canvas.rect(x,y,size);
    canvas.noStroke();
    canvas.fill(innerColor);
    canvas.rect(x,y,size/2);
  } else if (shape == 3) {
    canvas.stroke(strokeColor);
    canvas.fill(nodeColor);
    canvas.beginShape();
    canvas.vertex(x-size*2/3,y);
    canvas.vertex(x,y-size*2/3);
    canvas.vertex(x+size*2/3,y);
    canvas.vertex(x,y+size*2/3);
    canvas.endShape(CLOSE);
    canvas.noStroke();
    canvas.fill(innerColor);
    canvas.beginShape();
    canvas.vertex(x-size*1/3,y);
    canvas.vertex(x,y-size*1/3);
    canvas.vertex(x+size*1/3,y);
    canvas.vertex(x,y+size*1/3);
    canvas.endShape(CLOSE);
  } else {
    canvas.stroke(strokeColor);
    canvas.fill(nodeColor);
    canvas.triangle(x-size/1.5,y+size/2,x,y-size/1.5,x+size/1.5,y+size/2);
    canvas.noStroke();
    canvas.fill(innerColor);
    canvas.triangle(x-size/3.75,y+size/3.75,x,y-size/5,x+size/3.75,y+size/3.75);
  }
}

function createPattern(pattern) {
  if (pattern == 0) {
    // Plain paper
  }
  else if (pattern == 1) {
    // Ruled paper
    for (let y = spacing/4; y < height+spacing/4; y += spacing) {
      patternCanvas.line(0, y, width, y);
    }  
  }
  else if (pattern == 2) {
    // Dotted paper
    patternCanvas.strokeWeight(1.5*maxR);
    for (let x = spacing/2; x < width+spacing/2; x += spacing) {
      for (let y = spacing/4; y < height+spacing/4; y += spacing) {
        patternCanvas.point(x, y);
      }
    }
  }
  else if (pattern == 3) {
    // Squared paper
    spacing = 25*maxR;
    for (let y = spacing/2; y < height+spacing/2; y += spacing) {
      patternCanvas.line(0, y, width, y);
    }
    for (let x = spacing/2; x < width+spacing/2; x += spacing) {
      patternCanvas.line(x, 0, x, height);
    }
  }
}

function drawInputWindow() {
  popupCanvas.rect(width/2,height/2,600*maxR,200*maxR,25*maxR);

  popupCanvas.strokeWeight(2*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+30*maxR && mouseY<height/2+75*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(strokeColor);
  }
  popupCanvas.rect(width/2-80*maxR,height/2+55*maxR,150*maxR,40*maxR,5*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+30*maxR && mouseY<height/2+75*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(strokeColor);
  }
  popupCanvas.rect(width/2+80*maxR,height/2+55*maxR,150*maxR,40*maxR,5*maxR);
  
  popupCanvas.textSize(32*maxR);
  popupCanvas.fill(strokeColor);
  popupCanvas.noStroke();
  popupCanvas.text('CHOOSE A FILE TO CLASSIFY',width/2,height/2-40*maxR);
  popupCanvas.textSize(20*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+30*maxR && mouseY<height/2+75*maxR) {
    popupCanvas.fill(strokeColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.text('PROCESS',width/2-80*maxR,height/2+62*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+30*maxR && mouseY<height/2+75*maxR) {
    popupCanvas.fill(strokeColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.text('CLOSE',width/2+80*maxR,height/2+62*maxR);
}

function drawResultWindow() {
  popupCanvas.rect(width/2,height/2,800*maxR,700*maxR,25*maxR);
  popupCanvas.rect(width/2,height/2-(310+15/2-215/2)*maxR,215*maxR)
  popupCanvas.image(img.elt,width/2-100*maxR,height/2-310*maxR,200*maxR,200*maxR);
  
  popupCanvas.strokeWeight(2*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+275*maxR && mouseY<height/2+320*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(strokeColor);
  }
  popupCanvas.rect(width/2-80*maxR,height/2+300*maxR,150*maxR,40*maxR,5*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+275*maxR && mouseY<height/2+320*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(strokeColor);
  }
  popupCanvas.rect(width/2+80*maxR,height/2+300*maxR,150*maxR,40*maxR,5*maxR);
  
  popupCanvas.noStroke();
  popupCanvas.fill(strokeColor);
  popupCanvas.textSize(32*maxR);
  popupCanvas.text('YOUR IMAGE COULD BELONG TO...',width/2,height/2-45*maxR);
  popupCanvas.textSize(20*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+275*maxR && mouseY<height/2+320*maxR) {
    popupCanvas.fill(strokeColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.text('TRY AGAIN',width/2-80*maxR,height/2+307*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+275*maxR && mouseY<height/2+320*maxR) {
    popupCanvas.fill(strokeColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.text('CLOSE',width/2+80*maxR,height/2+307*maxR);
  
  let s1 = 125; let s2 = 125; let s3 = 125; let s4 = 125;
  let text1 = 15; let text2 = 15; let text3 = 15; let text4 = 15;
  let style1 = NORMAL; let style2 = NORMAL; let style3 = NORMAL; let style4 = NORMAL;
  let fill1 = paperColor; let fill2 = paperColor; let fill3 = paperColor; let fill4 = paperColor;
  if (percentage[0] == max(...percentage)) {
    s1 = 200; text1 = 22; style1 = BOLD; fill1 = strokeColor;
  } else if (percentage[1] == max(...percentage)) {
    s2 = 200; text2 = 22; style2 = BOLD; fill2 = strokeColor;
  } else if (percentage[2] == max(...percentage)) {
    s3 = 200; text3 = 22; style3 = BOLD; fill3 = strokeColor;
  } else {s4 = 200; text4 = 22; style4 = BOLD; fill4 = strokeColor}
  let gap = (800-75*2-s1-s2-s3-s4)/3;
  
  popupCanvas.stroke(strokeColor);
  popupCanvas.strokeWeight(0.75*maxR);
  // draw toad result
  popupCanvas.fill(fill1);
  popupCanvas.rect(width/2+(800/2-75-s4-s3-s2-gap*3-s1/2)*maxR,height/2+240/2*maxR,s1*maxR,s1*maxR,10*maxR);
  popupCanvas.image(toadCanvas.graphic,width/2+(800/2-75-s4-s3-s2-gap*3-s1)*maxR,height/2+(240/2-s1/2)*maxR,s1*maxR,s1*maxR);
  // draw punk result
  popupCanvas.fill(fill2);
  popupCanvas.rect(width/2+(800/2-75-s4-s3-gap*2-s2/2)*maxR,height/2+240/2*maxR,s2*maxR,s2*maxR,10*maxR);
  popupCanvas.image(punkCanvas.graphic,width/2+(800/2-75-s4-s3-gap*2-s2)*maxR,height/2+(240/2-s2/2)*maxR,s2*maxR,s2*maxR);
  // draw moon result
  popupCanvas.fill(fill3);
  popupCanvas.rect(width/2+(800/2-75-s4-gap-s3/2)*maxR,height/2+240/2*maxR,s3*maxR,s3*maxR,10*maxR);
  popupCanvas.image(moonCanvas.graphic,width/2+(800/2-75-s4-gap-s3)*maxR,height/2+(240/2-s3/2)*maxR,s3*maxR,s3*maxR);    
  // draw noun result
  popupCanvas.fill(fill4);
  popupCanvas.rect(width/2+(800/2-75-s4/2)*maxR,height/2+240/2*maxR,s4*maxR,s4*maxR,10*maxR);
  popupCanvas.image(nounCanvas.graphic,width/2+(800/2-75-s4)*maxR,height/2+(240/2-s4/2)*maxR,s4*maxR,s4*maxR);
  // draw text
  popupCanvas.fill(strokeColor);
  popupCanvas.noStroke();
  popupCanvas.textSize(text1*maxR);
  popupCanvas.textStyle(style1);
  popupCanvas.text('CRYPTOADZ',width/2+(800/2-75-s4-s3-s2-gap*3-s1/2)*maxR,height/2+(240/2-s1/2-text1/2)*maxR);
  popupCanvas.text(percentage[0]+'%',width/2+(800/2-75-s4-s3-s2-gap*3-s1/2)*maxR,height/2+(240/2+s1/2+text1*4/3)*maxR);
  popupCanvas.textSize(text2*maxR);
  popupCanvas.textStyle(style2);
  popupCanvas.text('CRYPTOPUNKS',width/2+(800/2-75-s4-s3-gap*2-s2/2)*maxR,height/2+(240/2-s2/2-text2/2)*maxR);
  popupCanvas.text(percentage[1]+'%',width/2+(800/2-75-s4-s3-gap*2-s2/2)*maxR,height/2+(240/2+s2/2+text2*4/3)*maxR);
  popupCanvas.textSize(text3*maxR);
  popupCanvas.textStyle(style3);
  popupCanvas.text('MOONBIRDS',width/2+(800/2-75-s4-gap-s3/2)*maxR,height/2+(240/2-s3/2-text3/2)*maxR);
  popupCanvas.text(percentage[2]+'%',width/2+(800/2-75-s4-gap-s3/2)*maxR,height/2+(240/2+s3/2+text3*4/3)*maxR);
  popupCanvas.textSize(text4*maxR);
  popupCanvas.textStyle(style4);
  popupCanvas.text('NOUNS',width/2+(800/2-75-s4/2)*maxR,height/2+(240/2-s4/2-text4/2)*maxR);
  popupCanvas.text(percentage[3]+'%',width/2+(800/2-75-s4/2)*maxR,height/2+(240/2+s4/2+text4*4/3)*maxR);
}

function drawInfoWindow() {
  infoCanvas.rect(width/2,height-95*maxR,600*maxR,150*maxR);
  infoCanvas.rect(width/2+150*maxR,height-155*maxR,300*maxR,30*maxR)
  infoCanvas.fill(strokeColor);
  infoCanvas.rect(width/2-150*maxR,height-155*maxR,300*maxR,30*maxR);
  infoCanvas.noStroke();
  infoCanvas.fill(paperColor);
  infoCanvas.textSize(15*maxR);
  infoCanvas.textStyle(BOLD);
  infoCanvas.text('TECHNICAL INFORMATION',width/2-285*maxR,height-150*maxR);
  infoCanvas.fill(strokeColor);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('NAME: ',width/2+20*maxR,height-150*maxR);
  infoCanvas.text('NUMBER OF HIDDEN LAYERS:',width/2-285*maxR,height-120*maxR);
  infoCanvas.text('MAXIMUM NEURONS PER LAYER:',width/2-285*maxR,height-105*maxR);
  infoCanvas.text('NUMBER OF TRAINING EPOCHS: ',width/2-285*maxR,height-90*maxR);
  infoCanvas.text('ARCHITECTURE:',width/2-285*maxR,height-75*maxR);
  infoCanvas.text('LINE STROKE:',width/2-285*maxR,height-60*maxR);
  infoCanvas.text('NODE STROKE:',width/2-285*maxR,height-45*maxR);
  infoCanvas.text('PAPER PATTERN:',width/2-285*maxR,height-30*maxR);
  infoCanvas.text('ACTIVATION FUNCTION: ',width/2+20*maxR,height-120*maxR);
  infoCanvas.text('DATA SET: ',width/2+20*maxR,height-105*maxR);
  infoCanvas.text('FRAMEWORK: ',width/2+20*maxR,height-90*maxR);
  infoCanvas.text('HARDWARE ACCELERATION: ',width/2+20*maxR,height-75*maxR);
  infoCanvas.text('BIRTH YEAR: ',width/2+20*maxR,height-60*maxR);
  infoCanvas.text('GROW PERIOD: ',width/2+20*maxR,height-45*maxR);
  infoCanvas.text('STATE: ',width/2+20*maxR,height-30*maxR);
  infoCanvas.textStyle(ITALIC);
  infoCanvas.textAlign(RIGHT);
  infoCanvas.text('Generative Brain #'+seed,width/2+285*maxR,height-150*maxR);
  infoCanvas.text(layerNum-2,width/2-15*maxR,height-120*maxR);
  infoCanvas.text(max(...nodesFinal),width/2-15*maxR,height-105*maxR);
  infoCanvas.text(epochs,width/2-15*maxR,height-90*maxR);
  infoCanvas.text(architecture,width/2-15*maxR,height-75*maxR);
  infoCanvas.text(lineStroke/maxR+' pt',width/2-15*maxR,height-60*maxR);
  infoCanvas.text(shapeStroke/maxR+' pt',width/2-15*maxR,height-45*maxR);
  infoCanvas.text(paper[pattern],width/2-15*maxR,height-30*maxR);
  infoCanvas.text(activationFunction[shape],width/2+285*maxR,height-120*maxR);
  infoCanvas.text(dataSet[colorPalette],width/2+285*maxR,height-105*maxR);
  infoCanvas.text(framework[paperBG],width/2+285*maxR,height-90*maxR);
  infoCanvas.text(acceleration[drawSpeed],width/2+285*maxR,height-75*maxR);
  infoCanvas.text(birthYear,width/2+285*maxR,height-60*maxR);
  infoCanvas.text(growPeriod,width/2+285*maxR,height-45*maxR);
  infoCanvas.text(liveState[state],width/2+285*maxR,height-30*maxR);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
  // The maximum is exclusive and the minimum is inclusive
}

keyPressed = () => {
  if (key == 'S' || key == 's') {
    saveCanvasAtCurrentTime();
  }
}

saveCanvasAtCurrentTime = () => {
  let offset = new Date().getTimezoneOffset() * 60 * 1000;
  let localTimeStr = new Date(Date.now() - offset).toISOString().slice(0, -1);
  let filename = localTimeStr + '.png';
  save(filename);
}
