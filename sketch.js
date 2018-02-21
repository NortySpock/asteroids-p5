"use strict";

var canvasWidth = 700;
var canvasHeight = 700;
var blackSpaceFill = 0;
var asteroidColor = 150;
var points = 0;
var whiteTextColor = 255;
var extra_lives = 0;
var ship;
var whiteNoise;
var explosionEnvelope;
var asteroidBreakEnvelope;
var raygunOscillator;
var raygunEnvelope;
var brownNoise;

function setup() {
  reset();
}

function draw() {
    //key handling
    if(keyIsDown(UP_ARROW))
    {
      ship.thrust();
    }
    
    // show objects
    background(blackSpaceFill);
    ship.show();
    
    //update objects
    ship.update();
    
    
    //update surrounding HTML
    var pointsDom = document.getElementById("points");
    pointsDom.innerHTML = "Points: " + points;

    var livesDom = document.getElementById("extra_lives");
    livesDom.innerHTML = "Extra lives:" + extra_lives;    
}

function reset() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');

    frameRate(60);
    textSize(60);
    background(blackSpaceFill);

    points = 0;
    extra_lives = 0;

    ship = new Ship();

    whiteNoise = new p5.Noise('white');
    whiteNoise.amp(0);
    whiteNoise.start();

    brownNoise = new p5.Noise('brown');
    brownNoise.amp(0);
    brownNoise.start();

    asteroidBreakEnvelope = new p5.Env();
    asteroidBreakEnvelope.setADSR(0.005, 0.01, 1, 0.005);

    explosionEnvelope = new p5.Env();
    explosionEnvelope.setADSR(0.001,1, 0.7, 1);

    raygunOscillator = new p5.Oscillator();
    raygunOscillator.setType('sawtooth');
    raygunOscillator.freq(700);
    raygunOscillator.amp(0);
    raygunOscillator.start();

    raygunEnvelope = new p5.Env();
    raygunEnvelope.setADSR(0.001, 0.04, 0.1, 0.05);
}

function mousePressed()
{
    points += 1;
    //raygunEnvelope.play(raygunOscillator);
    //explosionEnvelope.play(whiteNoise);
    //asteroidBreakEnvelope.play(brownNoise);
}
