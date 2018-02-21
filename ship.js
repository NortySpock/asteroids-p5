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
        fill(0,200,10);
        quad(this.x,        this.y-scl,
             this.x+(scl/2),this.y,
             this.x,        this.y-(scl/2),
             this.x-(scl/2),this.y);
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
}