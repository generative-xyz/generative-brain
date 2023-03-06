const fileInput = document.getElementById("file-input");

new Q5("global"); //initialize q5
// alternatively use `const q=new Q5()` to contain all q5 functions inside a namespace.

// the rest just looks like a regular p5.js sketch:

let brain;
let isModelLoaded;
let input_image;
let output_prediction;
let classes_name;
let inputDim;

function setup() {
  setupRandom();
  setupModel();

  createCanvas(400, 400);
}

async function setupModel() {
  traits = getTraits(___default_inscription.training_traits);
  reportTraits(traits);

  const blockEndpoint = getBlocksApiEndpoint();
  const inscriptionEndpoint = getModelInscriptionEndpoint();

  const [stats, inscription] = await Promise.all([
    getLatestBlockStats(blockEndpoint),
    getModelInscription(inscriptionEndpoint),
  ]);

  const date = new Date(stats.time * 1000);

  brain = new Brain(traits.visual, inscription.layers_config, inscription.weight_b64);
  brain.updateAge(date);

  const brainStatus = brain.getBrainStatus();

  inputDim = brainStatus.inputDim;
  classes_name = inscription.classes_name;

  // When user uploads a new image, display the new image on the webpage
  fileInput.addEventListener("change", () => getImage(brain));  

  isModelLoaded = true; 
}

setupRandom = () => {
  let blockhash = Date.now();

  randomSeed(blockhash);
  noiseSeed(blockhash);
}

function draw() {
  background(220);

  if (!isModelLoaded) {
    push();
    textAlign(CENTER);
    textSize(16);
    text("Loading model...", 200, 200);
    pop();
    return;
  }

  if (input_image) {
    image(input_image, 0, 0, 200, 200);    
  }

  if (output_prediction) {
    push();

    fill(0);
    noStroke();
    textSize(16);
    textStyle(NORMAL);
    text(output_prediction, 0, 220);

    pop();
  }
};

function formatResult(result) {
  const predictions = zip([result, classes_name]);

  const sorted_predictions = predictions.sort((a, b) => a[0] > b[0] ? -1 : 1);
  console.log(predictions);
  console.log(sorted_predictions);
  return sorted_predictions.map(e => `${e[1]}: ${(e[0] * 100).toFixed(2)}%`).join('\n');
}

/**
 * Get the image from file input and display on page
 */
function getImage(brain) {
  // Check if an image has been found in the input
  if (!fileInput.files[0]) throw new Error("Image not found");
  const file = fileInput.files[0];

  // Get the data url form the image
  const reader = new FileReader();

  // When reader is ready display image.
  reader.onload = function (event) {
    // Get the data url
    const dataUrl = event.target.result;

    loadImage(dataUrl, img => {
      input_image = img;
      
      const [w_img, h_img, c_img] = inputDim;
      const graphic = createGraphics(w_img, h_img);
      graphic.image(img, 0, 0, w_img, h_img);
      graphic.loadPixels();

      const data = graphic.pixels.filter((_, i) => i%4 != 3);
      const result = brain.classifyImage(data);
      output_prediction = formatResult(result);      
    });
  };

  // Get data url
  reader.readAsDataURL(file);
}