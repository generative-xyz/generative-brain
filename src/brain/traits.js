const trainingTraitsRaw = '{"structure_gen": "Reflection", "n_layers": 7, "max_nodes": 16, "activation_func": "LeakyReLU", "epoch_num": 5}';

const GrowthPeriod = [
  ['Year', 1, 365.0 / 365.0],
  ['Month', 1, 365.0 / 30],
  ['Week', 1, 365.0 / 7],
  ['Daily', 1, 365.0 / 365.0],
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
  ['0.75pt', 1, 0.75],
  ['1.25pt', 1, 1.25],
  ['2pt', 1, 2],
];

const NodeStroke = [
  ['0.75pt', 1, 0.75],
  ['2pt', 1, 2],
  ['4pt', 1, 4],
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

function getTraits() {
  // Display traits
  const lineStroke = getRandomItem(LineStroke);
  const nodeStroke = getRandomItem(NodeStroke);
  const pattern = getRandomItem(Pattern);
  const hardwareAcceleration = getRandomItem(HardwareAcceleration);
  const nodeType = getRandomItem(NodeType);
  const backgroundColor = getRandomItem(BackgroundColor);

  // Training traits
  const trainingTraits = JSON.parse(trainingTraitsRaw);

  // Life traits
  const growthPeriod = getRandomItem(GrowthPeriod);
  const birthYear = getRandomItem(BirthYear);

  const traits = {
    lineStroke,
    nodeStroke,
    pattern,
    hardwareAcceleration,
    nodeType,
    backgroundColor,
    growthPeriod,
    birthYear,
    ...trainingTraits,
  };

  console.log(traits);

  return traits;  
}