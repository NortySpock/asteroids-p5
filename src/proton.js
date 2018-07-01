function Proton(startx,starty,radianDirection)  //the bullets of the game
{
  this.pos = createVector(startx,starty);
  this.vel = p5.Vector.fromAngle(radianDirection)
  this.protonSpeedMult = 2;
  this.vel.mult(this.protonSpeedMult);


  this.update = function()
  {
      this.pos.add(this.vel);
  }

  this.render = function()
  {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x,this.pos.y);
    pop();
  }
}