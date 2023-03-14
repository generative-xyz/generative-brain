const LifeCycle = [
  ['60 Years', 3, 365],
  ['60 Months', 40, 30],
  ['60 Weeks', 37, 7],
  ['60 Days', 20, 1],
];

const BirthYear = [
  ['1943', 1],
  ['1951', 1.5],
  ['1957', 2],
  ['1969', 2.5],
  ['1970', 3],
  ['1980', 3.5],
  ['1982', 4],
  ['1986', 4.5],
  ['1988', 5],
  ['1997', 5.5],
  ['1998', 6],
  ['2002', 6.5],
  ['2009', 7],
  ['2012', 7.5],
  ['2014', 8],
  ['2015', 8.5],
  ['2016', 9],
  ['2023', 15],
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
  const hardwareAcceleration = 'Advanced';
  const lifeCycle = '60 Years';
  const birthYear = '1964';
  // const nodeFill = 'MNIST';
  // const nodeShape = 'Theano';
  // const colorPalette = 'Monochrome';
  
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
  }
}