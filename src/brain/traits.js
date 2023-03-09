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

const Pattern = [
  ['Plain', 1],
  ['Dotted', 1],
  ['Squared', 1],
];

const HardwareAcceleration = [
  ['Basic', 1],
  ['Standard', 1],
  ['Advanced', 1],
];

const NodeFill = [
  ['MNIST', 1], 
  ['CIFAR', 1],  
  ['IMAGENET', 1],  
];

const NodeShape = [
  ['Theano', 1],
  ['Torch', 1],
  ['TensorFlow', 1],
  ['Caffe', 1],  
];

const ColorPalette = [ 
  ['Monochrome', 1],
  ['Blackboard', 1],
  ['Blueprint', 1],
  ['Industrial Steel', 1],
  ['Spectrum', 1],
  ['Mariana Trench', 1],
  ['Twilight', 1],
  ['Gaia', 1],
  ['Autumn Harvest', 1],
  ['Bubblegum', 1],
  ['Sleek Neutrals', 1],
  ['Barbie World', 1],
  ['Warning Zone', 1],
  ['Chilli Sauce', 1],
  ['American Dream', 1],
  ['Broken Beach', 1],
  ['Nightlife', 1],
  ['Nautical Adventure', 1],
  ['Cotton Candy', 1],
  ['Golden Hour', 1],
  ['Matcha Latte', 1],
  ['Cinnamon', 1],
  ['Midnight Blossoms', 1],
  ['Lemonade', 1],
  ['Strawberry Milk', 1],
  ['Campfire', 1],
  ['Black Pink', 1],
  ['Chlorophyll', 1],
];

function getTraits(trainingTraits) {
  // Visual traits
  const pattern = getRandomItem(Pattern);
  // const hardwareAcceleration = getRandomItem(HardwareAcceleration);
  const nodeFill = getRandomItem(NodeFill);
  const nodeShape = getRandomItem(NodeShape);
  const colorPalette = getRandomItem(ColorPalette);
  // const growthPeriod = getRandomItem(GrowthPeriod);
  // const birthYear = getRandomItem(BirthYear);
  const hardwareAcceleration = 'Standard';
  const growthPeriod = 'Year';
  const birthYear = '1964';

  const traits = {
    visual: {
      pattern,
      hardwareAcceleration,
      nodeFill,
      nodeShape,
      colorPalette,
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
    "Dataset (fill mode)": traits.visual.nodeFill,
    "Deep learning framework (shape)": traits.visual.nodeShape,
    "Hardware acceleration (animation speed)": traits.visual.hardwareAcceleration,
    "Paper pattern": traits.visual.pattern,
    "Growth speed": traits.visual.growthPeriod,
    "Birth year": traits.visual.birthYear,
    "Color palette": traits.visual.colorPalette,
  }
}