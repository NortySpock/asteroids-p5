class Ship
{
    constructor()
    {
        this.pos = createVector(canvasWidth/2,canvasHeight/2);
        this.vel = createVector(0,0);
        this.rotation = 0;
        this.gunOrientation = 0;
        this.gunPos = createVector();
        this.gunRotationOffset = -90;
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
        this.pos = createVector(canvasWidth/2,canvasHeight/2);
        this.vel = createVector(0,0);
        this.showThrusterFiring = false;
    }

    render()
    {
        var scl = min(canvasHeight,canvasWidth) / 30;
        push();

        translate(this.pos.x,this.pos.y);
        rotate(radians(this.rotation));

        fill(0);
        strokeWeight(1);

        if(this.showThrusterFiring)
        {
          stroke(0,255,255); //cyan
        }
        else
        {
          stroke(0,255,0); //green
        }

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

      this.gunOrientation = this.rotation + this.gunRotationOffset;
      //this.gunPos = createVector(this.coords[0],this.coords[1]);
      //this.gunPos = createVector(this.pos.x+this.coords[2],this.pos.y+this.coords[3]);
      //this.gunPos = createVector(this.pos.x+this.coords[0],this.pos.y+this.coords[1]);
      this.gunPos = createVector(this.pos.x,this.pos.y);

    }

    thrust()
    {

      var xcomponent = this.thrustRate * Math.sin(radians(this.rotation));
      var ycomponent = this.thrustRate * -Math.cos(radians(this.rotation));

      this.vel.add(xcomponent,ycomponent);

      this.showThrusterFiring = true;
    }

    retro()
    {
      this.vel.mult(this.retroMult);
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