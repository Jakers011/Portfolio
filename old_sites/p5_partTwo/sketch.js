//P5_PartTwo
//working in the p5 Instance mode

//p5 is just JavaScript, so we can organize differently to have several different canvases in the same page, and play nicely with other js and jquery.  This is called working in "instance mode", or namespacing.  You assign the sketch function to a variable in javascript, then call that variable in a new p5 "instance" https://github.com/processing/p5.js/wiki/Global-and-instance-mode
//See Dan Shiffman's tutorial on namespacing: https://www.youtube.com/watch?v=Su792jEauZg

//storing the sketch as a function in a variable creates it in the js namespace
//this function will be called after it is defined as a new instance of p5, attached to a div with a specific ID on the html page "p5_partTwo.html" that calls this sketch.js
var mySketch = function(sketch) {
    
    //setting these to variables that will be global within the sketch
    var x = 300;
    var y = 200;
    var width = 100;
    var height = 100;
    
    sketch.setup = function() {
        sketch.createCanvas(600,400);
        sketch.background(250);
        //changing the rectMode so the rectangle orients from the center
        sketch.rectMode(sketch.CENTER);
    };
    sketch.draw = function() {
        sketch.fill(255);
        sketch.stroke('#000');
        sketch.rect(x,y,width,height);
        //as the draw loop loops, width and height will increase
        width++;
        height++;
        if (width>600) {
            //so if width becomes greater than the canvas, reset these
            width = 100;
            height = 100;
        }
    };
        /*//controlling the loop by stopping and starting it
        //note the difference in notation from the example at https://p5js.org/reference/#/p5/noLoop when working in instance mode
        
            sketch.mousePressed = function() {
                sketch.noLoop();
            }
            sketch.mouseReleased = function() {
                sketch.loop();
            }
        */
    };
//the line below calls this sketch in a canvas instance in the div with the id canvas1
var myp5 = new p5(mySketch, 'canvas1');


//this sketch will do the same thing as the sketch above, but control the rate with setInterval() rather than using the frame rate in the draw loop
var intervalCanvas = function(sketch) {

    var width = 5;
    var height = 5;
    var stop = 600;
    var clicked = false;
    
    sketch.setup = function() {
      sketch.createCanvas(600,600);
      sketch.background(0);
    };
    
    sketch.draw = function(){
      drawTarget(width,height);
      width++;
      height++;
      if(width>stop){
        width=5;
        height=5;
        stop = stop - 50;
      };
      if(stop < 100){
        stop=600;
      };
      
    };
  
    sketch.mouseClicked = function(){
        if(clicked===false){
          clicked = true;
        }
        else{
          clicked = false;
        }
    }
  
    function drawTarget(w, h){
      if(clicked ===true){
        sketch.fill(w*255/600,0,0);
      }
      else{
        sketch.fill(w*255/600);
      }

      sketch.ellipse(300,300,w,h);
    }
}
var myp5 = new p5(intervalCanvas, 'canvasX');



//third example
//storing and manipulating variables and objects with time and mouse interaction
var canvas2 = function(sketch){
  let snowflakes = [];
  sketch.setup = function(){
    sketch.createCanvas(600,600);
    sketch.background(0);
    sketch.noStroke();
  }
  
  sketch.draw = function(){
    for(let i=0; i< Math.random(5);i++){
      snowflakes.push(new snowflake());
    }
    for (let flake of snowflakes){
      flake.update(sketch.frameCount/60);
      flake.display();
    }
  }
  // snowflake class
  function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = Math.random(-50, 0);
    this.initialangle = Math.random(0,360);
    this.size = Math.random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = Math.sqrt(Math.random(Math.pow(600 / 2, 2)));

    this.update = function(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = 600 / 2 + this.radius * Math.sin(angle);

      // different size snowflakes fall at slightly different y speeds
      this.posY += Math.pow(this.size, 0.5);

    // delete snowflake if past end of screen
      if (this.posY > 600) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
      sketch.ellipse(this.posX, this.posY, this.size);
    };
}

  
};

var myp5_a = new p5(canvas2, 'canvas2');


//what can we manipulate here with mouse interaction?
var canvas3 = function(sketch){
    var angle = 2.0;
    var offset = 300;
    var scalar = 3.5;
    var speed = 0.1;
    var col = {
        r: 255,
        g: 0,
        b: 0
    };

    sketch.setup = function() { 
        sketch.createCanvas(600, 600);
        sketch.noStroke();
        sketch.background (0);
    } 

    sketch.draw = function() { 
        //have rgb values change with the position of the mouse?, or with the up and down arrow
        col.r = sketch.random(0, 200);
        col.g = sketch.random(0, 250);
        col.b = sketch.random(100, 250);
        var x = offset + sketch.cos(angle) * scalar;
        var y = offset + sketch.sin(angle) * scalar;
        sketch.fill(col.r, col.g, col.b);
        sketch.noStroke();
        sketch.ellipse(x, y, 5, 5);
        angle += speed;//increases by 0.1
        scalar += speed;//increases by 0.1
        };
    };
var myp5_b = new p5(canvas3, 'canvas3');


//this uses mouse interaction to create a basic drawing app
var canvas4 = function(sketch){


    sketch.setup = function() { 
        sketch.createCanvas(600, 400);
        //draw background only once in setup
        sketch.background(255);
    } 
    //first lets just give that circle a color in draw.
    sketch.draw = function() { 
        sketch.fill(250,200,200);
    }
    
    //now make stuff only when the mouse is pressed or the mouse is dragged
    
    sketch.mousePressed = function() {
        sketch.ellipse(sketch.mouseX,sketch.mouseY,80,80);
    }
    sketch.mouseDragged = function() {
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100);
    }
    
    
    //another way to achieve this with less code - uncomment the lines below and comment out the previous sketch.draw, sketch.mousePressed, sketch.mouseDragged
    //instead of saying do this when that, lets test if a condition is true and doe something
        /*sketch.draw=function() {
              sketch.stroke(0);
                sketch.fill(250,200,200);
              if (sketch.mouseIsPressed === true) {
                sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100);
                //and because we're using the draw loop, we can also change the fill value, or other things over time using the looping native to this function.  How would you change the color?
                
              }
            }*/
        
    };
var myp5_b = new p5(canvas4, 'canvas4');

var canvas5 = function(sketch){
  //another way to achieve this with less code - uncomment the lines below and comment out the previous sketch.draw, sketch.mousePressed, sketch.mouseDragged
    //instead of saying do this when that, lets test if a condition is true and doe something
    sketch.setup = function() { 
        sketch.createCanvas(600, 400);
        //draw background only once in setup
        sketch.background(0);
    }
        sketch.draw=function() {
          if (sketch.mouseX >(300)){
              sketch.stroke(255);
              if(sketch.mouseIsPressed){
                sketch.fill(255 - sketch.mouseY/2)
              }
              else{
                sketch.fill(sketch.mouseY/2, sketch.mouseX/3, 255);
              }
            sketch.rect(sketch.mouseX, sketch.mouseY, 100, 100);
          }
          else{
            sketch.fill(255, sketch.mouseY/2, sketch.mouseX/3);
            variableEllipse(sketch.mouseX,sketch.mouseY,sketch.pmouseX,sketch.pmouseY);
          }
        }
        function variableEllipse(x,y,px,py){
          let speed = Math.abs(x - px) + Math.abs(y - py);
          sketch.stroke(speed);
          sketch.ellipse(x, y, speed, speed);
        }
}

        
                
                //and because we're using the draw loop, we can also change the fill value, or other things over time using the looping native to this function.  How would you change the color?
                
var myp5_c = new p5(canvas5, 'canvas5');

