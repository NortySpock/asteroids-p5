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
        this.thrustRate = 0.1;
        this.retroMult = 0.95;
        this.showThrusterFiring = false;
    }

    static reset()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.xvel = 0;
        this.yvel = 0;
        this.showThrusterFiring = false;
    }

    show()
    {
        var scl = min(canvasHeight,canvasWidth) / 30;
        push();

        translate(this.x,this.y);
        rotate(radians(this.rotation));

        if(this.showThrusterFiring)
        {
          fill(0,200,200);
        }
        else
        {
          fill(0,200,10);
        }
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
        this.showThrusterFiring = false;
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
      if(this.y > canvasHeight)
      {
        this.y = 0;
      }
      if(this.y < 0)
      {
        this.y = canvasHeight;
      }
    }

    thrust()
    {
      this.xvel += this.thrustRate * Math.sin(radians(this.rotation));
      //had to flip yvel, not sure why
      this.yvel += this.thrustRate * -Math.cos(radians(this.rotation));
      this.showThrusterFiring = true;
    }

    retro()
    {
      this.xvel *= this.retroMult;
      this.yvel *= this.retroMult;
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