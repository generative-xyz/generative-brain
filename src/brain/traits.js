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
  ['Theano', 60], // ellipse
  ['Torch', 30], // square
  ['TensorFlow', 10], // diamond
];

const ColorPalette = [ 
  ['Whitepaper', 2],
  ['Blackboard', 2],
  ['Blueprint', 2],
  ['Nak', 74/14],
  ['Jims', 74/14],
  ['Level 10', 74/14],
  ['Flips', 74/14],
  ['Level 14', 74/14],
  ['III', 74/14],
  ['XMB', 74/14],
  ['Info', 74/14],
  ['Adventure', 74/14],
  ['Marigold', 74/14],
  ['Phoenix', 74/14],
  ['Love', 74/14],
  ['Cachet', 74/14],
  ['Human', 74/14],
  ['Twilight', 3],
  ['Sunset', 3],
  ['Aurora', 3],
  ['Liminal Space', 3],
  ['Déjà Vu', 3],
  ['Lucid Dream', 3],
  ['Parallel', 1],
  ['Multiverse', 1],
];

function getTraits(trainingTraits) {
  // Visual traits
  let pattern = getRandomItem(Pattern);
  let hardwareAcceleration = getRandomItem(HardwareAcceleration);
  let nodeFill = getRandomItem(NodeFill);
  let nodeShape = getRandomItem(NodeShape);
  let colorPalette = getRandomItem(ColorPalette);
  let lifeCycle = getRandomItem(LifeCycle);
  let birthYear = getRandomItem(BirthYear);
  
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

  return traits;
}

function reportTraits(traits) {
  window.$generativeTraits = {
    "Network Architecture": traits.training.structure_gen,
    "Hidden Layers": traits.training.n_layers,
    "Max Neurons Per Hidden Layer": traits.training.max_nodes,
    "Activation Function": traits.training.activation_func,
    "Training Epochs": traits.training.epoch_num,
    "Dataset": traits.visual.nodeFill,
    "Deep Learning Framework": traits.visual.nodeShape,
    "Hardware Acceleration": traits.visual.hardwareAcceleration,
    "Paper Pattern": traits.visual.pattern,
    "Life Cycle": traits.visual.lifeCycle,
    "Birth Year": traits.visual.birthYear,
    "Color Palette": traits.visual.colorPalette,
  }
}
