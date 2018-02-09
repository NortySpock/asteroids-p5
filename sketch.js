"use strict";


class Ship 
{
    constructor()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
    }

    reset()
    {
        this.x = this.spawnDimension(canvasWidth);
        this.y = this.spawnDimension(canvasHeight);
    }

    show()
    {
        var scl = min(canvasHeight,canvasWidth) / 10
        fill(200);
        quad(this.x,this.y+scl, 
             this.x+(scl/2),this.y, 
             this.x,this.y+(scl/2),
             this.x-(scl/2),this.y);
    }


}

var canvasWidth = 700;
var canvasHeight = 700;
var blackSpaceFill = 0;
var shipColor = 200;
var asteroidColor = 150;
var points = 0;
var whiteTextColor = 255;
var extra_lives = 0;
var ship;

function setup() {
  reset()
}

function draw() {
    var pointsDom = document.getElementById("points");
    pointsDom.innerHTML = "Points: "+points;
    
    var livesDom = document.getElementById("extra_lives");
    livesDom.innerHTML = "Extra lives:"+extra_lives;
    
    ship.show();
}

function reset(){
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');

    frameRate(60);
    textSize(60);
    background(blackSpaceFill);

    points = 0;
    extra_lives = 0
    
    ship = new Ship();
}

function mousePressed()
{
  points++;
}