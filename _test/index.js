const fileInput = document.getElementById("file-input");

new Q5("global"); //initialize q5
// alternatively use `const q=new Q5()` to contain all q5 functions inside a namespace.

// the rest just looks like a regular p5.js sketch:

let brain;
let input_image;
let output_prediction;

function setup() {
  setupRandom();
  
  const traits = getTraits();
  brain = new Brain(traits);

  console.log(brain.getBrainStatus());

  // for(let year = 2000; year <= 2100; ++year) {
  //   const date = new Date(year, 0, 1);
  //   brain.updateAge(date);
  // }

  // Remove loading class from body
  document.body.classList.remove("loading");

  // When user uploads a new image, display the new image on the webpage
  fileInput.addEventListener("change", () => getImage(brain));  

  createCanvas(400, 400);
}

setupRandom = () => {
  let blockhash = Date.now();

  randomSeed(blockhash);
  noiseSeed(blockhash);
}

function draw() {
  background(220);

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
  const classes = ['cryptoadz', 'cryptopunks', 'moonbirds', 'nouns'];
  const predictions = zip([result, classes]);

  const sorted_predictions = predictions.sort((a, b) => a[0] > b[0]);
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

      const graphic = createGraphics(28, 28);
      graphic.image(img, 0, 0, 28, 28);
      graphic.loadPixels();

      const data = graphic.pixels.filter((_, i) => i%4 != 3);
      const result = brain.classifyImage(data);
      output_prediction = formatResult(result);
    });
  };

  // Get data url
  reader.readAsDataURL(file);
}