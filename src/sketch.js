"use strict";

var canvasWidth = 600;
var canvasHeight = 600;
var blackSpaceFill = 0;
var points = 0;
var whiteTextColor = 255;
var ship;
var soundMgr;
var debugMode = true;

var asteroids = [];
var protonBolts = [];
var aliens = [];

function reset() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');

    frameRate(60);
    textSize(60);
    background(blackSpaceFill);

    points = 0;

    ship = new Ship();
    asteroids = [];
    asteroids.push(new Asteroid())

    aliens = [];
    aliens.push(new Alien());

    soundMgr = new SoundManager();
    setInterval(halfSecondUpdateLoop,500);
    setInterval(oneSecondUpdateLoop,1000);
}


function setup() {
  reset();
}

function draw() {

    handleKeyInput();

    background(blackSpaceFill);

    //handle all the asteroids
    for(var i = asteroids.length -1; i >= 0; i--)
    {
      asteroids[i].update();
      asteroids[i].render();
    }

    //handle all the proton bolts
    for (var i = protonBolts.length - 1; i >= 0; --i)
    {
      protonBolts[i].update();
      protonBolts[i].render();

      if(protonBolts[i].deleteFlag)
      {
        protonBolts.splice(i,1);
      }
    }

    for(var i = aliens.length - 1; i >= 0; i--)
    {
      aliens[i].update();
      aliens[i].render();

      if(aliens[i].deleteFlag)
      {
        aliens.splice(i,1);
      }
    }

    //check for collisions
    for (var i = protonBolts.length - 1; i >= 0; --i)
    {
      for(var j = asteroids.length - 1; j >= 0; j--)
      {
        var bolt = protonBolts[i];
        if(asteroids[j].checkCollision(bolt.pos.x,bolt.pos.y))
        {
          //check if the rock breaks
          var smallRock = asteroids[j].smallerAsteroidSize();
          if(smallRock > 12)
          {
            //record previous position
            var oldPos = asteroids[j].pos

            //create two more on the high end of the array
            asteroids.push(new Asteroid(oldPos.x,oldPos.y,smallRock));
            asteroids.push(new Asteroid(oldPos.x,oldPos.y,smallRock));
          }
          //delete the old asteroid
          asteroids.splice(j,1);
          protonBolts[i].deleteFlag = true;

          points += 10;
          soundMgr.queueSound('asteroid_break');
        }
      }

      if(protonBolts[i].deleteFlag)
      {
        protonBolts.splice(i,1);
      }

    }

    //render ship last so it overlays everything
    ship.update();
    ship.render();

    //play all the sounds we've built up this frame
    soundMgr.playAllQueuedSounds();
}


function mousePressed()
{
    if(debugMode)
    {
      for(var i = aliens.length - 1; i >= 0; i--)
      {
        aliens[i].hit();
      }
    }
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
    soundMgr.queueSound('proton_bolt');
  }

  if(key == 'P' && debugMode)
  {
    asteroids.push(new Asteroid());
  }
  
  if(key == 'K' && debugMode)
  {
    aliens.push(new Alien());
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


    // var livesDom = document.getElementById("rotation");
    // livesDom.innerHTML = "rotation:" + ship.rotation;


    // var livesDom = document.getElementById("xvel");
    // livesDom.innerHTML = "xvel:" + ship.xvel;

    // var livesDom = document.getElementById("yvel");
    // livesDom.innerHTML = "yvel:" + ship.yvel;
}

var addAsteroidsIfNeeded = function()
{
  if(asteroids.length <= 0)
  {
    var toAdd = 3 + (millis()/1000/60); //3 + number of minutes you have been playing
    for(var i=0; i < toAdd;i++)
    {
      asteroids.push(new Asteroid())
    }
  }
}

function randomFromInterval(min,max){
    return Math.random()*(max-min+1)+min;
}

function coinFlip()
{
  return (int(Math.random() * 2) == 0);
}

function halfSecondUpdateLoop()
{
  updateDOM();
}

function oneSecondUpdateLoop() {
  addAsteroidsIfNeeded();
}

