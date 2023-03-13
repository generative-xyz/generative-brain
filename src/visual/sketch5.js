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
let drewSetting = false;
let isProcessPhase;
let processingLayer;
let progress;
let animationLoopCount;
let processingSpeed;
let satFee,activeAmount,sparkRate;
let percentage,finishedNumber,finishedText,defaultSize,startTime;

let xsize,ysize,nodeSize;
let layerNum,maxNodes,compareArray,realMaxNodes,realCompareArray;
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

let seed,architecture,birthYear,growPeriod,epochs,framework,dataSet,paper,liveState,activationFunction,acceleration;
let paletteName = [' ','Monochrome','Blackboard','Blueprint','Industrial Steel','Spectrum','Mariana Trench','Twilight','Gaia','Autumn Harvest','Bubblegum','Sleek Neutrals','Barbie World','Warning Zone','Chilli Sauce','American Dream','Broken Beach','Nightlife','Nautical Adventure','Cotton Candy','Golden Hour','Matcha Latte','Hot Chocolate','Midnight Blossoms','Lemonade','Strawberry Milk','Campfire','Black Pink','Chlorophyll'];

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

let isCheckingEndpointsFinished;
let drewCheckingWindows;
let blockApiResult;
let modelInscriptionResult;

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
  liveState = [' ','Growing','Stable','Decaying','Dead'];
  acceleration = [' ','Basic','Standard','Advanced'];
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

  classes_name = inscription.classes_name.map(e => e.toUpperCase());
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

    if (isNeuronsConnected(nodesArray) && drewOutputLine == true) {
      fileInput.click();
      initialize();
    } else if (state == 4 || (!isNeuronsConnected(nodesArray) && drewOutputLine == true)) {
      drewWarningScreen = true;
      warning();
    } else {return}
  })
  
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

function customDoubleClicked() {
  if (img == null) return;
  frameCount = 0;
  isProcessPhase = true;
  processingLayer = 0;
  animationLoopCount = 0;
  drewLineAnim = true;
  progress = border;

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
  if ((key === 'i' || key === 'I') && drewInfoWindow == false && drewSetting == false) {
    drewInfoWindow = true;
  } else if ((key === 'i' || key === 'I') && drewInfoWindow == true) {
    drewInfoWindow = false;
  }
  if ((key === 'u' || key === 'U') && drewSetting == false && drewResultWindow == false && drewWarningScreen == false) {
    settingPopup();
  }
  if ((key == 'b' || key == 'B') && drewBorder == true && drewSetting == false) {
    drewBorder = false;
  } else if ((key == 'b' || key == 'B') && drewBorder == false && drewSetting == false) {drewBorder = true}
}

function settingPopup() {
  drewSetting = true;
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
  address = createInput();
  address.position(width/2-252.2*maxR,height/2+35*maxR);
  address.size(500*maxR,25*maxR);
  address.style('font-size','15px');
}

function submit() {
  drewSetting = false;
  submitButton.hide();
  closeSettingButton.hide();
  bitcoinNode = bitcoin.value();
  bitcoin.hide();
  modelAddress = address.value();
  address.hide();

  isCheckingEndpointsFinished = false;
  startEndpointsCheck();
}

async function startEndpointsCheck() {
  [blockApiResult, modelInscriptionResult] = await Promise.all([
    isValidBlocksApiEndpoint(bitcoinNode),
    isValidModelInscriptionEndpoint(modelAddress),
  ]);

  isCheckingEndpointsFinished = true;

  if (blockApiResult && modelInscriptionResult) {
    setBlocksApiEndpoint(bitcoinNode);
    setModelInscriptionEndpoint(modelAddress);
    window.location.reload();
  } else {
    drewCheckingWindows = true;
  }
}

function drawCheckingResult() {
  checkCanvas.textFont('Trebuchet MS');
  checkCanvas.fill(paperColor);
  checkCanvas.rect(width/2, height/2, 400, 400);
  checkCanvas.noStroke();
  checkCanvas.fill(startColor);
  checkCanvas.textSize(36);
  checkCanvas.text("INVALID ENDPOINTS", width/2, height/2, 400, 400);
}

function closeSetting() {
  drewSetting = false;
  submitButton.hide();
  closeSettingButton.hide();
  bitcoin.hide();
  address.hide();
}

function warning() {
  closeWarningButton = createButton('Close');
  closeWarningButton.position(width/2-75*maxR,height/2+90*maxR);
  closeWarningButton.size(150*maxR,40*maxR);
  closeWarningButton.style('opacity','0');
  closeWarningButton.mouseClicked(closeWarning);
}

function closeWarning() {
  drewWarningScreen = false;
  closeWarningButton.hide();
}

function setupSketch() {
  setupRandom();
  finishedNumber = false;
  finishedText = false;
    
  architecture = traits.training.structure_gen;
  birthYear = traits.visual.birthYear;
  growPeriod = traits.visual.growthPeriod;
  epochs = traits.training.epoch_num;
  activationFunction = traits.training.activation_func;
  
  drawSpeed = acceleration.indexOf(traits.visual.hardwareAcceleration);
  if (drawSpeed == 1) {
    speedAcce = 40; processingSpeed = 40;
  } else if (drawSpeed == 2) {
    speedAcce = 15; processingSpeed = 20;
  } else {
    speedAcce = 2; processingSpeed = 10;
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

  console.log(shape);

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
    xLeft: border/8,
    xRight: width - border/8,
    yTop: border/8,
    yBottom: height - border/8,
  }

  const scaledTotalNeurons = scaleNodesArray.map(x => x.length);
  console.log(scaledTotalNeurons);
  particleSystem = new ParticleSystem(gradientFill, scaledTotalNeurons, wall, shape);
}

function drawDeadAnimation() {
  eraseCanvas(deadCanvas);
  particleSystem.update();
  particleSystem.draw(deadCanvas, paperColor, fillMode, stageRatio);
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
  settingCanvas.textAlign(CENTER);
  settingCanvas.textStyle(BOLD);
  settingCanvas.stroke(patternColor);
  settingCanvas.strokeWeight(8*maxR);
  settingCanvas.fill(paperColor);

  checkCanvas.background(255);
  checkCanvas.rectMode(CENTER);
  eraseCanvas(checkCanvas);
  checkCanvas.textAlign(CENTER);
  checkCanvas.textStyle(BOLD);
  checkCanvas.stroke(patternColor);
  checkCanvas.strokeWeight(8*maxR);
  checkCanvas.fill(paperColor);

  if (!setupFinished) {
    drawLoadingScreen();
    image(loadingCanvas, 0, 0);
    return;
  }

  if (state == 4) {
    drawDeadAnimation();
    image(deadCanvas, 0, 0);  
  } else {
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
  if (drewWarningScreen) {
    drawDisconnectedWarning();
    image(warningCanvas,0,0);
  }
  if (drewSetting) {
    drawSetting();
    image(settingCanvas,0,0);
  }
  if (drewInfoWindow) {
    drawInfoWindow();
    image(infoCanvas,0,0);
  }
  if (drewCheckingWindows) {
    drawCheckingResult();
    image(checkCanvas,0,0);
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
  
  popupCanvas.strokeWeight(1*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(startColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.rect(width/2-80*maxR,height/2+185*maxR,150*maxR,40*maxR,5*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(startColor);
  } else {
    popupCanvas.fill(paperColor);
  }
  popupCanvas.rect(width/2+80*maxR,height/2+185*maxR,150*maxR,40*maxR,5*maxR);
  
  popupCanvas.noStroke();
  popupCanvas.fill(startColor);
  if (!finishedNumber) {
    popupCanvas.textSize(100*maxR);
    percentage = random(10,100);
    popupCanvas.text(percentage.toFixed(2)+'%',width/2+130*maxR,height/2-35*maxR);
  } else {
    popupCanvas.textSize(100*maxR);
    let prediction_str = (predictions[0][0] * 100).toFixed(2);
    if (prediction_str == "100.00") {
      prediction_str = "100";
    }
    popupCanvas.text(prediction_str + '%',width/2+130*maxR,height/2-35*maxR);
  }
  
  example = predictions.map(e => e[1]);
  popupCanvas.textAlign(CENTER,CENTER);
  defaultSize = popupCanvas.textWidth('"FIDENZA"');
  defaultPhrase = popupCanvas.textWidth('"PERPENDICULAR INHABITATION"');
  if (!finishedText) {
    let name = random(example);
    const numWords = name.split(" ").length;
    if (numWords === 1) {
      let newSize = 75*defaultSize/popupCanvas.textWidth('"'+name+'"');
      if (newSize > 75) {newSize = 75}
      popupCanvas.textSize(newSize*maxR);
      popupCanvas.text('"'+name+'"',width/2+130*maxR,height/2+65*maxR);      
    } else {
      let newSize = 45*defaultPhrase/popupCanvas.textWidth('"'+name+'"');
      if (newSize > 45) {newSize = 45}
      popupCanvas.textLeading(newSize*maxR);
      popupCanvas.textSize(newSize*maxR);
      popupCanvas.text('"'+name+'"',width/2+130*maxR,height/2+65*maxR,360*maxR,110*maxR);
    }
  } else {
    const numWords = example[0].split(" ").length;
    if (numWords === 1) {
      let newSize = 75*defaultSize/popupCanvas.textWidth('"'+example[0]+'"');
      if (newSize > 75) {newSize = 75}
      popupCanvas.textSize(newSize*maxR);
      popupCanvas.text('"'+example[0]+'"',width/2+130*maxR,height/2+65*maxR);   
    } else {
      let newSize = 45*defaultPhrase/popupCanvas.textWidth('"'+example[0]+'"');
      if (newSize > 45) {newSize = 45}
      popupCanvas.textLeading(newSize*maxR);
      popupCanvas.textSize(newSize*maxR);
      popupCanvas.text('"'+example[0]+'"',width/2+130*maxR,height/2+65*maxR,360*maxR,110*maxR);
    }
  }
  if (millis()-startTime > 1000) {
    finishedNumber = true;
  }
  if (millis()-startTime > 1500) {
    finishedText = true;
  }

  popupCanvas.textSize(20*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(startColor);
  }
  popupCanvas.text('TRY AGAIN',width/2-80*maxR,height/2+187*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+165*maxR && mouseY<height/2+205*maxR) {
    popupCanvas.fill(paperColor);
  } else {
    popupCanvas.fill(startColor);
  }
  popupCanvas.text('CLOSE',width/2+80*maxR,height/2+187*maxR);
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
  infoCanvas.textSize(15*maxR);
  infoCanvas.textStyle(BOLD);
  infoCanvas.text('TECHNICAL INFORMATION',width/2-285*maxR,height-165*maxR);
  infoCanvas.fill(startColor);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('NAME:',width/2-285*maxR,height-135*maxR);
  infoCanvas.text('SCALE:',width/2-285*maxR,height-120*maxR);
  infoCanvas.text('NUMBER OF CLASSES:',width/2-285*maxR,height-105*maxR);
  infoCanvas.text('NUMBER OF HIDDEN LAYERS:',width/2-285*maxR,height-90*maxR);
  infoCanvas.text('MAXIMUM NEURONS PER LAYER:',width/2-285*maxR,height-75*maxR);
  infoCanvas.text('NUMBER OF TRAINING EPOCHS:',width/2-285*maxR,height-60*maxR);
  infoCanvas.text('COLOR PALETTE:',width/2-285*maxR,height-45*maxR);
  infoCanvas.text('PAPER PATTERN:',width/2-285*maxR,height-30*maxR);
  infoCanvas.text('NETWORK ARCHITECTURE:',width/2+10*maxR,height-135*maxR);
  infoCanvas.text('ACTIVATION FUNCTION:',width/2+10*maxR,height-120*maxR);
  infoCanvas.text('DATA SET:',width/2+10*maxR,height-105*maxR);
  infoCanvas.text('DEEP LEARNING FRAMEWORK: ',width/2+10*maxR,height-90*maxR);
  infoCanvas.text('HARDWARE ACCELERATION:',width/2+10*maxR,height-75*maxR);
  infoCanvas.text('BIRTH YEAR:',width/2+10*maxR,height-60*maxR);
  infoCanvas.text('GROWTH SPEED:',width/2+10*maxR,height-45*maxR);
  infoCanvas.text('STATE:',width/2+10*maxR,height-30*maxR);
  infoCanvas.textStyle(ITALIC);
  infoCanvas.textAlign(RIGHT);
  infoCanvas.textSize(12*maxR);
  infoCanvas.text('Perceptron #'+seed,width/2-10*maxR,height-135*maxR);
  infoCanvas.text('1:'+scaleRatio,width/2-10*maxR,height-120*maxR);
  infoCanvas.text(classNum,width/2-10*maxR,height-105*maxR);
  infoCanvas.text(layerNum-2,width/2-10*maxR,height-90*maxR);
  infoCanvas.text(realMaxNodes,width/2-10*maxR,height-75*maxR);
  infoCanvas.text(epochs,width/2-10*maxR,height-60*maxR);
  infoCanvas.text(paletteName[paletteType],width/2-10*maxR,height-45*maxR);
  infoCanvas.text(paper[pattern],width/2-10*maxR,height-30*maxR);
  infoCanvas.text(architecture,width/2+285*maxR,height-135*maxR);
  infoCanvas.text(activationFunction,width/2+285*maxR,height-120*maxR);
  infoCanvas.text(dataSet[fillMode],width/2+285*maxR,height-105*maxR);
  infoCanvas.text(framework[shape],width/2+285*maxR,height-90*maxR);
  infoCanvas.text(acceleration[drawSpeed],width/2+285*maxR,height-75*maxR);
  infoCanvas.text(birthYear,width/2+285*maxR,height-60*maxR);
  infoCanvas.text(growPeriod,width/2+285*maxR,height-45*maxR);
  infoCanvas.text(liveState[state],width/2+285*maxR,height-30*maxR);
}

function drawSetting() {
  settingCanvas.textFont('Trebuchet MS');
  settingCanvas.noStroke();
  settingCanvas.fill(0,0,0,75);
  settingCanvas.rect(width/2,height/2,width,height);
  settingCanvas.stroke(patternColor);
  settingCanvas.fill(paperColor);
  settingCanvas.rect(width/2,height/2,600*maxR,200*maxR,25*maxR);
  
  settingCanvas.strokeWeight(1*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+115*maxR && mouseY<height/2+155*maxR) {
    settingCanvas.fill(startColor);
  } else {
    settingCanvas.fill(paperColor);
  }
  settingCanvas.rect(width/2-80*maxR,height/2+135*maxR,150*maxR,40*maxR,5*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+115*maxR && mouseY<height/2+155*maxR) {
    settingCanvas.fill(startColor);
  } else {
    settingCanvas.fill(paperColor);
  }
  settingCanvas.rect(width/2+80*maxR,height/2+135*maxR,150*maxR,40*maxR,5*maxR);
  
  settingCanvas.noStroke();
  settingCanvas.textSize(20*maxR);
  if (mouseX>width/2-155*maxR && mouseX<width/2-5*maxR && mouseY>height/2+115*maxR && mouseY<height/2+155*maxR) {
    settingCanvas.fill(paperColor);
  } else {
    settingCanvas.fill(startColor);
  }
  settingCanvas.text('SUBMIT',width/2-80*maxR,height/2+142*maxR);
  if (mouseX>width/2+5*maxR && mouseX<width/2+155*maxR && mouseY>height/2+115*maxR && mouseY<height/2+155*maxR) {
    settingCanvas.fill(paperColor);
  } else {
    settingCanvas.fill(startColor);
  }
  settingCanvas.text('CLOSE',width/2+80*maxR,height/2+142*maxR);
  settingCanvas.textAlign(LEFT);
  settingCanvas.fill(startColor);
  settingCanvas.text('UPDATE BITCOIN FULL NODE',width/2-252.5*maxR,height/2-50*maxR);
  settingCanvas.text('UPDATE MODEL ADDRESS',width/2-252.5*maxR,height/2+25*maxR);
}

function drawLoadingScreen() {
  loadingCanvas.textFont('Trebuchet MS');
  loadingCanvas.fill(patternColor);
  loadingCanvas.textSize(50*maxR);
  loadingCanvas.stroke(patternColor);
  loadingCanvas.strokeWeight(1*maxR);
  loadingCanvas.text('GENERATING...', width/2, height/2);
}

function drawDisconnectedWarning() {
  warningCanvas.textFont('Trebuchet MS');
  warningCanvas.noStroke();
  warningCanvas.fill(0,0,0,75);
  warningCanvas.rect(width/2,height/2,width,height);
  warningCanvas.stroke(patternColor);
  warningCanvas.fill(paperColor);
  warningCanvas.rect(width/2,height/2,600*maxR,150*maxR,15*maxR);
  warningCanvas.fill(startColor);
  warningCanvas.textSize(40*maxR);
  warningCanvas.noStroke();
  warningCanvas.text('PERCEPTRON MALFUNCTION',width/2,height/2+2.5*maxR);
  
  warningCanvas.strokeWeight(1*maxR);
  if (mouseX>width/2-75*maxR && mouseX<width/2+75*maxR && mouseY>height/2+90*maxR && mouseY<height/2+130*maxR) {
    warningCanvas.fill(startColor);
  } else {
    warningCanvas.fill(paperColor);
  }
  warningCanvas.rect(width/2,height/2+110*maxR,150*maxR,40*maxR,5*maxR);
  warningCanvas.noStroke();
  warningCanvas.textSize(20*maxR);
  if (mouseX>width/2-75*maxR && mouseX<width/2+75*maxR && mouseY>height/2+90*maxR && mouseY<height/2+130*maxR) {
    warningCanvas.fill(paperColor);
  } else {
    warningCanvas.fill(startColor);
  }
  warningCanvas.text('CLOSE',width/2,height/2+112*maxR);
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
  if ((key == 'S' || key == 's') && drewSetting == false) {
    saveCanvasAtCurrentTime();
  }
}

saveCanvasAtCurrentTime = () => {
  let offset = new Date().getTimezoneOffset() * 60 * 1000;
  let localTimeStr = new Date(Date.now() - offset).toISOString().slice(0, -1);
  let filename = localTimeStr + '.png';
  save(filename);
}