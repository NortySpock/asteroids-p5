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
        fill(0,200,10);
        translate(this.x,this.y);
        rotate(radians(this.rotation));
        quad(0,        0-scl,
             0+(scl/2),0,
             0,        0-(scl/2),
             0-(scl/2),0);
        pop();
    }

    update()
    {
      this.x += this.xvel;
      this.y += this.yvel;
    }

    thrust()
    {
      this.xvel += 1
    }

    rotateClockwise()
    {
      this.rotation -= this.rotationRate;
    }

    rotateCounterClockwise()
    {
      this.rotation += this.rotationRate;
    }
}