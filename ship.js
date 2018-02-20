class Ship
{
    constructor()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/2;
    }

    reset()
    {
        this.x = this.spawnDimension(canvasWidth);
        this.y = this.spawnDimension(canvasHeight);
    }

    show()
    {
        var scl = min(canvasHeight,canvasWidth) / 30
        fill(0,200,10);
        quad(this.x,this.y+scl,
             this.x+(scl/2),this.y,
             this.x,this.y+(scl/2),
             this.x-(scl/2),this.y);
    }
}