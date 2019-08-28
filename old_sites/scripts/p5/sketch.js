var myCanvas;
let font,
  fontsize = 40;
let colorAngle = 0.0;
let speed = 0.001;
let fontSpeed = 1;
let rot = 0;
function preload(){
  font = loadFont("/fonts/Hanalei_Fill/HanaleiFill-Regular.ttf");
}

function setup() {
  myCanvas = createCanvas(800,400);//draw a canvas 800 pixels wide and 400 pixels high
  myCanvas.parent("canvas1");//attach that canvas to the container with the id canvas1
  
  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {
    background(160);

  // Align the text to the right
  // and run drawWords() in the left third of the canvas

  // Align the text in the center
  // and run drawWords() in the middle of the canvas
  textAlign(CENTER);
  var sincolor = sin(colorAngle);
  drawWords(width * 0.5,sincolor);
  colorAngle +=speed;
  fontsize += fontSpeed;
  if(fontsize == 255){
    fontSpeed = -1;
  }
  if(fontsize == 40){
    fontSpeed = 1;
  }
  textSize(fontsize);
  translate(100,100);

  // Align the text to the left
  // and run drawWords() in the right third of the canvas
}

function drawWords(x,b) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position
  from = color(255, 0, 0);
  to = color(0,0,255);
  c1 = lerpColor(from, to, abs(b));
  fill(c1);
  text('Jason', x, 150);
}