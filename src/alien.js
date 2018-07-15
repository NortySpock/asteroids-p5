class Alien
{
    constructor()
    {
        this.pos = createVector(canvasWidth/2,canvasHeight/2);
        this.vel = createVector(1,0);
        this.hidden = true;
    }

    render()
    {

    }

    update()
    {
      this.pos.add(this.vel);

      //appear on other edge if we go offscreen
      if(this.pos.x > canvasWidth)
      {
        this.pos.x = 0;
      }
      if(this.pos.x < 0)
      {
        this.pos.x = canvasWidth;
      }
      if(this.pos.y > canvasHeight)
      {
        this.pos.y = 0;
      }
      if(this.pos.y < 0)
      {
        this.pos.y = canvasHeight;
      }

    }