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
  ['White Paper', 1],
  ['Blackboard', 1],
  ['Blueprint', 1],
  ['Thermal Dynamics', 5],
  ['Nuclear Fusion', 5],
  ['Radioactive', 5],
  ['Superfluid', 5],
  ['Energy Burst', 5],
  ['Void', 5],
  ['Gamma Ray', 5],
  ['Tannin', 6],
  ['Strange Quark', 6],
  ['Cyborg', 6],
  ['Redshift', 6],
  ['Chlorophyll', 6],
  ['Time Paradox', 6],
  ['Olivine', 6],
  ['Twilight', 4],
  ['Sunset', 4],
  ['Aurora', 4],
  ['Liminal Space', 3],
  ['Déjà Vu', 3],
  ['Lucid Dream', 3],
  ['Parallel', 2],
  ['Multiverse', 2],
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
  
  // nodeShape = 'Theano';
  // nodeFill = 'MNIST';
  // colorPalette = 'Redshift';
  hardwareAcceleration = 'Advanced'
  
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