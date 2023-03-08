const GrowthPeriod = [
  ['Year', 1, 365.0 / 365.0],
  ['Month', 1, 365.0 / 30],
  ['Week', 1, 365.0 / 7],
  ['Daily', 1, 365.0 / 1],
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

const LineStroke = [
  ['0.25pt', 1, 0.25],
  ['0.5pt', 1, 0.5],
  ['0.75pt', 1, 0.75],
];

const NodeStroke = [
  ['0.25pt', 1, 0.25],
  ['0.5pt', 1, 0.5],
  ['0.75pt', 1, 0.75],
];

const Pattern = [
  ['Plain', 1],
  ['Ruled', 1],
  ['Dotted', 1],
  ['Squared', 1],
];

const HardwareAcceleration = [
  ['Basic', 1],
  ['Standard', 1],
  ['Advanced', 1],
];

const NodeType = [
  ['MNIST', 1], 
  ['CIFAR', 1],  
  ['IMAGENET', 1],  
  ['IRIS', 1], 
];

const BackgroundColor = [
  ['Theano', 1],
  ['Torch', 1],
  ['TensorFlow', 1],
  ['Caffe', 1],  
];

function getTraits(trainingTraits) {
  // Visual traits
  const lineStroke = getRandomItem(LineStroke);
  const nodeStroke = getRandomItem(NodeStroke);
  const pattern = getRandomItem(Pattern);
  // const hardwareAcceleration = getRandomItem(HardwareAcceleration);
  const nodeType = getRandomItem(NodeType);
  const backgroundColor = getRandomItem(BackgroundColor);
  // const growthPeriod = getRandomItem(GrowthPeriod);
  // const birthYear = getRandomItem(BirthYear);
  const hardwareAcceleration = 'Standard';
  const growthPeriod = 'Year';
  const birthYear = '2000';

  const traits = {
    visual: {
      lineStroke,
      nodeStroke,
      pattern,
      hardwareAcceleration,
      nodeType,
      backgroundColor,
      growthPeriod,
      birthYear,  
    },
    training: trainingTraits,
  };

  console.log(traits);

  return traits;
}

function reportTraits(traits) {
  window.$generativeTraits = {
    "Network architecture": traits.training.structure_gen,
    "Hidden layers": traits.training.n_layers,
    "Max neurons per layer": traits.training.max_nodes,
    "Activation function": traits.training.activation_func,
    "Training epochs": traits.training.epoch_num,
    "Line stroke": traits.visual.lineStroke,
    "Node stroke": traits.visual.nodeStroke,
    "Paper": traits.visual.pattern,
    "Hardware acceleration (animation speed)": traits.visual.hardwareAcceleration,
    "Dataset (neuron color)": traits.visual.nodeType,
    "ML framework (background)": traits.visual.backgroundColor,
    "Growth speed": traits.visual.growthPeriod,
    "Birth year": traits.visual.birthYear,
  }
}