const LifeCycle = [
  ['Year', 3, 365],
  ['Month', 40, 30],
  ['Week', 37, 7],
  ['Day', 20, 1],
];

const BirthYear = [
  ['1943', 1],
  ['1951', 1],
  ['1957', 1],
  ['1969', 1],
  ['1970', 1],
  ['1980', 1],
  ['1982', 1],
  ['1986', 1],
  ['1988', 1],
  ['1997', 1],
  ['1998', 1],
  ['2002', 1],
  ['2009', 1],
  ['2012', 1],
  ['2014', 1],
  ['2015', 1],
  ['2016', 1],
  ['2023', 1],
];

const Pattern = [
  ['Plain', 20],
  ['Dotted', 40],
  ['Squared', 40],
];

const HardwareAcceleration = [
  ['Basic', 30],
  ['Standard', 60],
  ['Advanced', 10],
];

const NodeFill = [
  ['MNIST', 70], // solid
  ['CIFAR', 25],  // outline
  ['IMAGENET', 5],  // x-ray
];

const NodeShape = [
  ['Theano', 50], // ellipse
  ['Torch', 15], // square
  ['TensorFlow', 30], // diamond
  ['Caffe', 5],  // star
];

const ColorPalette = [ 
  ['Monochrome', 1],
  ['Blackboard', 1],
  ['Blueprint', 1],
  ['Industrial Steel', 5],
  ['Spectrum', 5],
  ['Mariana Trench', 5],
  ['Twilight', 5],
  ['Gaia', 5],
  ['Autumn Harvest', 5],
  ['Bubblegum', 1],
  ['Sleek Neutrals', 5],
  ['Barbie World', 5],
  ['Warning Zone', 5],
  ['Chilli Sauce', 1],
  ['American Dream', 5],
  ['Broken Beach', 5],
  ['Nightlife', 5],
  ['Nautical Adventure', 5],
  ['Cotton Candy', 1],
  ['Golden Hour', 5],
  ['Matcha Latte', 1],
  ['Hot Cocoa', 1],
  ['Midnight Blossoms', 5],
  ['Lemonade', 1],
  ['Strawberry Milk', 1],
  ['Campfire', 5],
  ['Black Pink', 5],
  ['Chlorophyll', 5],
];

function getTraits(trainingTraits) {
  // Visual traits
  const pattern = getRandomItem(Pattern);
  // const hardwareAcceleration = getRandomItem(HardwareAcceleration);
  const nodeFill = getRandomItem(NodeFill);
  const nodeShape = getRandomItem(NodeShape);
  const colorPalette = getRandomItem(ColorPalette);
  // const lifeCycle = getRandomItem(LifeCycle);
  // const birthYear = getRandomItem(BirthYear);
  
  // const hardwareAcceleration = 'Basic';
  // const pattern = 'Plain';
  const hardwareAcceleration = 'Advanced';
  // const nodeFill = 'MNIST';
  // const nodeShape = 'Theano';
  // const colorPalette = 'Monochrome';
  const lifeCycle = 'Year';
  const birthYear = '1964';
  
  // 1964: Dead
  // 2000: Stable
  // 2023: Growing (disconnected)

  const traits = {
    visual: {
      pattern,
      hardwareAcceleration,
      nodeFill,
      nodeShape,
      colorPalette,
      lifeCycle,
      birthYear,  
    },
    training: trainingTraits,
  };

  console.log(traits);

  return traits;
}

function reportTraits(traits) {
  window.$generativeTraits = {
    "Network Architecture": traits.training.structure_gen,
    "Hidden Layers": traits.training.n_layers,
    "Max Neurons Per Layer": traits.training.max_nodes,
    "Activation Function": traits.training.activation_func,
    "Training Epochs": traits.training.epoch_num,
    "Dataset (Fill Mode)": traits.visual.nodeFill,
    "Deep Learning Framework (Shape)": traits.visual.nodeShape,
    "Hardware Acceleration (animation speed)": traits.visual.hardwareAcceleration,
    "Paper Pattern": traits.visual.pattern,
    "Life Cycle": traits.visual.lifeCycle,
    "Birth Year": traits.visual.birthYear,
    "Color Palette": traits.visual.colorPalette,
    // add number of classes trait
    // check again architecture name and other traits name
    // dead interaction: border on/off, malfunction
    // should not add artist name (reason: too long or too many, when collaboration)
  }
}