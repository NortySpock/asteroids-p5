"use strict";

var canvasWidth = 700;
var canvasHeight = 700;
var blackSpaceFill = 0;
var shipColor = 200;
var asteroidColor = 150;
var points = 0;
var whiteTextColor = 255;
var extra_lives = 0;

function setup() {
  reset()
}

function draw() {
    var pointsDom = document.getElementById("points");
    pointsDom.innerHTML = "Points: "+points;
    
    var livesDom = document.getElementById("extra_lives");
    livesDom.innerHTML = "Extra lives:"+extra_lives;
}

function reset(){
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');

    frameRate(60);
    textSize(60);
    background(blackSpaceFill);

    points = 0;
    extra_lives = 0
}

function mousePressed()
{
  points++;
}