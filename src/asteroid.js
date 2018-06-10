class Asteroid
{
    constructor()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/4;
        this.xvel = 0.5;
        this.yvel = 0.5;
        this.rotation = 0;
        this.rotationRate = 1; //degrees per frame
        this.destroyed = false;        
        this.coords = [];
        this.lines = [];
        this.constructor.reset();
    }

    static reset()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/4;
        this.xvel = 0.5;
        this.yvel = 0.5;
        this.rotation = 0;
        this.rotationRate = 1; //degrees per frame
        this.destroyed = false;
        this.coords = [];
        this.lines = [];
    }

    polygon(x, y, radius, ncoords) {
      //Polygon code from
      //https://p5js.org/examples/form-regular-polygon.html
      this.coords = [];
      this.lines = [];
      var angle = TWO_PI / ncoords;
      beginShape();
      for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);

        this.coords.push(sx);
        this.coords.push(sy);
        
        var clen = this.coords.length;
        //if we have enough for a line, we can add the most recent line
        if(clen >= 4)
        {
            //coordinates are added 2 at a time
            this.lines.push([this.coords[clen-4],
                             this.coords[clen-3],
                             this.coords[clen-2],
                             this.coords[clen-1]]);
        }
      }
      endShape(CLOSE);
      
      //need to add the last line
      var clen = this.coords.length;
      if(clen >= 6) //need a 3 sided object
      {
        //add last point connecting to first point
        this.lines.push([this.coords[clen-2],
                         this.coords[clen-1],
                         this.coords[0],
                         this.coords[1]]);
      }
    }

    show()
    {
        var scl = min(canvasHeight,canvasWidth) / 20;
        push();

        translate(this.x,this.y);
        rotate(radians(this.rotation));

        if(!this.destroyed)
        {
            fill(200,100,100);
        }
        else
        {
            fill(255);
        }

        this.polygon(0, 0, 50, 6);

        pop();
    }

    update()
    {
      this.x += this.xvel;
      this.y += this.yvel;
      this.rotation += this.rotationRate;

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

    getCollisionLines()
    {
      return this.lines;
    }
}