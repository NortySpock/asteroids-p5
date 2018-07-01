function Proton(startx,starty)  //the bullets of the game
{
  this.pos = createVector(startx,starty);
  this.vel = createVector();
  
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