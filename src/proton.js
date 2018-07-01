function Proton(startx,starty,radianDirection,inputvel)  //the bullets of the game
{
  this.pos = createVector(startx,starty);
  if(inputvel)
  {
    this.vel = p5.Vector.fromAngle(radianDirection)
    this.vel.add(inputvel)
  } else
  {
    this.vel = p5.Vector.fromAngle(radianDirection)
  }
  this.protonSpeedMult = 3;
  this.vel.mult(this.protonSpeedMult);
  this.deleteFlag = false;


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

    //mark for deletion if it goes out of range
    if(this.pos.x < 0 || this.pos.x > width ||
       this.pos.y < 0 || this.pos.y > height)
    {
      this.deleteFlag = true;
    }
  }
}