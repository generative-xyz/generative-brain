new Q5("global");

const modelSeed = getRandomInt(1,10000).toString();

let border;  // screen padding
let maxR;
let img;
let drewResultWindow = false;
let drewInfoWindow = false;
let drewAnim = true;
let drewSetting = false;
let isProcessPhase = false;
let processingLayer;
let progress;
let animationLoopCount;
let processingFrames;
let satFee,activeAmount,sparkRate;
let finishedNumber,finishedText,defaultSize,startTime;

let xsize,ysize,nodeSize;
let layerNum,maxNodes,compareArray,realMaxNodes,realCompareArray,realHiddenLayerMaxNodes;
let nodesArray,scaleNodesArray,scaleRatio,scaleToggle,liveNodesArray,animArray,animSet;
let state,shape; 
let shapeStroke,lineStroke,strokeRatio;
let classNum,classArray,inputArray;
let nodeCanvas,lineCanvas,patternCanvas,popupCanvas,infoCanvas,loadingCanvas,warningCanvas,settingCanvas,checkCanvas,deadCanvas,mainCanvas;
let nodeColor,strokeColor,strokeOpacity;
let pattern,patternColor,spacing,paperColor; 
let paletteType,colorPalette,fillMode;
let startColor,endColor,colorStops,gradientColors,gradientFill,gradientUnit,newGradientFill;
let bitcoinNode,modelAddress;

let seed,architecture,birthYear,lifeCycle,epochs,activationFunction;
const liveState = [' ','Growing','Stable','Decaying','Dead','Rebirth'];

let currentNode = 0;
let currentLine = 0;
let drawSpeed; 
let speedAcce;
let frameCount = 0;
let drewWarningScreen = false, drewWarningText = true, warningCount;
let drewBorder = true;

let isIdleMode;
let wrapInput = null;
let fileInput =  null;
let oldFile = null;

let setupFinished = false;
let inputDim;
let model_name;
let classes_name;
let stats;
let traits;
let brain;
let output_prediction;
let particleSystem;
let predictions;
let stageRatio;
let drewCheckingWindow = false;
let blockEndpoint, inscriptionEndpoint;
let blockApiResult = null, modelInscriptionResult = null;
let screenshotMode = false;
let totalAnimSteps, totalFrames;

async function setup() {
  let w = windowHeight; 
  let h = windowHeight;
  // let w = 1600, h = 900;
  createCanvas(w,h);

  mainCanvas = createGraphics(w,h);
  lineCanvas = createGraphics(w,h);
  nodeCanvas = createGraphics(w,h);
  patternCanvas = createGraphics(w,h);
  popupCanvas = createGraphics(w,h);
  infoCanvas = createGraphics(w,h);
  deadCanvas = createGraphics(w,h);
  loadingCanvas = createGraphics(w,h);
  warningCanvas = createGraphics(w,h);
  settingCanvas = createGraphics(w,h);
  checkCanvas = createGraphics(w,h);
  setupRandom();
  setupTraits();
  preloadingSetup();
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
  blockEndpoint = getBlocksApiEndpoint();
  inscriptionEndpoint = getModelInscriptionEndpoint();

  let inscription;
  [stats, inscription] = await Promise.all([
    getLatestBlockStats(blockEndpoint),
    getModelInscription(inscriptionEndpoint),
  ]);

  const date = new Date(stats.time * 1000);

  brain = new Brain(traits.visual, inscription.layers_config, inscription.weight_b64);
  brain.updateAge(date);
  setupRandom();

  traits.training = inscription.training_traits;

  model_name = inscription.model_name;
  classes_name = inscription.classes_name.map(e => e.toUpperCase());
}

function initialize() {
  document.body.onfocus = checkIt;
}
      
// Define a function to check if
// the user failed to upload file
function checkIt() {
  // Check if the number of files
  // is not zero   
  setTimeout(()=>{
    const [file] = fileInput.files 
    if (file) {
      img = null;
      wrapInput.style.display = 'none';
      handleFile(URL.createObjectURL(file));
      oldFile = file;
    } else {
      wrapInput.style.display = 'block';
    }
    document.body.onfocus = null;
  }, 100)
}

function preloadingSetup() {
  maxR = min(width,height)/1024;
  paletteType = ColorPalette.findIndex(e => e[0] === traits.visual.colorPalette);
  colorPalette = [['#ffffff','#231f20','#231f20'],                                                  // 1
                  ['#231f20','#ffffff','#ffffff'],                                                  // 2
                  ['#104da8','#ffffff','#ffffff'],                                                  // 3
                  ['#722F1F','#FCE1B2','#FCE1B2'],                                                  // 4
                  ['#e88120','#f9f2e5','#f9f2e5'],                                                  // 5
                  ['#f6b941','#2E2E2E','#2E2E2E'],                                                  // 6
                  ['#45daaa','#012221','#012221'],                                                  // 7
                  ['#F1F1F1','#328DFE','#328DFE'],                                                  // 8
                  ['#111822','#D3EB8D','#D3EB8D'],                                                  // 9
                  ['#713FF9','#D6D5E6','#D6D5E6'],                                                  // 10
                  ['#FBDA9D','#795106','#795106'],                                                  // 11
                  ['#8f5b62','#ead0d0','#ead0d0'],                                                  // 12
                  ['#eae4cb','#508cac','#508cac'],                                                  // 13
                  ['#ffc6cc','#cc313d','#cc313d'],                                                  // 14
                  ['#60A900','#E0FE00','#E0FE00'],                                                  // 15
                  ['#507DBE','#D0D1D3','#D0D1D3'],                                                  // 16
                  ['#305848','#E8F2EE','#E8F2EE'],                                                  // 17
                  ['#2a2634','#5b6988','#cb78a2','#5b6988'],                                      // 18
                  ['#590e29','#fd5e53','#fd5e53','#ffe373'],                                      // 19
                  ['#0a141d','#57d4e4','#328195','#2A9ECF','#0ab6a8','#57d4e4'],              // 20
                  ['#3a2d28','#d5c2ac','#df6338','#3d9895','#d5c2ac'],                          // 21
                  ['#030706','#77c4d9','#77c4d9','#77c4d9','#ffffff','#ffffff','#e72020','#e72020'], // 22
                  ['#3a4664','#92f5ff','#f9ff94','#eaa0a2','#55dde0'],                          // 23
                  ['#fbfaff','#f04bb1','#f04bb1','#fac373','#82cef0','#8b31ce'],              // 24
                  ['#000000','#ffffff','#ff0002','#f26522','#fdff00','#00ff03','#01fffe','#0000ff','#ff00ff']]; // 25
                // paperColor,patternColor,startColor,colorStops,endColor

  for(let i = 0; i < colorPalette.length; ++i) {
    for(let j = 0; j < colorPalette[i].length; ++j) {
      colorPalette[i][j] = hexToRgb(colorPalette[i][j]);
    }
  }

  colorStops = [];
  paperColor = colorPalette[paletteType][0];
  patternColor = colorPalette[paletteType][1];
}

function installCustomUploadIfle(){ 
  wrapInput = document.querySelector('#upload');
  fileInput = document.querySelector('#inputUpload');
  
  wrapInput.addEventListener('dblclick', ()=>{
    if (drewSetting) return;
    if (drewCheckingWindow) return;

    if (isNeuronsConnected(nodesArray) && currentLine == layerNum-1) {
      fileInput.click();
      initialize();
    } else if (state == 4 || state == 5 || (!isNeuronsConnected(nodesArray) && currentLine == layerNum-1)) {
      drewWarningScreen = true;
      drewWarningText = true;
      warningCount = 0;
      frameCount = 0;
    } else {return}
  })
  
  fileInput.addEventListener('change', ()=>{    
    const [file] = fileInput.files;
    if (file) {
      img = null;
      wrapInput.style.display = 'none';
      handleFile(URL.createObjectURL(file));
      oldFile = file;
    } else {
      wrapInput.style.display = 'block';
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

function customDoubleClicked() {
  if (img == null) return;
  frameCount = 0;
  isProcessPhase = true;
  processingLayer = 0;
  animationLoopCount = 0;
  drewLineAnim = true;
  progress = (border/2 + xsize/2) / maxR;

  loadImage(img.elt.src, q5img => {
    const [w_img, h_img, c_img] = inputDim;
    const graphic = createGraphics(w_img, h_img);
    graphic.image(q5img, 0, 0, w_img, h_img);
    graphic.loadPixels();

    const data = graphic.pixels.filter((_, i) => i%4 != 3); 
    const result = brain.classifyImage(data);
    predictions = zip([result, classes_name])
      .sort((a, b) => a[0] > b[0] ? -1 : 1);
  });
}

function handleFile(fileSrc) {
  img = createImg(fileSrc,'');
  img.hide();
  customDoubleClicked();
}

function processPhase() {
  if (!screenshotMode) {
    progress += (width-border-xsize)/totalFrames / maxR;
  }

  setEraseMode(lineCanvas);
  lineCanvas.rect(progress * maxR,0,width,height);
  setNoEraseMode(lineCanvas);

  if (frameCount >= sparkRate && drewAnim == true) {
    drewAnim = false;
    frameCount -= sparkRate;
  } 
  if (drewAnim) {
    setEraseMode(nodeCanvas);
    nodeCanvas.strokeWeight(shapeStroke*2);
    drawNodeAnim(processingLayer,nodeSize,paperColor,paperColor,nodeCanvas);
    setNoEraseMode(nodeCanvas);
  }
  if (frameCount >= sparkRate && drewAnim == false) {
    drewAnim = true;
    frameCount -= sparkRate;
    processingLayer += 1;
    if (processingLayer == totalAnimSteps) {
      ++animationLoopCount;
      processingLayer = 0;
      progress = (border/2 + xsize/2) / maxR;
      if (animationLoopCount == 1) {
        isProcessPhase = false;
        resultWindow();
        startTime = millis();
      }
    }
  }
}

function resultWindow() {
  drewResultWindow = true;
  finishedNumber = false;
  finishedText = false;
  tryButton = makeButton('Try Again', width/2-155*maxR, height/2+165*maxR, 150*maxR, 40*maxR, tryAgain);
  closeResultButton = makeButton('Close', width/2+5*maxR, height/2+165*maxR, 150*maxR, 40*maxR, closeResult);
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
  if (setupFinished && drewSetting === false && drewCheckingWindow === false) {
    if ((key === 'i' || key === 'I')) {
      drewInfoWindow = !drewInfoWindow;
    }
    if ((key === 'b' || key === 'B')) {
      drewBorder = !drewBorder;
    }
    if ((key === 's' || key === 'S')) {
      saveCanvasAtCurrentTime();
    }  
    if ((key === 'k' || key === 'K')) {
      save4KCanvasAtCurrentTime();
    }
    if ((key === 'u' || key === 'U') && drewResultWindow === false && drewWarningScreen === false && isProcessPhase === false) {
      settingPopup();
      drewInfoWindow = false;
    }
  }
}

function settingPopup() {
  drewSetting = true;
  blockApiResult = null;
  modelInscriptionResult = null;

  submitButton = makeButton('Submit', width/2-155*maxR, height/2+115*maxR, 150*maxR, 40*maxR, submit);
  closeSettingButton = makeButton('Close', width/2+5*maxR, height/2+115*maxR, 150*maxR, 40*maxR, closeSetting);
  bitcoin = createInput();
  bitcoin.position(width/2-252.5*maxR,height/2-40*maxR);
  bitcoin.size(500*maxR,25*maxR);
  bitcoin.style('font-size','15px');
  bitcoin.value(blockEndpoint || '');
  address = createInput();
  address.position(width/2-252.2*maxR,height/2+35*maxR);
  address.size(500*maxR,25*maxR);
  address.style('font-size','15px');
  address.value(inscriptionEndpoint || '');
}

function submit() {
  bitcoinNode = bitcoin.value();
  modelAddress = address.value();

  submitButton.hide();
  closeSettingButton.hide();
  bitcoin.hide();
  address.hide();

  drewSetting = false;
  drewCheckingWindow = true;
  startEndpointsCheck();
}

async function startEndpointsCheck() {
  [blockApiResult, modelInscriptionResult, _] = await Promise.all([
    isValidBlocksApiEndpoint(bitcoinNode),
    isValidModelInscriptionEndpoint(modelAddress),
    sleep(1000),
  ]);

  drewCheckingWindow = false;

  if (blockApiResult && modelInscriptionResult) {
  setBlocksApiEndpoint(bitcoinNode);
  setModelInscriptionEndpoint(modelAddress);
  window.location.reload();
  } else {
    drewSetting = true;
    submitButton.show();
    closeSettingButton.show();
    bitcoin.show();
    address.show();
  }
}

function drawCheckingWindow() {
  checkCanvas.textFont('Trebuchet MS');
  checkCanvas.noStroke();
  drawPopup(checkCanvas,600*maxR,200*maxR);
  checkCanvas.strokeWeight(1*maxR);
  checkCanvas.stroke(startColor);
  checkCanvas.fill(startColor);
  checkCanvas.textSize(50*maxR);
  checkCanvas.text("update()", width/2, height/2+2.5*maxR);
}

function closeSetting() {
  blockApiResult = null;
  modelInscriptionResult = null;
  drewSetting = false;
  submitButton.hide();
  closeSettingButton.hide();
  bitcoin.hide();
  address.hide();
}

function setupSketch() {
  setupRandom();
  finishedNumber = false;
  finishedText = false;
    
  architecture = traits.training.structure_gen;
  birthYear = traits.visual.birthYear;
  lifeCycle = traits.visual.lifeCycle;
  epochs = traits.training.epoch_num;
  activationFunction = traits.training.activation_func;
  
  drawSpeed = HardwareAcceleration.findIndex(e => e[0] == traits.visual.hardwareAcceleration) + 1;
  if (drawSpeed == 1) {
    speedAcce = 40; processingFrames = 40;
  } else if (drawSpeed == 2) {
    speedAcce = 15; processingFrames = 20;
  } else {
    speedAcce = 2; processingFrames = 10;
  }

  const brainStatus = brain.getBrainStatus();
  inputDim = brainStatus.inputDim;
  stageRatio = brainStatus.stageRatio;
  
  border = 100*maxR;
  spacing = 50*maxR;
  state = brainStatus.stage;
  shape = NodeShape.findIndex(e => e[0] == traits.visual.nodeShape) + 1;
  fillMode = NodeFill.findIndex(e => e[0] == traits.visual.nodeFill) + 1;
  pattern = Pattern.findIndex(e => e[0] == traits.visual.pattern) + 1;

  satFee = Math.tanh(Math.log10(stats.avgfeerate));
  satFee = map(satFee, 0, 1, 0.2, 0.8);
  
  inputNodes = 1;
  classNum = 1;
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
  realHiddenLayerMaxNodes = max(...realCompareArray.slice(0, -1));
  
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
  } else {
    scaleNodesArray = nodesArray;
  }
  scaleNodesArray.unshift(inputArray);
  
  if (state == 1) {
    for (let i=0; i<scaleNodesArray.length; i++) {
      let arr = [];
      for (let j=0; j<scaleNodesArray[i].length; j++) {
        if (scaleNodesArray[i][j] != 0) arr.push(scaleNodesArray[i][j]);
      }
      scaleNodesArray[i] = arr;
    }
    for (let i=0; i<scaleNodesArray.length; i++) {
      if (scaleNodesArray[i].length == 0) {scaleNodesArray[i].push(0)}
    }
  }
  
  compareArray = [];
  for (let i=0; i<scaleNodesArray.length; i++) {
    compareArray.push(scaleNodesArray[i].length);
  }
  maxNodes = max(...compareArray);
  layerNum = scaleNodesArray.length;
  xsize = (width - border) / layerNum;
  ysize = (height - border*2) / maxNodes;
  nodeSize = min(xsize,ysize)/2;
  
  liveNodesArray = [];
  for (let i=0; i<scaleNodesArray.length; i++) {
    let nodeAmount = scaleNodesArray[i].length;
    for (let r=0; r<nodeAmount; r++) {
      if (scaleNodesArray[i][r] == 1) {
        const [x, y] = getNodePosition(i, r);
        liveNodesArray.push([x, y]);
      }
    }
  }
  
  totalFrames = 2 * (layerNum - 1) * processingFrames;
  
  const sparkRateExact = map(satFee,0.2,0.8,15,2);
  sparkRate = getClosestDivisibleFraction(totalFrames/2, 1, sparkRateExact) / 2;

  totalAnimSteps = round(totalFrames/(2*sparkRate));

  activeAmount = floor(liveNodesArray.length*satFee);
  animSet = [];
  animArray = [];
  for (let k=0; k<totalAnimSteps; k++) {
    for (let i=0; i<activeAmount; i++) {
      let j = floor(random(1.0)*liveNodesArray.length);
      animArray.push(liveNodesArray.slice(j,j+1)[0]);
    }
    animSet.push(animArray);
    animArray = [];
  }
  
  strokeRatio = min(1 / layerNum, 1 / maxNodes);
  shapeStroke = map(strokeRatio,1/30,1,2,4) * maxR;
  lineStroke = map(strokeRatio,1/30,1,1,10) * maxR;
  strokeOpacity = 0.7;
  
  colorStops = [];
  startColor = colorPalette[paletteType][2];
  endColor = colorPalette[paletteType][colorPalette[paletteType].length-1];
  for (let i=3; i<colorPalette[paletteType].length-1; i++) {
    colorStops.push(colorPalette[paletteType][i]);
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

  currentNode = 0;
  currentLine = 0;
  frameCount = 0;
  isIdleMode = true;

  const wall = {
    xLeft: border/8,
    xRight: width - border/8,
    yTop: border/8,
    yBottom: height - border/8,
  }

  console.log(scaleNodesArray);

  const scaledTotalNeurons = scaleNodesArray.map(x => x.length);
  particleSystem = new ParticleSystem(gradientFill, scaledTotalNeurons, wall, shape, maxR);
}

function getNodePosition(i, r) {
  let nodeAmount = scaleNodesArray[i].length;
  const x = i*xsize + xsize/2 + border/2;
  const y = height/2 - (nodeAmount-1)/2*ysize + r*ysize;
  return [x, y];
}

function updateMaxR(width, height) {
  maxR = min(width,height)/1024;
  
  border = 100*maxR;
  spacing = 50*maxR;
  
  xsize = (width - border) / layerNum;
  ysize = (height - border*2) / maxNodes;
  nodeSize = min(xsize,ysize)/2;
  
  liveNodesArray = [];
  for (let i=0; i<scaleNodesArray.length; i++) {
    let nodeAmount = scaleNodesArray[i].length;
    for (let r=0; r<nodeAmount; r++) {
      if (scaleNodesArray[i][r] == 1) {
        const [x, y] = getNodePosition(i, r);
        liveNodesArray.push([x, y]);
      }
    }
  }

  activeAmount = floor(liveNodesArray.length*satFee);
  animSet = [];
  animArray = [];
  sparkRate = floor(map(satFee,0.2,0.8,15,2));
  for (let k=0; k<totalAnimSteps; k++) {
    for (let i=0; i<activeAmount; i++) {
      let j = floor(random(1.0)*liveNodesArray.length);
      animArray.push(liveNodesArray.slice(j,j+1)[0]);
    }
    animSet.push(animArray);
    animArray = [];
  }  

  strokeRatio = min(1 / layerNum, 1 / maxNodes);
  shapeStroke = map(strokeRatio,1/30,1,2,4) * maxR;
  lineStroke = map(strokeRatio,1/30,1,1,10) * maxR;

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
}

function drawDeadAnimation() {
  particleSystem.update();
  const drawRatio = (state == 4) ? 0 : stageRatio;
  particleSystem.draw(deadCanvas, paperColor, fillMode, drawRatio, maxR);
}

function drawCanvases() {
  if (!setupFinished) {
    drawLoadingScreen();
    mainCanvas.image(loadingCanvas, 0, 0);  
    return;
  }

  if (state == 4 || state == 5) {
    drawDeadAnimation();
    mainCanvas.image(deadCanvas, 0, 0);
    return;
  } 
  
  if (frameCount >= speedAcce && currentNode < layerNum) {
    currentNode++;
    frameCount = 0;
  }
    
  // draw neural nodes
  for (let i=0; i<currentNode; i++) {
    if (fillMode == 1) {
      nodeColor = strokeColor = gradientFill[i];
    } else {
      nodeColor = paperColor;
      strokeColor = gradientFill[i];
    }
    drawNodeSet(i,nodeColor,strokeColor,nodeCanvas);
  }

  // draw neural lines
  if (frameCount >= speedAcce && currentLine < layerNum-1) {
    currentLine++;
    frameCount = 0;
  }  
  for (let i=0; i<currentLine; i++) {
    drawLineSet(i);
  }  
}

function drawOnMainCanvas() {
  mainCanvas.background(paperColor);

  popupCanvas.background(255);
  popupCanvas.rectMode(CENTER);
  eraseCanvas(popupCanvas);
  popupCanvas.textAlign(CENTER,CENTER);
  popupCanvas.textStyle(BOLD);
  popupCanvas.stroke(patternColor);
  popupCanvas.strokeWeight(8*maxR);
  popupCanvas.fill(paperColor);
  
  deadCanvas.background(255);
  deadCanvas.rectMode(CENTER)
  eraseCanvas(deadCanvas);
  deadCanvas.strokeWeight(maxR);

  infoCanvas.background(255);
  infoCanvas.rectMode(CENTER);
  eraseCanvas(infoCanvas);
  infoCanvas.textAlign(LEFT);
  
  nodeCanvas.background(255);
  nodeCanvas.rectMode(CENTER);
  eraseCanvas(nodeCanvas);
  
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
  if (drewBorder) {
    patternCanvas.rect(border/16,height/2,border/8,height);
    patternCanvas.rect(width-border/16,height/2,border/8,height);
    patternCanvas.rect(width/2,border/16,width,border/8);
    patternCanvas.rect(width/2,height-border/16,width,border/8);
  }

  warningCanvas.background(255);
  warningCanvas.rectMode(CENTER);
  eraseCanvas(warningCanvas);
  warningCanvas.textAlign(CENTER,CENTER);
  warningCanvas.textStyle(BOLD);
  warningCanvas.stroke(patternColor);
  warningCanvas.strokeWeight(8*maxR);
  warningCanvas.fill(paperColor);
  
  loadingCanvas.background(255);
  loadingCanvas.rectMode(CENTER);
  eraseCanvas(loadingCanvas);
  loadingCanvas.textAlign(CENTER,CENTER);
  loadingCanvas.textStyle(BOLD);
  
  settingCanvas.background(255);
  settingCanvas.rectMode(CENTER);
  eraseCanvas(settingCanvas);
  settingCanvas.textAlign(CENTER,CENTER);
  settingCanvas.textStyle(BOLD);
  settingCanvas.stroke(patternColor);
  settingCanvas.strokeWeight(8*maxR);
  settingCanvas.fill(paperColor);

  checkCanvas.background(255);
  checkCanvas.rectMode(CENTER);
  eraseCanvas(checkCanvas);
  checkCanvas.textAlign(CENTER,CENTER);
  checkCanvas.textStyle(BOLD);
  checkCanvas.stroke(patternColor);
  checkCanvas.strokeWeight(8*maxR);
  checkCanvas.fill(paperColor);

  drawCanvases();

  mainCanvas.image(patternCanvas,0,0);
  if (isProcessPhase) {
    processPhase();
  }
  mainCanvas.image(lineCanvas,0,0);
  mainCanvas.image(nodeCanvas,0,0);
  if (drewResultWindow) {
    drawResultWindow();
    mainCanvas.image(popupCanvas,0,0);
  }
  if (drewWarningScreen) {
    drawDisconnectedWarning();
    mainCanvas.image(warningCanvas,0,0);
  }
  if (drewSetting) {
    drawSetting();
    mainCanvas.image(settingCanvas,0,0);
  }
  if (drewInfoWindow) {
    drawInfoWindow();
    mainCanvas.image(infoCanvas,0,0);
  }
  if (drewCheckingWindow) {
    drawCheckingWindow();
    mainCanvas.image(checkCanvas,0,0);
  }
}

function draw() {
  drawOnMainCanvas();
  image(mainCanvas, 0, 0);

  if (!screenshotMode) {
    frameCount++; 
  }
}

function drawLineSet(amount) {
  let nodeAmount = scaleNodesArray[amount].length;
  let nextNodesAmount = scaleNodesArray[amount+1].length;
  let lineOpacity;
  for (let r=0; r<nodeAmount; r++) {
    const [x1, y1] = getNodePosition(amount, r);
    for (let n=0; n<nextNodesAmount; n++) {
      const [x2, y2] = getNodePosition(amount+1, n);
      lineOpacity = map(min(scaleNodesArray[amount][r],scaleNodesArray[amount+1][n]),0,1,0,0.5);
      gradientLine(x1,y1,x2,y2,gradientFill[amount],gradientFill[amount+1],lineCanvas,lineOpacity);
    }
  }
}

function drawNodeSet(amount,nodeColor,strokeColor,canvas) {
  let nodeAmount = scaleNodesArray[amount].length;
  let shapeOpacity;
  let shapeDashByOpacity;
  let shapeDashBySize;
  for (let r=0; r<nodeAmount; r++) {
    const [x, y] = getNodePosition(amount, r);
    shapeOpacity = scaleNodesArray[amount][r];
    shapeDashBySize = map(strokeRatio, 1/30, 1, 3, 10);
    shapeDashByOpacity = map(scaleNodesArray[amount][r],0,1,shapeDashBySize*2,0) * maxR;
    if (shapeDashByOpacity < 1.5 * maxR) shapeDashByOpacity = 0;
    drawNode(x,y,nodeSize,shape,nodeColor,strokeColor,shapeDashByOpacity,shapeOpacity,canvas);
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
  canvas.strokeWeight(shapeStroke);
  setLineDash([dash],canvas);
  if (fillMode == 3) {
    canvas.fill(addAlpha(nodeColor,0));
  }
  if (shape == 1) {
    canvas.ellipse(x,y,size);
  } else if (shape == 2) {
    canvas.rect(x,y,size*7/8,size*7/8);
  } else if (shape == 3) {
    canvas.beginShape();
    canvas.vertex(x-size*4/7,y);
    canvas.vertex(x,y-size*4/7);
    canvas.vertex(x+size*4/7,y);
    canvas.vertex(x,y+size*4/7);
    canvas.endShape(CLOSE);
  } else if (shape == 4) {
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
  } else {
    let n = 3;
    let theta = TAU/n;
    let innerRadius = size*3/5;
    let outerRadius = size*3/5;  
    let rotation = PI/2;
    canvas.beginShape();
    for (let i=0; i<n; i++) {
      canvas.vertex(x+cos(i*theta+rotation)*outerRadius, y+sin(i*theta+rotation)*outerRadius);
      canvas.vertex(x+cos((i+0.5)*theta+rotation)*innerRadius, y+sin((i+0.5)*theta+rotation)*innerRadius);
    }
    canvas.endShape(CLOSE);
    if (fillMode == 1) {
      if (opacity < 0.7) {canvas.stroke(strokeColor,map(opacity,0,1,0.25,1))}
      else {canvas.stroke(addAlpha(paperColor,map(opacity,0,1,0.25,1)))}
    } else {canvas.stroke(strokeColor,map(opacity,0,1,0.25,1))}
    canvas.strokeWeight(shapeStroke*2/3);
    for (let i=0; i<n; i++) {
      canvas.line(x, y, x+cos(i*theta+rotation)*outerRadius, y+sin(i*theta+rotation)*outerRadius);  
    }
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
  drawPopup(popupCanvas,700*maxR,300*maxR);
  popupCanvas.strokeWeight(6*maxR);
  popupCanvas.rect(width/2-200*maxR,height/2-(100+15/2-215/2)*maxR,240*maxR,240*maxR);
  popupCanvas.image(img.elt,width/2-307.5*maxR,height/2-107.5*maxR,215*maxR,215*maxR);
  
  popupCanvas.noStroke();
  popupCanvas.fill(startColor);
  popupCanvas.textSize(100*maxR);
  let prediction_str;
  if (!finishedNumber) {    
    prediction_str = random(10,100).toFixed(2);
  } else {
    prediction_str = (predictions[0][0] * 100).toFixed(2);
    if (prediction_str == "100.00") {
      prediction_str = "100";
    }
  }
  popupCanvas.text(prediction_str + '%',width/2+130*maxR,height/2-35*maxR);
  
  example = predictions.map(e => e[1]);
  defaultSize = popupCanvas.textWidth('"FIDENZA"');
  defaultPhrase = popupCanvas.textWidth('"PERPENDICULAR INHABITATION"');
  
  const textToPrint = finishedText ? example[0] : random(example);
  const numWords = textToPrint.split(" ").length;
  if (numWords === 1) {
    let newSize = 75*defaultSize/popupCanvas.textWidth('"'+textToPrint+'"');
    if (newSize > 75) {newSize = 75}
    popupCanvas.textSize(newSize*maxR);
    popupCanvas.text('"'+textToPrint+'"',width/2+130*maxR,height/2+65*maxR);       
  } else {
    writePhrase(width/2+130*maxR,height/2+65*maxR,360*maxR,110*maxR,textToPrint,popupCanvas);
  }  

  if (millis()-startTime > 1000) {
    finishedNumber = true;
  }
  if (millis()-startTime > 1500) {
    finishedText = true;
  }

  drawButton(popupCanvas, width/2-155*maxR, width/2-5*maxR, height/2+165*maxR, height/2+205*maxR, 'TRY AGAIN');
  drawButton(popupCanvas, width/2+5*maxR, width/2+155*maxR, height/2+165*maxR, height/2+205*maxR, 'CLOSE');
}

function writePhrase(x,y,textBoxWidth,textBoxHeight,word,canvas) {
  let wordsArray = word.split(' ');
  let newSize = 75*defaultSize/canvas.textWidth('"'+word+'"');
  let currentWidth = 0, words1 = [], words2 = [], wordsLeft = [], line1 = '', line2 = '';
  if (newSize >= 45) {
    if (newSize > 75) {newSize = 75}
    canvas.textSize(newSize*maxR);
    canvas.text('"'+word+'"',x,y);
  } else {
    if (newSize < 45) {
      newSize = 45*defaultPhrase/canvas.textWidth('"'+word+'"');
      if (newSize > 20) {
        if (newSize > 45) {newSize = 45}
        [line1,line2] = divideLines(newSize,textBoxWidth,currentWidth,words1,words2,wordsArray,line1,line2,popupCanvas);
        if (words2.length == 0) {
          canvas.textSize(newSize*maxR);
          canvas.text('"'+word+'"',x,y);
          return;
        } else {
          currentWidth = 0; words1 = []; words2 = [];
          while (canvas.textWidth(line2) > textBoxWidth/maxR) {
            newSize = newSize*textBoxWidth/maxR/canvas.textWidth(line2);
            line1 = ''; line2 = '';
            [line1,line2] = divideLines(newSize,textBoxWidth,currentWidth,words1,words2,wordsArray,line1,line2,popupCanvas);
          }
        }
      } else {
        newSize = 20;
        canvas.textSize(newSize);
        for (let i=0; i<wordsArray.length; i++) {
          currentWidth += canvas.textWidth(' '+wordsArray[i]);
          if (currentWidth <= textBoxWidth/maxR) {
            words1.push(wordsArray[i]); 
          } else if (currentWidth > textBoxWidth/maxR && currentWidth <= textBoxWidth/maxR*2) {
            words2.push(wordsArray[i]);
          } else {
            wordsLeft.push(wordsArray[i]);
          }
        }
        for (let i=1; i<words1.length; i++) {line1 = line1+' '+words1[i]}
        line1 = '"'+words1[0]+line1;
        if (wordsLeft.length == 0) {
          for (let i=0; i<words2.length-1; i++) {line2 = line2+words2[i]+' '}
          line2 = line2+words2[words2.length-1]+'"';
        } else if (words2.length == 1) {line2 = '...'+' '+wordsLeft[wordsLeft.length-1]+'"'}
        else {
          for (let i=0; i<words2.length-1; i++) {line2 = line2+words2[i]+' '}
          line2 = line2+'...'+' '+wordsLeft[wordsLeft.length-1]+'"'; 
        }
      }
      canvas.textSize(newSize*maxR);
      let textHeight = (canvas.textDescent() + canvas.textAscent())*1.25;
      canvas.text(line1,x,y-textHeight/2);
      canvas.text(line2,x,y+textHeight/2);
    }
  }
}

function divideLines(size,textBoxWidth,currentWidth,words1,words2,wordsArray,line1,line2,canvas) {
  canvas.textSize(size);
  for (let i=0; i<wordsArray.length; i++) {
    currentWidth += canvas.textWidth(' '+wordsArray[i]);
    if (currentWidth <= textBoxWidth/maxR) {
      words1.push(wordsArray[i]); 
    } else {
      words2.push(wordsArray[i]);
    }
  }
  for (let i=1; i<words1.length; i++) {line1 = line1+' '+words1[i]}
  line1 = '"'+words1[0]+line1;
  if (words2.length == 0) {line1 = line1 + '"'; line2 = ''}
  if (words2.length == 1) {line2 = words2[words2.length-1]+'"'}
  else {
    for (let i=0; i<words2.length-1; i++) {line2 = line2+words2[i]+' '}
    line2 = line2+words2[words2.length-1]+'"'; 
  }
  return [line1,line2];
}
  
function drawInfoWindow() {
  infoCanvas.textFont('Tahoma');
  infoCanvas.stroke(patternColor);
  infoCanvas.strokeWeight(2*maxR);
  infoCanvas.fill(paperColor);
  infoCanvas.rect(width/2,height-87.5*maxR,600*maxR,135*maxR);
  infoCanvas.fill(patternColor);
  infoCanvas.rect(width/2-150*maxR,height-170*maxR,300*maxR,30*maxR);
  infoCanvas.fill(paperColor);
  infoCanvas.rect(width/2+150*maxR,height-170*maxR,300*maxR,30*maxR);
  infoCanvas.noStroke();
  infoCanvas.fill(paperColor);
  
  infoCanvas.textSize(15*maxR);
  infoCanvas.textStyle(BOLD);
  infoCanvas.text('TECHNICAL INFORMATION',width/2-285*maxR,height-165*maxR);
  infoCanvas.fill(startColor);
  infoCanvas.text('NAME:',width/2+10*maxR,height-165*maxR);
  infoCanvas.textAlign(RIGHT);
  infoCanvas.textStyle(ITALIC);
  infoCanvas.text('Perceptron #'+seed,width/2+285*maxR,height-165*maxR);
  
  data = [
    ['AI MODEL:', fitStrToWidth(12*maxR, model_name, 160*maxR)],
    ['SCALE:', '1:'+scaleRatio],
    ['NUMBER OF CLASSES:', classes_name.length],
    ['NUMBER OF HIDDEN LAYERS:', layerNum-2],
    ['MAX NEURONS PER HIDDEN LAYER:', realHiddenLayerMaxNodes],
    ['NUMBER OF TRAINING EPOCHS:', epochs],
    ['COLOR PALETTE:', ColorPalette[paletteType][0]],
    ['PAPER PATTERN:', Pattern[pattern-1][0]],
    ['NETWORK ARCHITECTURE:', architecture],
    ['ACTIVATION FUNCTION:', activationFunction],
    ['DATA SET:', NodeFill[fillMode-1][0]],
    ['DEEP LEARNING FRAMEWORK:', NodeShape[shape-1][0]],
    ['HARDWARE ACCELERATION:', HardwareAcceleration[drawSpeed-1][0]],
    ['BIRTH YEAR:', birthYear],
    ['LIFE CYCLE:', lifeCycle],
    ['STATE:', liveState[state]],
  ];

  infoCanvas.fill(startColor);
  const half = data.length / 2;
  for (let i = 0; i < data.length; ++i) {
    const isLeft = i < half;
    const xLabel = isLeft ? width/2-285*maxR : width/2+10*maxR;
    const xValue = isLeft ? width/2-10*maxR : width/2+285*maxR;
    const y = height-(135-15*(i%half))*maxR;

    infoCanvas.textStyle(BOLD);
    infoCanvas.textAlign(LEFT);
    infoCanvas.textSize(12*maxR);
    infoCanvas.text(data[i][0],xLabel,y);

    infoCanvas.textStyle(ITALIC);
    infoCanvas.textAlign(RIGHT);
    infoCanvas.textSize(12*maxR);
    infoCanvas.text(data[i][1],xValue,y);
  }
}

function drawSetting() {
  settingCanvas.textFont('Trebuchet MS');
  settingCanvas.noStroke();
  drawPopup(settingCanvas,600*maxR,200*maxR);
  
  drawButton(settingCanvas, width/2-155*maxR, width/2-5*maxR, height/2+115*maxR, height/2+155*maxR, 'UPDATE');
  drawButton(settingCanvas, width/2+5*maxR, width/2+155*maxR, height/2+115*maxR, height/2+155*maxR, 'CLOSE');
  
  settingCanvas.textAlign(LEFT);
  settingCanvas.fill(startColor);
  settingCanvas.text('UPDATE BITCOIN FULL NODE ADDRESS',width/2-252.5*maxR,height/2-55*maxR);
  settingCanvas.text('UPDATE MODEL ADDRESS',width/2-252.5*maxR,height/2+20*maxR);
  settingCanvas.textAlign(RIGHT);
  settingCanvas.textStyle(ITALIC);
  settingCanvas.textSize(15*maxR);
  if (blockApiResult == false) {settingCanvas.text('(*) Invalid Address',width/2+252.5*maxR,height/2-53*maxR)}
  if (modelInscriptionResult == false) {settingCanvas.text('(*) Invalid Model',width/2+252.5*maxR,height/2+23*maxR)}
}

function drawLoadingScreen() {
  loadingCanvas.textFont('Trebuchet MS');
  loadingCanvas.fill(patternColor);
  loadingCanvas.textSize(50*maxR);
  loadingCanvas.stroke(patternColor);
  loadingCanvas.strokeWeight(1*maxR);
  loadingCanvas.text('main()', width/2, height/2);
}

function drawDisconnectedWarning() {
  if (frameCount >= 20 && drewWarningText == true) {
    drewWarningText = false;
    frameCount = 0;
  } 
  if (drewWarningText) {
    warningCanvas.textFont('Trebuchet MS');    
    warningCanvas.stroke(patternColor);
    warningCanvas.fill(paperColor);
    warningCanvas.rect(width/2,height/2,600*maxR,150*maxR,25*maxR);
    warningCanvas.fill(startColor);
    warningCanvas.textSize(75*maxR);
    warningCanvas.noStroke();
    if (state == 1) {warningCanvas.text('GROWING',width/2,height/2+5*maxR)}
    else if (state == 3) {warningCanvas.text('AGING',width/2,height/2+5*maxR)}
    else if (state == 4) {warningCanvas.text('DEAD',width/2,height/2+5*maxR)}
    else if (state == 5) {warningCanvas.text('BIRTH',width/2,height/2+5*maxR)}
  }
  if (frameCount >= 20 && drewWarningText == false) {
    drewWarningText = true;
    frameCount = 0;
    warningCount ++;
    if (warningCount == 3) {
      drewWarningScreen = false;
    }
  }
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

saveCanvasAtCurrentTime = () => {
  save(getLocalTimeStr());
}

save4KCanvasAtCurrentTime = () => {
  const w = width, h = height;
  const newW = 4096, newH = h * 4096/w;

  resizeAllCanvas(newW, newH);
  screenshotMode = true;
  updateMaxR(newW, newH);  
  drawOnMainCanvas();

  let filename = '4K_' + getLocalTimeStr() + '.png';
  saveCanvas(mainCanvas, filename);

  resizeAllCanvas(w, h);
  updateMaxR(w, h);  
  screenshotMode = false;
}

function isMouseInside(x1, x2, y1, y2) {
  return mouseX>x1 && mouseX<x2 && mouseY>y1 && mouseY<y2;
}

function drawButton(canvas, x1, x2, y1, y2, text) {
  canvas.strokeWeight(1*maxR);
  canvas.stroke(patternColor);
  
  const [backgroundColor, textColor] = isMouseInside(x1, x2, y1, y2) ? [startColor, paperColor] : [paperColor, startColor];
  canvas.fill(backgroundColor);
  canvas.push();
  canvas.rectMode(CORNERS);
  canvas.rect(x1,y1,x2,y2,5*maxR);
  canvas.pop();
  
  canvas.noStroke();
  canvas.textSize(20*maxR);
  canvas.fill(textColor);
  canvas.text(text,(x1+x2)/2,(y1*46+y2*54)/100);
}

function drawPopup(canvas, w, h) {
  canvas.fill(0,0,0,75);
  canvas.rect(width/2,height/2,width,height);
  canvas.stroke(patternColor);
  canvas.fill(paperColor);
  canvas.rect(width/2,height/2,w,h,25*maxR);
}

function resizeAllCanvas(w, h) {
  resizeCanvas(w, h, true);
  lineCanvas.resizeCanvas(w, h, true);
  nodeCanvas.resizeCanvas(w, h, true);
  patternCanvas.resizeCanvas(w, h, true);
  popupCanvas.resizeCanvas(w, h, true);
  infoCanvas.resizeCanvas(w, h, true);
  deadCanvas.resizeCanvas(w, h, true);
  loadingCanvas.resizeCanvas(w, h, true);
  warningCanvas.resizeCanvas(w, h, true);
  settingCanvas.resizeCanvas(w, h, true);
  checkCanvas.resizeCanvas(w, h, true);
  mainCanvas.resizeCanvas(w, h, true);
}

function makeButton(text, x, y, w, h, onClick) {
  const button = createButton(text);
  button.position(x, y);
  button.size(w, h);
  button.style('opacity','0');
  button.mouseClicked(onClick);
  return button;
}