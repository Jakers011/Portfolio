/*$(document).ready(function(){
  const welc = document.querySelector('.centeredWelcome');
  welc.classList.add('animated', 'fadeIn', 'tada');
  $('.welcome').click(function(){
    console.log("Clicked welcome.");
    welc.classList.remove('fadeIn');
    welc.classList.add('bounceOutLeft');
    welc.addEventListener('animationend', function(){
      welc.remove();
      $('.navbar').css({"display": ""});
      $('.navbar').fadeIn();
      $('.container-fluid').css({"display": ""});
      $('.container-fluid').fadeIn();
    })
  })
});*/

// Variables
/*
let fontsize = 80;

// P5 Canvas Splashscreen
function preload(){
  font = loadFont("/fonts/anurati_font/Anurati-Regular.otf");
}
function setup(){
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("splashscreen");
  myCanvas.style('display', 'block');

  background("#0B0C10");
  
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(fontsize);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  noStroke();
  fill('#66FCF1');
  text('JASON AKERS',windowWidth*0.5,windowHeight*0.4);
  filter(BLUR, 6);
  stroke(0);
  fill('#45A29E');
  text('JASON AKERS',windowWidth*0.5, windowHeight*0.4);
} 
*/

function mouseClicked(){
$(document).ready(function(){
  const welc = document.querySelector('.centeredWelcome');
  welc.classList.add('animated', 'fadeIn', 'tada');
  $('.welcome').click(function(){
    console.log("Clicked welcome.");
    welc.classList.remove('fadeIn');
    welc.classList.add('bounceOutLeft');
    welc.addEventListener('animationend', function(){
      welc.remove();
      $('.navbar').css({"display": ""});
      $('.navbar').fadeIn();
      $('.container-fluid').css({"display": ""});
      $('.container-fluid').fadeIn();
    })
  })
});
}

