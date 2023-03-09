// const modelSeed = '1';
const modelSeed = Date.now();

new Q5("global");

let border;  // screen padding
let maxR;
let inputImg;
let img;
let drewResultWindow = false;
let drewInfoWindow = false;
let drewAnim = true;
let isProcessPhase;
let processingLayer;
let progress;
let animationLoopCount;
let processingSpeed;
let satFee,activeAmount,sparkRate;
let percentage,finishedNum,finishedText;

let xsize,ysize,nodeSize;
let layerNum,maxNodes,compareArray,realMaxNodes,realCompareArray;
let nodesArray,scaleNodesArray,scaleRatio,scaleToggle,liveNodesArray,animArray,animSet;
let state; 
let shape; 
let shapeStroke,lineStroke,strokeRatio;
let classNum,classArray,inputNum,inputArray;
let nodeCanvas,lineCanvas,patternCanvas,popupCanvas,infoCanvas,loadingCanvas,warningCanvas;
let nodeColor,strokeColor;
let strokeOpacity;
let pattern,patternColor,spacing,paperColor; 
let paletteType,colorPalette,fillMode;  // 1-Solid, 2-Outline, 3-XRAY
let startColor,endColor,colorStops,gradientColors,gradientFill,gradientUnit,newGradientFill;

let seed;  // 1-2023
let architecture;  // random, random triangle, regular triangle, zigzag, symmetric, rectangle
let birthYear;  // 1943, 1951, 1957, 1969, 1970, 1980, 1982, 1986, 1988, 1997, 1998, 2002, 2009, 2012, 2014, 2015, 2016, 2023
let growPeriod;  // year, month, week, day
let epochs;  // 4-10
let framework = [' ','Theano','Torch','TensorFlow','Caffe'];
let dataSet = [' ','MNIST','CIFAR','IMAGENET','IRIS'];
let paper = [' ','Plain','Dotted','Squared'];  // 1-Plain, 2-Dotted, 3-Squared
let liveState = [' ','Growing','Stable','Decay','Dead']  // 1-growing, 2-stable, 3-decay, 4-dead
let activationFunction = [' ','Sigmoid','ReLU','LeakyReLU','Tanh'];  // 1-ellipse, 2-square, 3-diamond, 4-star
let acceleration = [' ','Basic','Standard','Advanced'];  // 1-basic, 2-standard, 3-advance
let shapeName = [' ','Round','Square','Diamond','Shuriken'];
let fillName = [' ','Solid','Outline','X-RAY'];
let example = ['CryptoPunks','Cryptoadz','Moonbids','BAYC','Nouns','Gazers','Fidenza','Acequia','Timechain','Satoshi','Squiggle','Terraforms','Finiliar','bitGANS','0xAI','Garden','Dragons','SMOLSKULL','contrapuntos','hollow','Toccata','Solace'];

let nodeSet = [];
let lineSet = [];
let currentNode = 0;
let currentLine = 0;
let drawSpeed; 
let speedAcce;
let frameCount = 0;
let drewInputLine = false;
let drewOutputLine = false;
let drewWarningScreen = false;

let isIdleMode;
let wrapInput = null;
let fileInput =  null;
let oldFile = null;

let setupFinished = false;
let inputDim;
let classes_name;
let stats;
let traits;
let brain;
let output_prediction;
let particleSystem;
let deadCanvas;

async function setup() {
  let w = windowHeight; 
  let h = windowHeight;
  createCanvas(w,h);
  lineCanvas = createGraphics(w,h);
  nodeCanvas = createGraphics(w,h);
  patternCanvas = createGraphics(w,h);
  popupCanvas = createGraphics(w,h);
  infoCanvas = createGraphics(w,h);
  deadCanvas = createGraphics(w,h);
  loadingCanvas = createGraphics(w,h);
  warningCanvas = createGraphics(w,h);
  setupRandom();
  setupTraits();
  setupColor();
  await setupModel();
  setupSketch();
  installCustomUploadIfle();

  setupFinished = true; 
}

function setupRandom() {
  seed = parseInt(modelSeed);
  randomSeed(seed);
  noiseSeed(seed);
}

function setupTraits() {
  traits = getTraits(___default_inscription.training_traits);
  reportTraits(traits);
}

async function setupModel() {
  const blockEndpoint = getBlocksApiEndpoint();
  const inscriptionEndpoint = getModelInscriptionEndpoint();

  let inscription;
  [stats, inscription] = await Promise.all([
    getLatestBlockStats(blockEndpoint),
    getModelInscription(inscriptionEndpoint),
  ]);

  const date = new Date(stats.time * 1000);

  brain = new Brain(traits.visual, inscription.layers_config, inscription.weight_b64);
  brain.updateAge(date);
  setupRandom();

  // TODO: Change default traits to inscription training traits

  classes_name = inscription.classes_name;
}

function initialize() {
    document.body.onfocus = checkIt;
    console.log('initializing');
}
      
// Define a function to check if
// the user failed to upload file
function checkIt() {
    // Check if the number of files
    // is not zero   
     setTimeout(()=>{
       const [file] = fileInput.files 
      if (file) {
          console.log('___2')
        img = null
        wrapInput.style.display = 'none'
        handleFile(URL.createObjectURL(file));
        oldFile = file;
      }  else {
        wrapInput.style.display = 'block'
      }
    document.body.onfocus = null;
     }, 100)
}  

function setupColor() {
  paletteType = getRandomInt(1,29);
  colorPalette = [['#ffffff','#231f20','#231f20'],                                                  // 1
                  ['#231f20','#ffffff','#ffffff'],                                                  // 2
                  ['#104da8','#ffffff','#ffffff'],                                                  // 3
                  ['#949494','#231f20','#231f20'],                                                  // 4
                  ['#000000','#ffffff','#ff0002','#f26522','#fdff00','#00ff03','#01fffe','#0000ff','#ff00ff'], // 5  
                  ['#0a141d','#043c3d','#226462','#2A9ECF','#0ab6a8','#2A9ECF','#043c3d'],  // 6
                  ['#2a2634','#5b6988','#cb78a2','#5b6988'],                                      // 7
                  ['#3a2d28','#d5c2ac','#df6338','#3d9895','#d5c2ac'],                          // 8
                  ['#1e2834','#566e58','#CC7A41','#566e58','#CC7A41'],                          // 9
                  ['#453a46','#57d4e4','#57d4e4','#f17b6e','#57d4e4'],                          // 10
                  ['#cccab5','#53afae','#53afae','#343243','#53afae'],                          // 11
                  ['#f177b4','#63f9fe','#f8bbda','#63f9fe','#f8bbda'],                          // 12
                  ['#f6b941','#41332d','#634233','#41332d','#634233'],                          // 13
                  ['#6D2B2D','#C74146','#C33B41','#CE2C31','#C33B41'],                          // 14  
                  ['#E7E7E7','#a6d4ec','#2c83c6','#c33726'],                                      // 15
                  ['#53afae','#1f4b5a','#afd39f','#f1e8d1','#afd39f'],                          // 16
                  ['#010101','#25f4ee','#25f4ee','#fe2c56','#ffffff'],                          // 17
                  ['#B5CEDA','#00457c','#00457c','#0079c0','#012269'],                          // 18
                  ['#fbfaff','#8b31ce','#f04bb1','#fac373','#82cef0'],                          // 19
                  ['#34333e','#191820','#f6b941','#ca4b17'],                                      // 20
                  ['#476930','#c8b88a','#86b049','#c8b88a','#FFFDC7'],                          // 21   
                  ['#704f38','#52392f','#ceb371','#dd866e','#e9ccaf'],                          // 22
                  ['#3d1460','#df678c','#df678c'],                                                  // 23
                  ['#e8a39c','#080a52','#080a52'],                                                  // 24
                  ['#ffc6cc','#ffffff','#cc313d'],                                                  // 25
                  ['#ec642a','#ffff8b','#ffff8b'],                                                  // 26
                  ['#1c1c1a','#ce4980','#ce4980'],                                                  // 27
                  ['#8dc63f','#078513','#078513']];                                                 // 28  
                // paperColor,patternColor,startColor,colorStops,endColor

  for(let i = 0; i < colorPalette.length; ++i) {
    for(let j = 0; j < colorPalette[i].length; ++j) {
      colorPalette[i][j] = hexToRgb(colorPalette[i][j]);
    }
  }

  colorStops = [];
  paperColor = colorPalette[paletteType-1][0];
  patternColor = colorPalette[paletteType-1][1];
  nodeDecayColor = strokeDecayColor = paperColor;
}

function installCustomUploadIfle(){ 
  wrapInput = document.querySelector('#upload');
  fileInput = document.querySelector('#inputUpload');
  
  wrapInput.addEventListener('dblclick', ()=>{
    if (isNeuronsConnected(nodesArray)) {
      fileInput.click();
      initialize();      
    }
    else {
      drewWarningScreen = true;
    }
  } )
  
  fileInput.addEventListener('change', ()=>{
    
    const [file] = fileInput.files 

    if (file) {
      img = null
      wrapInput.style.display = 'none'
      handleFile(URL.createObjectURL(file));
      oldFile = file;
    }  else{
        wrapInput.style.display = 'block'
    }
  })
}

function isNeuronsConnected(nodesArray) {
  for(let i = 0; i < nodesArray.length; ++i) {
    let count = 0;
    for(let j = 0; j < nodesArray[i].length; ++j) {
      if (nodesArray[i][j] > 0) ++count;
    }
    if (count == 0) {
      return false;
    }
  }
  return true;
}

function drawLoadingScreen() {
  loadingCanvas.textFont('Tahoma');
  loadingCanvas.stroke(patternColor);
  loadingCanvas.strokeWeight(2*maxR);
  loadingCanvas.fill(patternColor);
  loadingCanvas.textSize(48);
  loadingCanvas.text('LOADING...', width/2, height/2);
}

function drawDisconnectedWarning() {
  warningCanvas.textFont('Tahoma');
  warningCanvas.stroke(patternColor);
  warningCanvas.strokeWeight(2*maxR);
  warningCanvas.fill(paperColor);
  warningCanvas.rect(width/2, height/2, 400, 200);

  warningCanvas.fill(patternColor);
  warningCanvas.textSize(24);
  warningCanvas.text('Your network is disconnected', width/2, height/2, width, 100);
}

function customDoubleClicked() {
  if (img == null) return;
  frameCount = 0;
  isProcessPhase = true;
  processingLayer = 0;
  animationLoopCount = 0;
  drewLineAnim = true;
  progress = border;

  loadImage(img.elt.src, q5img => {
    const graphic = createGraphics(28, 28);
    graphic.image(q5img, 0, 0, 28, 28);
    graphic.loadPixels();

    const data = graphic.pixels.filter((_, i) => i%4 != 3); 
    const predictions = brain.classifyImage(data);
    percentage = 50;
    // percentage = max(...predictions.map(x => Math.round(x * 100)));
  });
}

function processPhase() {
  progress += (width-border*2-xsize/2)/(processingSpeed*2*layerNum);
  setEraseMode(lineCanvas);
  lineCanvas.rect(progress,0,width,height);
  setNoEraseMode(lineCanvas);

  if (frameCount >= sparkRate && drewAnim == true) {
    drewAnim = false;
    frameCount = 0;
  } 
  if (drewAnim) {
    setEraseMode(nodeCanvas);
    nodeCanvas.strokeWeight(shapeStroke*2);
    drawNodeAnim(processingLayer,nodeSize,paperColor,paperColor,nodeCanvas);
    setNoEraseMode(nodeCanvas);
  }
  if (frameCount >= sparkRate && drewAnim == false) {
    drewAnim = true;
    frameCount = 0;
    processingLayer += 1;
    if (processingLayer == ceil(layerNum*processingSpeed/sparkRate)) {
      ++animationLoopCount;
      processingLayer = 0;
      progress = border;
      if (animationLoopCount == 1) {
        isProcessPhase = false;
        resultWindow();
      }
    }
  }
}

function resultWindow() {
  drewResultWindow = true;
  tryButton = createButton('Try Again');
  tryButton.position(width/2-155*maxR,height/2+165*maxR);
  tryButton.size(150*maxR,40*maxR);
  tryButton.style('opacity','0');
  tryButton.mouseClicked(tryAgain);
  closeResultButton = createButton('Close');
  closeResultButton.position(width/2+5*maxR,height/2+165*maxR);
  closeResultButton.size(150*maxR,40*maxR);
  closeResultButton.style('opacity','0');
  closeResultButton.mouseClicked(closeResult);
}

function tryAgain() {
  drewResultWindow = false;
  tryButton.hide();
  closeResultButton.hide();
  fileInput.click();
  initialize();
}

function closeResult() {
  isIdleMode = true;
  drewResultWindow = false;
  setupSketch();
  tryButton.hide();
  closeResultButton.hide();
  wrapInput.style.display = 'block';
  img = null;
}

function keyTyped() {
  if ((key === 'i' || key === 'I') && drewInfoWindow == false) {
    drewInfoWindow = true;
  } else if ((key === 'i' || key === 'I') && drewInfoWindow == true) {
    drewInfoWindow = false;
  }
}

function handleFile(fileSrc) {
    img = createImg(fileSrc,'');
    img.hide();
    customDoubleClicked();
}

function setupSketch() {
  setupRandom();
  maxR = min(width,height)/1024;
  drewInfoWindow = false;
  
  architecture = traits.training.structure_gen;
  birthYear = traits.visual.birthYear;
  growPeriod = traits.visual.growthPeriod;
  epochs = traits.training.epoch_num;
  
  drawSpeed = acceleration.indexOf(traits.visual.hardwareAcceleration);
  if (drawSpeed == 1) {
    speedAcce = 40; processingSpeed = 40;
  } else if (drawSpeed == 2) {
    speedAcce = 15; processingSpeed = 20;
  } else {
    speedAcce = 2; processingSpeed = 10;
  }

  const brainStatus = brain.getBrainStatus();
  
  border = 100*maxR;
  spacing = 50*maxR;
  state = brainStatus.stage;
  shape = activationFunction.indexOf(traits.training.activation_func);
  // fillMode = 1;
  fillMode = getRandomInt(1,4);
  // pattern = 3;
  pattern = paper.indexOf(traits.visual.pattern);

  satFee = Math.tanh(Math.log10(stats.avgfeerate));
  satFee = map(satFee, 0, 1, 0.2, 0.8);
  
  inputNodes = 3;
  classNum = 4;
  classArray = [];
  inputArray = [];
  
  nodesArray = brainStatus.neuronsLife;
  scaleNodesArray = [];
  scaleToggle = 1;
  
  for (let i=0; i<classNum; i++) {
    classArray.push(1);
  }
  for (let i=0; i<inputNodes; i++) {
    inputArray.push(1);
  }
  nodesArray.push(classArray)
  
  for (let i=0; i<nodesArray.length; i++) {
    if (nodesArray[i].length > 30) {
      scaleToggle = scaleToggle*0;
    } else {scaleToggle = scaleToggle*1}
  }
  
  realCompareArray = [];
  for (let i=0; i<nodesArray.length; i++) {
    realCompareArray.push(nodesArray[i].length);
  }
  realMaxNodes = max(...realCompareArray);
  scaleRatio = ceil(realMaxNodes/30);
  
  if (scaleToggle == 0) {
    for (let i=0; i<nodesArray.length; i++) {
      scaleNodesArray[i] = [];
      for (let j=0; j<nodesArray[i].length; j+=scaleRatio) {
        let newNode = 0;
        let r = min(nodesArray[i].length-j,scaleRatio);
        for (let k=0; k<r; k++) {
          newNode += nodesArray[i][j+k]/r;
        }
        scaleNodesArray[i].push(newNode);
        newNode = 0;
      }
    }
    // console.log(scaleToggle,maxNodes,scaleRatio)
  } else {scaleNodesArray = nodesArray}
  scaleNodesArray.unshift(inputArray);
  // console.log(scaleNodesArray)
  
  compareArray = [];
  for (let i=0; i<scaleNodesArray.length; i++) {
    compareArray.push(scaleNodesArray[i].length);
  }
  maxNodes = max(...compareArray);
  layerNum = scaleNodesArray.length;
  xsize = (width - border*2) / layerNum;
  ysize = (height - border*2) / maxNodes;
  nodeSize = min(xsize,ysize)/2;
  
  liveNodesArray = [];
  for (let i=0; i<scaleNodesArray.length; i++) {
    let nodeAmount = scaleNodesArray[i].length;
    let x,y;
    for (let r=0; r<nodeAmount; r++) {
      x = i*xsize + xsize/2 + border;
      if (nodeAmount%2 == 0) {
        y = height/2 - nodeAmount/2*ysize + ysize/2 + r*ysize;
      } else {y = height/2 - (nodeAmount-1)/2*ysize + r*ysize}
      if (scaleNodesArray[i][r] == 1) {liveNodesArray.push([x,y])}
    }
  }
  activeAmount = floor(liveNodesArray.length*satFee);
  animSet = [];
  animArray = [];
  sparkRate = floor(map(satFee,0.2,0.8,15,2));
  for (let k=0; k<ceil(layerNum*processingSpeed/sparkRate); k++) {
    for (let i=0; i<activeAmount; i++) {
      let j = floor(random(1.0)*liveNodesArray.length);
      animArray.push(liveNodesArray.slice(j,j+1)[0]);
    }
    animSet.push(animArray);
    animArray = [];
  }
  
  strokeRatio = xsize*ysize;
  shapeStroke = map(strokeRatio,1700,58000,2,4)*maxR;
  lineStroke = map(strokeRatio,1700,58000,0.75,4)*maxR;
  strokeOpacity = 0.7;

  startColor = colorPalette[paletteType-1][2];
  endColor = colorPalette[paletteType-1][colorPalette[paletteType-1].length-1];
  for (let i=3; i<colorPalette[paletteType-1].length-1; i++) {
    colorStops.push(colorPalette[paletteType-1][i]);
  }
  gradientColors = getGradientColors(startColor,endColor,colorStops,width);
  gradientFill = [];
  newGradientFill = [];
  gradientUnit = width/(layerNum-1);
  for (let i=0; i<layerNum; i++) {
    gradientFill.push(getGradientColorAtPosition(gradientColors,gradientUnit*i/width));
    newGradientFill.push(getGradientColorAtPosition(gradientColors,gradientUnit*i/width));
  }
  newGradientFill.unshift(gradientFill[0]);
  newGradientFill.push(gradientFill[gradientFill.length-1]);

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

  const wall = {
    xLeft: 10,
    xRight: width - 10,
    yTop: 10,
    yBottom: height - 10,
  }

  const scaledTotalNeurons = scaleNodesArray.map(x => x.length);
  console.log(scaledTotalNeurons);
  particleSystem = new ParticleSystem(gradientFill, scaledTotalNeurons, wall);
}

function drawDeadAnimation() {
  eraseCanvas(deadCanvas);
  particleSystem.update();
  particleSystem.draw(deadCanvas, paperColor, shape, fillMode);
}

function draw() {
  background(paperColor);

  popupCanvas.background(255);
  popupCanvas.rectMode(CENTER);
  eraseCanvas(popupCanvas);
  popupCanvas.textAlign(CENTER);
  popupCanvas.textStyle(BOLD);
  popupCanvas.stroke(patternColor);
  popupCanvas.strokeWeight(8*maxR);
  popupCanvas.fill(paperColor);
  
  infoCanvas.background(255);
  infoCanvas.rectMode(CENTER);
  eraseCanvas(infoCanvas);
  infoCanvas.textAlign(LEFT);
  
  nodeCanvas.background(255);
  nodeCanvas.rectMode(CENTER);
  eraseCanvas(nodeCanvas);
  nodeCanvas.strokeWeight(shapeStroke);
  
  lineCanvas.background(255);
  eraseCanvas(lineCanvas);
  lineCanvas.strokeWeight(lineStroke);
  
  patternCanvas.background(255);
  patternCanvas.rectMode(CENTER);
  eraseCanvas(patternCanvas);
  patternCanvas.fill(patternColor);
  patternCanvas.stroke(patternColor);
  patternCanvas.strokeWeight(0.1*maxR);
  createPattern(pattern);
  patternCanvas.noStroke();
  patternCanvas.rect(border/16,height/2,border/8,height);
  patternCanvas.rect(width-border/16,height/2,border/8,height);
  patternCanvas.rect(width/2,border/16,width,border/8);
  patternCanvas.rect(width/2,height-border/16,width,border/8);

  warningCanvas.background(255);
  warningCanvas.rectMode(CENTER);
  eraseCanvas(warningCanvas);
  warningCanvas.textAlign(CENTER);
  warningCanvas.textStyle(BOLD);
  warningCanvas.stroke(patternColor);
  warningCanvas.strokeWeight(8*maxR);
  warningCanvas.fill(paperColor);
  
  loadingCanvas.background(255);
  loadingCanvas.rectMode(CENTER);
  eraseCanvas(loadingCanvas);
  loadingCanvas.textAlign(CENTER);
  loadingCanvas.textStyle(BOLD);
  loadingCanvas.stroke(patternColor);
  loadingCanvas.strokeWeight(8*maxR);
  loadingCanvas.fill(paperColor);

  if (!setupFinished) {
    drawLoadingScreen();
    image(loadingCanvas, 0, 0);
    return;
  }

  if (state == 4) {
    drawDeadAnimation();
    image(deadCanvas, 0, 0);  
    return;
  }  

  // draw neural nodes
  for (let i=0; i<currentNode; i++) {
    let node = nodeSet[i];
    if (fillMode == 1) {
      nodeColor = strokeColor = gradientFill[node];
    } else if (fillMode == 2) {
      nodeColor = paperColor;
      strokeColor = gradientFill[node];
    } else {
      nodeColor = paperColor;
      strokeColor = gradientFill[node];
    }
    drawNodeSet(node,nodeColor,strokeColor,nodeCanvas);
  }
  
  if (frameCount >= speedAcce && currentNode < nodeSet.length) {
    let node = nodeSet[currentNode];
    if (fillMode == 1) {
      nodeColor = strokeColor = gradientFill[node];
    } else if (fillMode == 2) {
      nodeColor = paperColor;
      strokeColor = gradientFill[node];
    } else {
      nodeColor = paperColor;
      strokeColor = gradientFill[node];
    }
    drawNodeSet(node,nodeColor,strokeColor,nodeCanvas);

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

  image(patternCanvas,0,0);
  if (isProcessPhase) {
    processPhase();
  }
  image(lineCanvas,0,0);
  image(nodeCanvas,0,0);
  if (drewResultWindow) {
    drawResultWindow();
    image(popupCanvas,0,0);
  }
  if (drewInfoWindow) {
    drawInfoWindow();
    image(infoCanvas,0,0);
  }
  if (drewWarningScreen) {
    drawDisconnectedWarning();
    image(warningCanvas,0,0);
  }
    
  frameCount++; 
}

function drawInputLine(canvas) {
  for (let i=0; i<inputNodes; i++) {
    let x1 = (border+(xsize/2-nodeSize/2)+border/4)/2;
    let x2 = border+xsize/2;
    let y;
    if (inputNodes%2 == 0) {
      y = height/2-inputNodes/2*ysize+ysize/2+i*ysize;
    } else {y = height/2-(inputNodes-1)/2*ysize+i*ysize}
    gradientLine(x1,y,x2,y,newGradientFill[0],newGradientFill[1],lineCanvas,strokeOpacity);
  }
}

function drawOutputLine(canvas) {
  let outputNum = scaleNodesArray[scaleNodesArray.length-1].length;
  for (let c=0; c<outputNum; c++) { 
    let x1 = width-(border+(xsize/2-nodeSize/2)+border/4)/2;
    let x2 = width-(border+xsize/2);
    let y;
    if (outputNum%2 == 0) {
      y = height/2-outputNum/2*ysize+ysize/2+c*ysize;
    } else {y = height/2-(outputNum-1)/2*ysize+c*ysize}
    gradientLine(x1,y,x2,y,newGradientFill[newGradientFill.length-2],newGradientFill[newGradientFill.length-1],lineCanvas,strokeOpacity);
  }
}

function drawLineSet(amount,canvas) {
  let nodeAmount = scaleNodesArray[amount].length;
  let nextNodesAmount = scaleNodesArray[amount+1].length;
  let x1,y1,x2,y2;
  let lineOpacity;
  for (let r=0; r<nodeAmount; r++) {
    x1 = amount*xsize + xsize/2 + border;
    x2 = x1 + xsize;
    if (nodeAmount%2 == 0) {
      y1 = height/2 - nodeAmount/2*ysize + ysize/2 + r*ysize;
    } else {y1 = height/2 -(nodeAmount-1)/2*ysize + r*ysize}
    for (let n=0; n<nextNodesAmount; n++) {
      if (nextNodesAmount%2 == 0) {
        y2 = height/2 - nextNodesAmount/2*ysize + ysize/2 + n*ysize;
      } else {y2 = y2 = height/2 - (nextNodesAmount-1)/2*ysize + n*ysize}
      lineOpacity = map(min(scaleNodesArray[amount][r],scaleNodesArray[amount+1][n]),0,1,0,0.5);
      gradientLine(x1,y1,x2,y2,gradientFill[amount],gradientFill[amount+1],lineCanvas,lineOpacity);
    }
  }
}

function drawNodeSet(amount,nodeColor,strokeColor,canvas) {
  let nodeAmount = scaleNodesArray[amount].length;
  let x,y;
  let shapeOpacity;
  let shapeDashByOpacity;
  let shapeDashBySize;
  for (let r=0; r<nodeAmount; r++) {
    x = amount*xsize + xsize/2 + border;
    if (nodeAmount%2 == 0) {
      y = height/2 - nodeAmount/2*ysize + ysize/2 + r*ysize;
    } else {y = height/2 - (nodeAmount-1)/2*ysize + r*ysize}
    shapeOpacity = scaleNodesArray[amount][r];
    shapeDashBySize = map(strokeRatio,1700,58000,3,10);
    shapeDashByOpacity = map(scaleNodesArray[amount][r],0,1,shapeDashBySize*2,0);
    drawNode(x,y,nodeSize,shape,nodeColor,strokeColor,shapeDashByOpacity*maxR,shapeOpacity,canvas);
  }
}

function drawNodeAnim(amount,size,nodeColor,strokeColor,canvas) {
  for (let i=0; i<animSet[amount].length; i++) {
    drawNode(animSet[amount][i][0],animSet[amount][i][1],size,shape,nodeColor,strokeColor,0,1,canvas);
  }
}

function drawNode(x,y,size,shape,nodeColor,strokeColor,dash,opacity,canvas) {
  canvas.stroke(addAlpha(strokeColor,map(opacity,0,1,0.25,1)));
  canvas.fill(addAlpha(nodeColor,map(opacity,0,1,0.15,1)));
  setLineDash([dash],canvas);
  if (fillMode == 3) {
    canvas.fill(addAlpha(nodeColor,0));
  }
  if (shape == 1) {
    canvas.ellipse(x,y,size);
  } else if (shape == 2) {
    canvas.rect(x,y,size*7/8);
  } else if (shape == 3) {
    canvas.beginShape();
    canvas.vertex(x-size*4/7,y);
    canvas.vertex(x,y-size*4/7);
    canvas.vertex(x+size*4/7,y);
    canvas.vertex(x,y+size*4/7);
    canvas.endShape(CLOSE);
  } else {
    let n = 4;
    let theta = TAU/n;
    let innerRadius = size/5;
    let outerRadius = size*4/7;
    let rotation = PI;
    canvas.beginShape();
    for (let i=0; i<n; i++) {
      canvas.vertex(x+cos(i*theta+rotation)*outerRadius, y+sin(i*theta+rotation)*outerRadius);
      canvas.vertex(x+cos((i+0.5)*theta+rotation)*innerRadius, y+sin((i+0.5)*theta+rotation)*innerRadius);
    }
    canvas.endShape(CLOSE);
  }
}

function createPattern(pattern) {
  if (pattern == 1) {
    // Plain paper
  }
  else if (pattern == 2) {
    // Dotted paper
    patternCanvas.strokeWeight(1*maxR);
    for (let x = spacing/4; x < width+spacing/4; x += spacing) {
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

function drawResultWindow() {
  popupCanvas.textFont('Trebuchet MS');
  popupCanvas.noStroke();
  popupCanvas.fill(0,0,0,75);
  popupCanvas.rect(width/2,height/2,width,height);
  popupCanvas.stroke(patternColor);
  popupCanvas.fill(paperColor);
  popupCanvas.rect(width/2,height/2,700*maxR,300*maxR,25*maxR);
  popupCanvas.strokeWeight(6*maxR);
  popupCanvas.rect(width/2-200*maxR,height/2-(100+15/2-215/2)*maxR,240*maxR)
  popupCanvas.image(img.elt,width/2-307.5*maxR,height/2-107.5*maxR,215*maxR,215*maxR);
  
  popupCanvas.strokeWeight(1*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(patternColor);
  }
  popupCanvas.rect(width/2-80*maxR,height/2+185*maxR,150*maxR,40*maxR,5*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(patternColor);
  }
  popupCanvas.rect(width/2+80*maxR,height/2+185*maxR,150*maxR,40*maxR,5*maxR);
  
  popupCanvas.noStroke();
  popupCanvas.fill(startColor);
  popupCanvas.textSize(100*maxR);
  popupCanvas.text(percentage+'%',width/2+130*maxR,height/2-10*maxR);
  popupCanvas.textSize(75*maxR);
  popupCanvas.text('"FIDENZA"',width/2+130*maxR,height/2+85*maxR);

  popupCanvas.textSize(20*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(patternColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.text('TRY AGAIN',width/2-80*maxR,height/2+192*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(patternColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.text('CLOSE',width/2+80*maxR,height/2+192*maxR);
}

function drawInfoWindow() {
  infoCanvas.textFont('Tahoma');
  infoCanvas.stroke(patternColor);
  infoCanvas.strokeWeight(2*maxR);
  infoCanvas.fill(paperColor);
  infoCanvas.rect(width/2,height-95*maxR,600*maxR,150*maxR);
  infoCanvas.rect(width/2+150*maxR,height-170*maxR,300*maxR,30*maxR)
  infoCanvas.rect(width/2-150*maxR,height-170*maxR,300*maxR,30*maxR);
  infoCanvas.noStroke();
  infoCanvas.fill(startColor);
  infoCanvas.textSize(15*maxR);
  infoCanvas.textStyle(BOLD);
  infoCanvas.text('TECHNICAL INFORMATION',width/2-285*maxR,height-165*maxR);
  infoCanvas.text('NAME:',width/2+20*maxR,height-165*maxR);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('SCALE:',width/2-285*maxR,height-135*maxR);
  infoCanvas.text('NUMBER OF HIDDEN LAYERS:',width/2-285*maxR,height-120*maxR);
  infoCanvas.text('MAXIMUM NEURONS PER LAYER:',width/2-285*maxR,height-105*maxR);
  infoCanvas.text('NUMBER OF TRAINING EPOCHS:',width/2-285*maxR,height-90*maxR);
  infoCanvas.text('SHAPE:',width/2-285*maxR,height-75*maxR);
  infoCanvas.text('COLOR PALETTE:',width/2-285*maxR,height-60*maxR);
  infoCanvas.text('FILL MODE:',width/2-285*maxR,height-45*maxR);
  infoCanvas.text('PAPER PATTERN:',width/2-285*maxR,height-30*maxR);
  infoCanvas.text('ARCHITECTURE:',width/2+20*maxR,height-135*maxR);
  infoCanvas.text('ACTIVATION FUNCTION:',width/2+20*maxR,height-120*maxR);
  infoCanvas.text('DATA SET:',width/2+20*maxR,height-105*maxR);
  infoCanvas.text('FRAMEWORK: ',width/2+20*maxR,height-90*maxR);
  infoCanvas.text('HARDWARE ACCELERATION:',width/2+20*maxR,height-75*maxR);
  infoCanvas.text('BIRTH YEAR:',width/2+20*maxR,height-60*maxR);
  infoCanvas.text('GROW PERIOD:',width/2+20*maxR,height-45*maxR);
  infoCanvas.text('STATE:',width/2+20*maxR,height-30*maxR);
  infoCanvas.textStyle(ITALIC);
  infoCanvas.textAlign(RIGHT);
  infoCanvas.textSize(15*maxR);
  infoCanvas.text('Sapien #'+seed,width/2+285*maxR,height-165*maxR);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('1:'+scaleRatio,width/2-15*maxR,height-135*maxR);
  infoCanvas.text(layerNum-2,width/2-15*maxR,height-120*maxR);
  infoCanvas.text(realMaxNodes,width/2-15*maxR,height-105*maxR);
  infoCanvas.text(epochs,width/2-15*maxR,height-90*maxR);
  infoCanvas.text(shapeName[shape],width/2-15*maxR,height-75*maxR);
  infoCanvas.text('#'+paletteType,width/2-15*maxR,height-60*maxR);
  infoCanvas.text(fillName[fillMode],width/2-15*maxR,height-45*maxR);
  infoCanvas.text(paper[pattern],width/2-15*maxR,height-30*maxR);
  infoCanvas.text(architecture,width/2+285*maxR,height-135*maxR);
  infoCanvas.text(activationFunction[shape],width/2+285*maxR,height-120*maxR);
  infoCanvas.text(dataSet[1],width/2+285*maxR,height-105*maxR);
  infoCanvas.text(framework[1],width/2+285*maxR,height-90*maxR);
  infoCanvas.text(acceleration[drawSpeed],width/2+285*maxR,height-75*maxR);
  infoCanvas.text(birthYear,width/2+285*maxR,height-60*maxR);
  infoCanvas.text(growPeriod,width/2+285*maxR,height-45*maxR);
  infoCanvas.text(liveState[state],width/2+285*maxR,height-30*maxR);
}

function getGradientColors(startColor, endColor, colorStops, numSteps) {
  let gradientColors = [];
  let segmentSteps = numSteps / (colorStops.length + 1);
  let start = color(startColor);
  let end = color(endColor);
  gradientColors.push(start);
  for (let i = 0; i < colorStops.length; i++) {
    let colorStop = color(colorStops[i]);
    for (let j = 1; j <= segmentSteps; j++) {
      let c = lerpColor(start, colorStop, j / segmentSteps);
      gradientColors.push(c);
    }
    start = colorStop;
  }
  for (let j = 1; j < segmentSteps; j++) {
    let c = lerpColor(start, end, j / segmentSteps);
    gradientColors.push(c);
  }
  gradientColors.push(end);
  if (gradientColors.length > numSteps) {
    gradientColors.splice(numSteps);
  } else if (gradientColors.length < numSteps) {
    let lastColor = gradientColors[gradientColors.length - 1];
    while (gradientColors.length < numSteps) {
      gradientColors.push(lastColor);
    }
  }
  return gradientColors;
}

function getGradientColorAtPosition(colors,position) {
  let numColors = colors.length;
  let index = Math.floor(position * numColors);
  if (index >= numColors) {
    index = numColors - 1;
  }
  return colors[index];
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return color(r, g, b);
}

function gradientLine(x1,y1,x2,y2,color1,color2,canvas,opacity) {
  // linear gradient from start to end of line
  var grad = canvas.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  canvas.drawingContext.strokeStyle = grad;
  canvas.drawingContext.globalAlpha = opacity; // set opacity
  canvas.line(x1, y1, x2, y2);
  canvas.drawingContext.globalAlpha = 1; // reset opacity to default value
}

function setLineDash(list,canvas) {
  canvas.drawingContext.setLineDash(list);
}

function addAlpha(colorString, opacity) {
  let c = color(colorString);
  let r = red(c);
  let g = green(c);
  let b = blue(c);
  return color(r, g, b, opacity * 255);
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
