"use strict";

var canvasWidth = 700;
var canvasHeight = 700;
var blackSpaceFill = 0;
var shipColor = 200;
var asteroidColor = 150;

function setup() {
  reset()
}

function draw() {
  
}

function reset(){
    createCanvas(canvasWidth, canvasHeight);

    frameRate(120);
    textSize(60);
    background(blackSpaceFill);

}