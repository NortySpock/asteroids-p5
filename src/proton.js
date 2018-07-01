function Proton(startx,starty,radianDirection)  //the bullets of the game
{
  this.pos = createVector(startx,starty);
  this.vel = p5.Vector.fromAngle(radianDirection)
  this.protonSpeedMult = 2;
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