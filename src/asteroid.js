class Asteroid
{
    constructor()
    {
        this.x = canvasWidth/2;
        this.y = canvasHeight/4;
        this.xvel = 0.5;
        this.yvel = 0.5;
        this.constructor.reset();
        this.rotation = 0;
        this.rotationRate = 1; //degrees
        this.destroyed = false;
    }

    static reset()
    {
        this.xvel = 0.5;
        this.yvel = 0.5;
    }

    polygon(x, y, radius, npoints) {
      var angle = TWO_PI / npoints;
      beginShape();
      for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
      }
      endShape(CLOSE);
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
        this.showThrusterFiring = false;
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




    //Polygon code from
    //https://p5js.org/examples/form-regular-polygon.html

}