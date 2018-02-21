class Ship
{
    constructor()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.xvel = 0;
        this.yvel = 0;
        this.constructor.reset();
        this.rotation = 0;
        this.rotationRate = 4; //degrees
    }

    static reset()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.xvel = 0;
        this.yvel = 0;
    }

    show()
    {
        var scl = min(canvasHeight,canvasWidth) / 30;
        push();

        translate(this.x,this.y);
        rotate(radians(this.rotation));

        fill(0,200,10);
        //I had to adjust the draw location to get
        //the Center of Rotation to feel right for this shape.
        //Center of Rotation is better known as
        //the Center of Gravity
        var CoG_offset = (scl/2)+(scl/10);
        quad(0,        0-scl+CoG_offset,
             0+(scl/2),0+CoG_offset,
             0,        0-(scl/2)+CoG_offset,
             0-(scl/2),0+CoG_offset);

        pop();
    }

    update()
    {
      this.x += this.xvel;
      this.y += this.yvel;

      //appear on other edge if we go offscreen
      if(this.x > canvasWidth)
      {
        this.x = 0;
      }
      if(this.x < 0)
      {
        this.x = canvasWidth;
      }
    }

    thrust()
    {
      this.xvel += 1
    }

    rotateClockwise()
    {
      this.rotation += this.rotationRate;
    }

    rotateCounterClockwise()
    {
      this.rotation -= this.rotationRate;
    }
}