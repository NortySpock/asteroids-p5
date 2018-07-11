class Asteroid
{
    constructor()
    {
        this.pos = createVector(canvasWidth/2,canvasHeight/4);
        this.vel = createVector(0.5,0.5);
        this.rotation = 0;
        this.rotationRate = 1; //degrees per frame
        this.destroyed = false;
        this.coords = [];
        this.lines = [];
        this.collideRadius = 40
        this.constructor.reset();
        this.polygonPoints = 6;
    }

    static reset()
    {
        this.pos = createVector(canvasWidth/2,canvasHeight/4);
        this.vel = createVector(0.5,0.5);
        this.rotation = 0;
        this.rotationRate = 1; //degrees per frame
        this.destroyed = false;
        this.coords = [];
        this.lines = [];
        this.collideRadius = 40;
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

    render()
    {
        var scl = min(canvasHeight,canvasWidth) / 20;
        push();

        translate(this.pos.x,this.pos.y);
        rotate(radians(this.rotation));

        noFill();

        if(!this.destroyed)
        {
            stroke(255);
        } else
        {
            stroke(255,0,0);
        }

        strokeWeight(1);

        this.polygon(0, 0, this.collideRadius+1, this.polygonPoints);

        pop();
    }

    update()
    {
      this.pos.add(this.vel);
      this.rotation += this.rotationRate;

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

    checkCollision(x,y,radius)
    {
      if(radius)
      {
        return dist(this.pos.x,this.pos.y,x,y) <= (this.collideRadius + radius)
      }
      else
      {
        return dist(this.pos.x,this.pos.y,x,y) <= this.collideRadius
      }
    }

    getCollisionLines()
    {
      return this.lines;
    }
}