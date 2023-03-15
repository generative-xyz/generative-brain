const modelSeed = '9';

new Q5("global");

let border;  // screen padding
let maxR;
let inputImg;
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
let percentage,finishedNumber,finishedText,defaultSize,startTime;

let xsize,ysize,nodeSize;
let layerNum,maxNodes,compareArray,realMaxNodes,realCompareArray,realHiddenLayerMaxNodes;
let nodesArray,scaleNodesArray,scaleRatio,scaleToggle,liveNodesArray,animArray,animSet;
let state,shape; 
let shapeStroke,lineStroke,strokeRatio;
let classNum,classArray,inputNum,inputArray;
let nodeCanvas,lineCanvas,patternCanvas,popupCanvas,infoCanvas,loadingCanvas,warningCanvas,settingCanvas,checkCanvas;
let nodeColor,strokeColor,strokeOpacity;
let pattern,patternColor,spacing,paperColor; 
let paletteType,colorPalette,fillMode;
let startColor,endColor,colorStops,gradientColors,gradientFill,gradientUnit,newGradientFill;
let bitcoinNode,modelAddress;

let seed,architecture,birthYear,lifeCycle,epochs,framework,dataSet,paper,liveState,activationFunction,acceleration;
let paletteName = [' ','Monochrome','Blackboard','Blueprint','Industrial Steel','Spectrum','Mariana Trench','Twilight','Gaia','Autumn Harvest','Bubblegum','Sleek Neutrals','Barbie World','Warning Zone','Chilli Sauce','American Dream','Broken Beach','Nightlife','Nautical Adventure','Cotton Candy','Golden Hour','Matcha Latte','Hot Cocoa','Midnight Blossoms','Lemonade','Strawberry Milk','Campfire','Black Pink','Chlorophyll'];

let nodeSet = [];
let lineSet = [];
let currentNode = 0;
let currentLine = 0;
let drawSpeed; 
let speedAcce;
let frameCount = 0;
let drewInputLine = false;
let drewOutputLine = false;
let drewWarningScreen = false, drewWarningText = true, warningCount;
let drewBorder = true;

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
let predictions;
let stageRatio;
let mainCanvas;
let drewCheckingWindow = false;
let blockEndpoint;
let inscriptionEndpoint;
let blockApiResult = null;
let modelInscriptionResult = null;
let screenshotMode = false;
let totalAnimSteps;

async function setup() {
  let w = windowWidth; 
  let h = windowHeight;
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
  framework = [' ','Theano','Torch','TensorFlow','Caffe'];
  dataSet = [' ','MNIST','CIFAR','IMAGENET'];
  paper = [' ','Plain','Dotted','Squared'];
  liveState = [' ','Growing','Stable','Decaying','Dead','Rebirth'];
  acceleration = [' ','Basic','Standard','Advanced'];
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
  paletteType = paletteName.indexOf(traits.visual.colorPalette);
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
                  ['#704f38','#52392f','#e9ccaf','#f0bd90','#e9ccaf'],                          // 22
                  ['#3d1460','#df678c','#df678c'],                                                  // 23
                  ['#00b8ff','#9be8ff','#fffbba','#feff50','#fffbba'],                          // 24
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
}

function installCustomUploadIfle(){ 
  wrapInput = document.querySelector('#upload');
  fileInput = document.querySelector('#inputUpload');
  
  wrapInput.addEventListener('dblclick', ()=>{
    if (drewSetting) return;
    if (drewCheckingWindow) return;

    if (isNeuronsConnected(nodesArray) && drewOutputLine == true) {
      fileInput.click();
      initialize();
    } else if (state == 4 || state == 5 || (!isNeuronsConnected(nodesArray) && drewOutputLine == true)) {
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
  progress = border / maxR;

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
    progress += (width-border*2-xsize/2)/(processingFrames*2*layerNum) / maxR;
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
      progress = border / maxR;
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

  submitButton = createButton('Submit');
  submitButton.position(width/2-155*maxR,height/2+115*maxR);
  submitButton.size(150*maxR,40*maxR);
  submitButton.style('opacity','0');
  submitButton.mouseClicked(submit);
  closeSettingButton = createButton('Close');
  closeSettingButton.position(width/2+5*maxR,height/2+115*maxR);
  closeSettingButton.size(150*maxR,40*maxR);
  closeSettingButton.style('opacity','0');
  closeSettingButton.mouseClicked(closeSetting);
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
  checkCanvas.fill(0,0,0,75);
  checkCanvas.rect(width/2,height/2,width,height);
  checkCanvas.stroke(patternColor);
  checkCanvas.fill(paperColor);
  checkCanvas.rect(width/2,height/2,600*maxR,200*maxR,25*maxR);
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
  
  drawSpeed = acceleration.indexOf(traits.visual.hardwareAcceleration);
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
  shape = framework.indexOf(traits.visual.nodeShape);
  fillMode = dataSet.indexOf(traits.visual.nodeFill);
  pattern = paper.indexOf(traits.visual.pattern);

  satFee = Math.tanh(Math.log10(stats.avgfeerate));
  satFee = map(satFee, 0, 1, 0.2, 0.8);
  
  inputNodes = 3;
  classNum = classes_name.length;
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
  
  const totalFrames = (layerNum + 1) * processingFrames;
  
  const sparkRateExact = map(satFee,0.2,0.8,15,2);
  sparkRate = getClosestDivisibleFraction(totalFrames, 2, sparkRateExact);

  totalAnimSteps = round(totalFrames/sparkRate);

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
  lineStroke = map(strokeRatio,1/30,1,0.75,4) * maxR;
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
    xLeft: border/8,
    xRight: width - border/8,
    yTop: border/8,
    yBottom: height - border/8,
  }

  const scaledTotalNeurons = scaleNodesArray.map(x => x.length);
  particleSystem = new ParticleSystem(gradientFill, scaledTotalNeurons, wall, shape, maxR);
}

function updateMaxR(width, height) {
  maxR = min(width,height)/1024;
  
  border = 100*maxR;
  spacing = 50*maxR;
  
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
  lineStroke = map(strokeRatio,1/30,1,0.75,4) * maxR;

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
    shapeDashBySize = map(strokeRatio, 1/30, 1, 3, 10);
    shapeDashByOpacity = map(scaleNodesArray[amount][r],0,1,shapeDashBySize*2,0) * maxR;
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
  infoCanvas.rect(width/2-175*maxR,height-170*maxR,250*maxR,30*maxR)
  infoCanvas.noStroke();
  infoCanvas.fill(paperColor);

  const labelLeft = width/2-285*maxR, labelRight = width/2+10*maxR;
  infoCanvas.textSize(15*maxR);
  infoCanvas.textStyle(BOLD);
  infoCanvas.text('TECHNICAL INFORMATION',labelLeft,height-165*maxR);
  infoCanvas.fill(startColor);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('NAME:',labelLeft,height-135*maxR);
  infoCanvas.text('SCALE:',labelLeft,height-120*maxR);
  infoCanvas.text('NUMBER OF CLASSES:',labelLeft,height-105*maxR);
  infoCanvas.text('NUMBER OF HIDDEN LAYERS:',labelLeft,height-90*maxR);
  infoCanvas.text('MAX NEURONS PER HIDDEN LAYER:',labelLeft,height-75*maxR);
  infoCanvas.text('NUMBER OF TRAINING EPOCHS:',labelLeft,height-60*maxR);
  infoCanvas.text('COLOR PALETTE:',labelLeft,height-45*maxR);
  infoCanvas.text('PAPER PATTERN:',labelLeft,height-30*maxR);
  infoCanvas.text('NETWORK ARCHITECTURE:',labelRight,height-135*maxR);
  infoCanvas.text('ACTIVATION FUNCTION:',labelRight,height-120*maxR);
  infoCanvas.text('DATA SET:',labelRight,height-105*maxR);
  infoCanvas.text('DEEP LEARNING FRAMEWORK: ',labelRight,height-90*maxR);
  infoCanvas.text('HARDWARE ACCELERATION:',labelRight,height-75*maxR);
  infoCanvas.text('BIRTH YEAR:',labelRight,height-60*maxR);
  infoCanvas.text('LIFE CYCLE:',labelRight,height-45*maxR);
  infoCanvas.text('STATE:',labelRight,height-30*maxR);

  const valueLeft = width/2-10*maxR, valueRight = width/2+285*maxR;
  infoCanvas.textStyle(ITALIC);
  infoCanvas.textAlign(RIGHT);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('Perceptron #'+seed,valueLeft,height-135*maxR);
  infoCanvas.text('1:'+scaleRatio,valueLeft,height-120*maxR);
  infoCanvas.text(classNum,valueLeft,height-105*maxR);
  infoCanvas.text(layerNum-2,valueLeft,height-90*maxR);
  infoCanvas.text(realHiddenLayerMaxNodes,valueLeft,height-75*maxR);
  infoCanvas.text(epochs,valueLeft,height-60*maxR);
  infoCanvas.text(paletteName[paletteType],valueLeft,height-45*maxR);
  infoCanvas.text(paper[pattern],valueLeft,height-30*maxR);
  infoCanvas.text(architecture,valueRight,height-135*maxR);
  infoCanvas.text(activationFunction,valueRight,height-120*maxR);
  infoCanvas.text(dataSet[fillMode],valueRight,height-105*maxR);
  infoCanvas.text(framework[shape],valueRight,height-90*maxR);
  infoCanvas.text(acceleration[drawSpeed],valueRight,height-75*maxR);
  infoCanvas.text(birthYear,valueRight,height-60*maxR);
  infoCanvas.text(lifeCycle,valueRight,height-45*maxR);
  infoCanvas.text(liveState[state],valueRight,height-30*maxR);
}

function drawSetting() {
  settingCanvas.textFont('Trebuchet MS');
  settingCanvas.noStroke();
  settingCanvas.fill(0,0,0,75);
  settingCanvas.rect(width/2,height/2,width,height);
  settingCanvas.stroke(patternColor);
  settingCanvas.fill(paperColor);
  settingCanvas.rect(width/2,height/2,600*maxR,200*maxR,25*maxR);
  
  drawButton(settingCanvas, width/2-155*maxR, width/2-5*maxR, height/2+115*maxR, height/2+155*maxR, 'UPDATE');
  drawButton(settingCanvas, width/2+5*maxR, width/2+155*maxR, height/2+115*maxR, height/2+155*maxR, 'CLOSE');
  
  settingCanvas.textAlign(LEFT);
  settingCanvas.fill(startColor);
  settingCanvas.text('UPDATE BITCOIN FULL NODE ADDRESS',width/2-252.5*maxR,height/2-50*maxR);
  settingCanvas.text('UPDATE MODEL ADDRESS',width/2-252.5*maxR,height/2+25*maxR);
  settingCanvas.textAlign(RIGHT);
  settingCanvas.textStyle(ITALIC);
  settingCanvas.textSize(15*maxR);
  if (blockApiResult == false) {settingCanvas.text('(*) Invalid Address',width/2+252.5*maxR,height/2-50*maxR)}
  if (modelInscriptionResult == false) {settingCanvas.text('(*) Invalid Model',width/2+252.5*maxR,height/2+25*maxR)}
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
  let offset = new Date().getTimezoneOffset() * 60 * 1000;
  let localTimeStr = new Date(Date.now() - offset).toISOString().slice(0, -1);
  let filename = localTimeStr;
  save(filename);
}

save4KCanvasAtCurrentTime = () => {
  const w = width, h = height;
  const newW = 4096, newH = h * 4096/w;

  resizeCanvas(newW, newH, true);
  lineCanvas.resizeCanvas(newW, newH, true);
  nodeCanvas.resizeCanvas(newW, newH, true);
  patternCanvas.resizeCanvas(newW, newH, true);
  popupCanvas.resizeCanvas(newW, newH, true);
  infoCanvas.resizeCanvas(newW, newH, true);
  deadCanvas.resizeCanvas(newW, newH, true);
  loadingCanvas.resizeCanvas(newW, newH, true);
  warningCanvas.resizeCanvas(newW, newH, true);
  settingCanvas.resizeCanvas(newW, newH, true);
  checkCanvas.resizeCanvas(newW, newH, true);
  mainCanvas.resizeCanvas(newW, newH, true);

  screenshotMode = true;
  updateMaxR(newW, newH);  
  drawOnMainCanvas();

  let offset = new Date().getTimezoneOffset() * 60 * 1000;
  let localTimeStr = new Date(Date.now() - offset).toISOString().slice(0, -1);
  let filename = '4K_' + localTimeStr + '.png';
  saveCanvas(mainCanvas, filename);

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

  updateMaxR(w, h);  
  screenshotMode = false;
}

function isMouseInside(x1, x2, y1, y2) {
  return mouseX>x1 && mouseX<x2 && mouseY>y1 && mouseY<y2;
}

function drawButton(canvas, x1, x2, y1, y2, text, xt, yt) {
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
  canvas.text(text,(x1+x2)/2,(y1+y2)/2);
}

function resizeAllCanvas(w, h) {

}