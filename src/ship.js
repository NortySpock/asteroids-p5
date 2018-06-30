class Ship
{
    constructor()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
        this.xvel = 0;
        this.yvel = 0;
        this.rotation = 0;
        this.rotationRate = 4; //degrees
        this.thrustRate = 0.1;
        this.retroMult = 0.98;
        this.showThrusterFiring = false;
        this.coords = [];
        this.lines = [];
        this.constructor.reset();
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

        noFill();
        stroke(0,255,255); //cyan

        //I had to adjust the draw location to get
        //the Center of Rotation to feel right for this shape.
        //Center of Rotation is better known as
        //the Center of Gravity
        var CoG_offset = (scl/2)+(scl/10);
        this.coords = [0,        0-scl+CoG_offset,
                       0+(scl/2),0+CoG_offset,
                       0,        0-(scl/2)+CoG_offset,
                       0-(scl/2),0+CoG_offset ];

    //update the lines that mark out the ship
    this.lines = [[this.coords[0],this.coords[1],this.coords[2],this.coords[3]],
                  [this.coords[2],this.coords[3],this.coords[4],this.coords[5]],
                  [this.coords[4],this.coords[5],this.coords[6],this.coords[7]],
                  [this.coords[0],this.coords[1],this.coords[6],this.coords[7]]];




        quad(this.coords[0],this.coords[1],
             this.coords[2],this.coords[3],
             this.coords[4],this.coords[5],
             this.coords[6],this.coords[7]);

        pop();

        //reset flag for next cycle
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

      //update display position
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

    getCollisionLines()
    {
      return this.lines;
    }
}