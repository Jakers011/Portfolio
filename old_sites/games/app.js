var soundFile = null;
var amplitude;
var ctx, ctxOn;
var backgroundColor = 255;
var lives = 3;
var big = false;
var heart;
var hearts;
var invincibility = false;
var timer = 300;
var score = 0;
var win = false;
var rando = 0;
var started = false;
var bu = false;
var sel;
var choice;
var restart = false;
var rest;
var oblife;

let r = 100;
let t = 100;
var obstacles;
var up;
var collectibles;
// RANDOM SHAPES
var randomShape = [];
var shapeType;
var col;
var firs;
var sec;
var thir;
var fou;
var player;
var topl = [];
var bottoml = [];
var topr = [];
var bottomr = [];
var left = 50;

// rectangle parameters
var rectRotate = true;
var rectMin = 15;
var rectOffset = 20;
var numRects = 10;
var playing = false;
var area;
var firstplay = true;
// :: Beat Detect Variables
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 30;
var bars;
var bars2;
var bars3;
var bars4;
// what amplitude level can trigger a beat?
var beatThreshold = 0.11; 

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.98; // how fast does beat cutoff decay?
var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.
var source;

var slider;
var checkbox;
var godmode = false;

window.onload = function(){
    var file = document.getElementById("thefile");
    file.onchange = function(){
        var files = this.files;
        soundFile = loadSound(files[0]);
    }
    var sel = document.getElementById("otherfile");
    var choice = sel.options[sel.selectedIndex].value;
    console.log(choice)
    sel.onchange = function(){
        choice = sel.options[sel.selectedIndex].value;
        if(choice === "Uncontrollable"){
            soundFile = loadSound('assets/Uncontrollable.mp3');
        }
        if(choice === "Tar"){
            soundFile = loadSound('assets/Black-Tar.mp3');
        }
        if(choice === "Rivers"){
            soundFile = loadSound('assets/Rivers.ogg');
        }
        if(choice === "Happier"){
            soundFile = loadSound('assets/Happier.mp3');
        }
        if(choice === "Aria"){
            soundFile = loadSound('assets/Aria.mp3');
        }
        if(choice === "Kiss"){
            soundFile = loadSound('assets/Kiss.mp3');
        }
        if(choice === "Fire"){
            soundFile = loadSound('assets/Fire.mp3');
        }
        if(choice === "Spiderman"){
            soundFile = loadSound('assets/Pizza.mp3')
        }
        
    }
    ctx = getAudioContext();
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function setup() {
    c = createCanvas(windowWidth*.9, windowHeight*.9);
    c.parent("main");
    player = createSprite(width/2,height/2, 50, 50);
    player.addImage(loadImage('assets/music-user2.png'));
    player.setCollider('circle', 0, 0, 25);
    
    area = createSprite(width/2,height/2,1,1);
    area.visible=false;
    
    fft = new p5.FFT();
    
    hearts = new Group();
    bars = new Group();
    collectibles = new Group();
    for(var i = 0; i< 3;i++){
        heart = createSprite(left + left*2*i,50);
        heart.addImage("small",loadImage('assets/heart2.png'));
        heart.addImage("large",loadImage('assets/heart.png'));
        hearts.add(heart);
    }
    
    amplitude = new p5.Amplitude();
    
    amplitude.setInput(soundFile);
    amplitude.smooth(0.9);
    r = width/2;
    t = height/2;
    obstacles = new Group();
    sel = document.getElementById("otherfile");
    choice = sel.options[sel.selectedIndex].value;
    slider = createSlider(5,100,20,5);
    slider.parent("slide");
    slider.style('width','80px');
    
    checkbox = createCheckbox('Visualizer',false);
    checkbox.parent("check");
    checkbox.changed(toggleMode);
}

function draw() {
    var val = document.getElementById("demo");
    val.innerHTML = slider.value();
    if(started === true){
    background(0);
  
  var spectrum = fft.analyze();
    for (var i = 0; i < spectrum.length; i++){
        var x = map(i, 0, spectrum.length, 0, width);
        var h = height - map(spectrum[i], 0, 255, height, 0);
        strokeWeight(4);
        stroke(255);
        rect(x, height, width / spectrum.length, h*.67);
        bottoml[i] = [x,height - h*.67];
        rect(width - x, height, width/spectrum.length, h*.67)
        bottomr[i] = [width - x, height - h*.67];
        rect(x, 0, width / spectrum.length, h*.67)
        topl[i] = [x, h*.67];
        rect(width - x, 0, width/spectrum.length, h*.67)
        topr[i] = [width - x, height - h*.67];
    }
    
    
  var level = amplitude.getLevel();
    fill(backgroundColor);
    noStroke();
    if(godmode === false){
        ellipse(width/2, height/2, width - map(level,0,1,0,width*0.25), height/10 + map(level,0,1,0,height*.6)+1);
    }
    else{
        stroke(255);
        strokeWeight(4);
        ellipse(width/2, height/2, width - map(level,0,1,0,width*0.25), height/20 + map(level,0,1,0,height*.9)+1);
        noStroke();
    }

    detectBeat(level);

  // distort the rectangle based based on the amp
  var distortDiam = map(level, 0, 1, 0, 1200);
    
    // DETERMINE WHAT TO USE FOR PLAYING AREA

  /* THIS IS THE ORIGINAL CODE
  var w = rectMin;
  var h = rectMin;

  // distortion direction shifts each beat
  if (rectRotate) {
    var rotation = PI/ 2;
  } else {
    var rotation = PI/ 3;
  }

  // rotate the drawing coordinates to rectCenter position
  var rectCenter = createVector(width/3, height/2);

  push();

    // draw the rectangles
    for (var i = 0; i < numRects; i++) {
      var x = rectCenter.x + rectOffset * i;
      var y = rectCenter.y + distortDiam/2;
      // rotate around the center of this rectangle
      translate(x, y); 
      rotate(rotation);
        fill(255);
        strokeWeight(10);
        rect(0, 0, rectMin, rectMin + distortDiam);
    }
  pop();
    */
    if(lives != 0 && win === false){
        if ((keyIsDown(65) || keyIsDown(37)) && player.position.x > 25){
            
            r -= 9;
            player.velocity.x = -9;
        }
        else if ((keyIsDown(68) || keyIsDown(39)) && player.position.x < width -25){
            r += 9;
            player.velocity.x = 9;
        }
        else{
            player.velocity.x = 0;
        }
        if ((keyIsDown(87) || keyIsDown(38)) && player.position.y > 25){
            t -= 9;
            player.velocity.y = -9;
        }
        else if ((keyIsDown(83) || keyIsDown(40)) && player.position.y < height - 25){
            player.velocity.y = 9;
            t += 9;
        }
        else{
            player.velocity.y = 0;
        }
    /*
    if (randomShape.length > 0){
        for(var i = 0; i < randomShape.length; i++){
            fill(randomShape[i][1]);
            if(randomShape[i][0] === 0){
                rect(randomShape[i][2],randomShape[i][3],randomShape[i][4],randomShape[i][5]);
                randomShape[i][2] -= map(level, 0, 1, 0, 10);
                randomShape[i][3] += map(level, 0, 1, 0, 10);
            }
            else{
                ellipse(randomShape[i][2],randomShape[i][3],randomShape[i][4],randomShape[i][5]);
                randomShape[i][2] += map(level, 0, 1, 0, 10);
                randomShape[i][3] -= map(level, 0, 1, 0, 10);
            }
        }
    } */
        for (var i = 0; i<obstacles.length; i++){
            var s = obstacles[i];
        
            s.rotationSpeed = map(level, 0, 1, 0, 90);
            s.setSpeed(map(level, 0, 1, 0, 35));
            if(s.position.x < 0 || s.position.x > width){
                s.velocity.x = s.velocity.x * -1;
            }
            if(s.position.y <0 || s.position.y> height){
                s.velocity.y = s.velocity.y *-1
            }
            player.collide(s, lossLife);
        }
    
        // COLLISION BETWEEN PLAYER  AND OBSTACLES
        drawSprites();
        if(invincibility === true){
            immune();
        }    
        // Draw score
        if(godmode === false){
            textSize(64);
            text(score, width - 150, 100);
        }
        
        rest = soundFile.onended(songOver);
    }
    else if(lives === 0 && win === false){
        checkbox.show();
        textSize(64);
        fill(255);
        strokeWeight(4);
        stroke(0)
        textAlign(CENTER);
        text('GAME OVER', width/2, height/3);
        text('SCORE ' + score, width/2, height/2);
        textSize(32);
        text('Click button above to try again.', width/2, height*.75);
        sel.onchange = function(){
            choice = sel.options[sel.selectedIndex].value;
            soundFile = null;
            if(choice === "Uncontrollable"){
                soundFile = loadSound('assets/Uncontrollable.mp3');
            }
            if(choice === "Tar"){
                soundFile = loadSound('assets/Black-Tar.mp3');
            }
            if(choice === "Rivers"){
                soundFile = loadSound('assets/Rivers.ogg');
            }
            if(choice === "Happier"){
                soundFile = loadSound('assets/Happier.mp3');
            }
             if(choice === "Aria"){
                soundFile = loadSound('assets/Aria.mp3');
            }
            if(choice === "Kiss"){
                soundFile = loadSound('assets/Kiss.mp3');
            }
            if(choice === "Fire"){
                soundFile = loadSound('assets/Fire.mp3');
            }
            console.log("CHANGING SONG")
            rest.remove();
            restart = false;
        }
        var file = document.getElementById("thefile");
        file.onchange = function(){
            var files = this.files;
            soundFile = null;
            soundFile = loadSound(files[0]);
            rest.remove();
            restart = false;
        }
        if(restart === false && soundFile.isLoaded()){
            rest = createButton('Play Again');
            rest.addClass("btn btn-dark btn-lg");
            rest.parent("start");
            restart = true;
        }
        else{
            rest.mousePressed(() => {
                console.log("Pressed Rest")
                replay();
                rest.remove();
                restart = false;
            })
        }
    }
    else{
        console.log(win);
        console.log(lives);
        checkbox.show();
        textSize(64);
        fill(255);
        strokeWeight(4);
        stroke(0);
        textAlign(CENTER);
        text('CONGRATS YOU WIN!', width/2, height/3);
        text('SCORE ' + score, width/2, height/2);
        textSize(32);
        text('Click button above to try again.', width/2, height*.75);
        for(var i = 0; i<hearts.length; i++){
            hearts[i].remove();
        }
        sel.onchange = function(){
            choice = sel.options[sel.selectedIndex].value;
            soundFile = null;
            if(choice === "Uncontrollable"){
                soundFile = loadSound('assets/Uncontrollable.mp3');
            }
            if(choice === "Tar"){
                soundFile = loadSound('assets/Black-Tar.mp3');
            }
            if(choice === "Rivers"){
                soundFile = loadSound('assets/Rivers.ogg');
            }
            if(choice === "Happier"){
                soundFile = loadSound('assets/Happier.mp3');
            }
             if(choice === "Aria"){
                soundFile = loadSound('assets/Aria.mp3');
            }
            if(choice === "Kiss"){
                soundFile = loadSound('assets/Kiss.mp3');
            }
            if(choice === "Fire"){
                soundFile = loadSound('assets/Fire.mp3');
            }
            console.log("CHANGING SONG")
            rest.remove();
            restart = false;
        }
        var file = document.getElementById("thefile");
        file.onchange = function(){
            var files = this.files;
            soundFile = null;
            soundFile = loadSound(files[0]);
            rest.remove();
            restart = false;
        }
        if(restart === false && soundFile.isLoaded()){
            rest = createButton('Play Again');
            rest.addClass("btn btn-dark btn-lg");
            rest.parent("start");
            restart = true;
        }
        else{
            rest.mousePressed(() => {
                console.log("Pressed Rest")
                replay();
                rest.remove();
                restart = false;
            })
        }
    }
    }
    else{
        created();
    }
}

function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat(level);
    beatCutoff = level *1.2;
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat(level) {
  var swc = Math.round(random(0,5));
  var c1 = random(0,255);
  var c2 = random(0,255);
  var c3 = random(50,200);
  switch(swc){
      case 0: backgroundColor = color(c1,c2,c3);
          break;
      case 1: backgroundColor = color(c1,c3,c2);
          break;
      case 2: backgroundColor = color(c2,c1,c3);
          break;
      case 3: backgroundColor = color(c2,c3,c1);
          break;
      case 4: backgroundColor = color(c3,c1,c2);
          break;
      case 5: backgroundColor = color(c3,c2,c1);
          break;         
  }
  rectRotate = !rectRotate;
    if(invincibility === false && godmode === false){
        var surf = Math.pow(player.position.x - width/2,2)/Math.pow((width - map(level,0,1,0,width*0.25))/2,2) + Math.pow(player.position.x - height/2,2)/Math.pow((height - map(level,0,1,0,height*0.25)+1)/2,2);
        if (surf < 1){
            score += 2*obstacles.length;
        }
        score +=obstacles.length;
    }
  var choicex = Math.round(random(1,2));
  var choicey = Math.round(random(1,2));
  var ax;
  var ay;
  if (choicex === 1){
      ax = width * .05;
  }
  else{
      ax = width * .95;
  }
  if (choicey === 1){
      ay = height * .05;
  }
  else{
      ay = height * .95;
  }
  var s = createSprite(ax,ay,30,30);
    s.velocity.x = random(-5,5);
    s.velocity.y = random(-5,5);
    if(godmode === false){
        s.maxSpeed = 8;
    }
    else{
        s.maxSpeed = 35;
    }
    s.life = oblife*60;
    s.shapeColor = color(255);
    obstacles.add(s);
    
    if(big === false){
        for(var i=0; i<hearts.length; i++){
            hearts[i].changeImage("large");
        }
        big = true;
    }
    else{
        for(var i=0; i<hearts.length; i++){
            hearts[i].changeImage("small");
        }
        big = false;
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function lossLife(){
    if(invincibility === false){
        hearts[hearts.length-1].remove();
        invincibility = true;
        lives -= 1;
        score -= 25;
        console.log(lives);
        console.log(win);
    }
    if(lives === 0){
        soundFile.stop();
        obstacles.removeSprites();
        invincibility = false;
        console.log(win);
    }
}

function immune(){
    if(timer === 0){
        invincibility = false;
        timer = 300;
    }
    else if(godmode === true){
        player.visible = false;
    }
    else{
        textSize(50);
        if(timer >= 240 && timer < 300){
            text('5',100, 100);
        }
        else if(timer >=180 && timer < 240){
            text('4',100,100);
        }
        else if(timer >=120 && timer < 180){
            text('3',100,100);
        }
        else if(timer >=60 && timer < 120){
            text('2',100,100);
        }
        timer -=1;
        if(timer%10 === 0 && timer!=0){
            player.visible = false;
        }
        else{
            player.visible = true;
        }
    }
}

songOver = function (){
    console.log("Song is over");
    randomShape = [];
    if(lives === 0){
        win = false;
    }
    else{
        win = true;
    }
    
}

function replay(){
    for(var i = 0; i< 3;i++){
        heart = createSprite(left + left*2*i,50);
        heart.addImage("small",loadImage('assets/heart2.png'));
        heart.addImage("large",loadImage('assets/heart.png'));
        hearts.add(heart);
    }
    lives = 3;
    obstacles.removeSprites();
    invincibility = false;
    timer = 300;
    player.position.x = width/2;
    player.position.y = height/2;
    score = 0;
    win = false;
    soundFile.play();
    oblife = slider.value();
    checkbox.hide();
    if(godmode === true){
        gdm();
    }
}

function created(){
    if(soundFile != null && bu === false){
        if(soundFile.isLoaded){
            ctxOn = createButton('Start game');
            ctxOn.addClass("btn btn-dark btn-lg")
            ctxOn.parent("start");
            bu = true;
        } 
    }
    if(soundFile != null && bu === true){
    ctxOn.mousePressed(() => {
  	ctx.resume().then(() => {
  	console.log('Audio Context is now ON');
        if(soundFile != null){
            if(soundFile.isLoaded()){
                console.log(slider.value())
                ctxOn.hide();
        
                noStroke();
                rectMode(CENTER);
                soundFile.play();
                started = true;
                amplitude = new p5.Amplitude();
                console.log(amplitude);
                oblife = slider.value();
                checkbox.hide();
                if(godmode === true){
                    gdm();
                }
            }
        }
        
        else{
            alert("Please select a song or upload one");
        }

        
  	});
    });
    }
    
}

function addlife(t){
    t.remove();
    console.log("COLLECTING")
    heart = createSprite(left + left *2*hearts.length,50);
    heart.addImage("small",loadImage('assets/heart2.png'));
    heart.addImage("large",loadImage('assets/heart.png'));
    lives +=1;
    hearts.add(heart);
}

function toggleMode(){
    if (this.checked()){
        console.log("CHECKED")
        godmode = true;
        for(var i = 0; i<hearts.length;i++){
            hearts[i].visible = false;
        }
    }
    else{
        console.log("UNCHECKED")
        godmode = false;
        for(var i = 0; i<hearts.length;i++){
            hearts[i].visible = true;
        }
        player.visible = true;
    }
}

function gdm(){
    invincibility = true;
}