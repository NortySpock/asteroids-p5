"use strict";

var canvasWidth = 700;
var canvasHeight = 700;
var blackSpaceFill = 0;
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

var asteroids = [];
var protonBolts = [];

function setup() {
  reset();
}

function draw() {

    handleKeyInput();

    background(blackSpaceFill);

    //handle all the asteroids
    for(var i = asteroids.length -1; i >= 0; i--)
    {
      asteroids[i].render();
      asteroids[i].update();
    }

    //handle all the proton bolts
    for (var i = protonBolts.length - 1; i >= 0; --i)
    {
      protonBolts[i].render();
      protonBolts[i].update();

      if(protonBolts[i].deleteFlag)
      {
        protonBolts.splice(i,1);
      }
    }

    //check for collisions
    for (var i = protonBolts.length - 1; i >= 0; --i)
    {
      for(var j = asteroids.length -1; j >= 0; j--)
      {
        var bolt = protonBolts[i];
        if(asteroids[j].checkCollision(bolt.pos.x,bolt.pos.y))
        {
          asteroids[j].destroyed = true;
        }
      }
    }

    //render ship last so it overlays everything
    ship.update();
    ship.render();


    updateDOM();

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
    asteroids = [];
    asteroids.push(new Asteroid())


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

    //explosionEnvelope.play(whiteNoise);
    //asteroidBreakEnvelope.play(brownNoise);
}

//handles continuous presses
var handleKeyInput = function()
{
    //key handling
    if(keyIsDown(UP_ARROW) || keyIsDown(87) /* w */)
    {
      ship.thrust();
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(83) /* s */)
    {
      ship.retro();
    }
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65) /* a */)
    {
      ship.rotateCounterClockwise();
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) /* d */)
    {
      ship.rotateClockwise();
    }
};

function keyPressed() {
  if(key == ' ')
  {
    protonBolts.push(new Proton(ship.gunPos.x,ship.gunPos.y,radians(ship.gunOrientation)));
    //raygunEnvelope.play(raygunOscillator);
  }
};

var updateDOM = function()
{
    var fpsDom = document.getElementById("fps");
    var fps = frameRate();
    fpsDom.innerHTML = "FPS:" + fps.toFixed(0);

    //update surrounding HTML
    var pointsDom = document.getElementById("points");
    pointsDom.innerHTML = "Points: " + points;

    var livesDom = document.getElementById("extra_lives");
    livesDom.innerHTML = "Extra lives:" + extra_lives;

    // var livesDom = document.getElementById("rotation");
    // livesDom.innerHTML = "rotation:" + ship.rotation;


    // var livesDom = document.getElementById("xvel");
    // livesDom.innerHTML = "xvel:" + ship.xvel;

    // var livesDom = document.getElementById("yvel");
    // livesDom.innerHTML = "yvel:" + ship.yvel;
}