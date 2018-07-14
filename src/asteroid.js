class Asteroid
{
    constructor(x,y,r)
    {
      function randomFromInterval(min,max){
          return Math.random()*(max-min+1)+min;
      }

      if(x && y)
      {
        this.pos = createVector(x,y);
      }
      else //start asteroid on "random" edge
      {
        this.pos = createVector(canvasHeight/2,0)
      }
      if(r)
      {
        this.r = r
      }
      else
      {
        this.r = 50;
      }
      //velocity and rotation
      this.maxvel = 3
      this.vel = createVector(randomFromInterval(-this.maxvel,this.maxvel),randomFromInterval(-this.maxvel,this.maxvel));
      this.rotation = 0; //radians
      this.rotationRate = 0; //radians per frame


      this.destroyed = false;

      //was using this for collision, but will probably stick with collideRadius
      this.coords = [];
      this.lines = [];

      //randomize polygon shape
      this.polygonPoints = 3 + int(randomFromInterval(0,7));

      //used for making jaggy shaped asteroids
      this.pointOffsets = [this.polygonPoints];
      var offsetDelta = 0.5*this.r;
      for(var i = 0; i < this.polygonPoints;i++)
      {
        this.pointOffsets[i] = randomFromInterval(-offsetDelta,offsetDelta)
      }

      //calculate collideRadius
      this.inradius	= this.r*cos(PI/this.polygonPoints);
      this.collideRadius = this.inradius;
    }

    render()
    {
        var scl = min(canvasHeight,canvasWidth) / 20;
        push();
        noFill();

        translate(this.pos.x,this.pos.y);
        rotate(this.rotation);

        if(!this.destroyed)
        {
            stroke(255);
        } else
        {
            stroke(255,0,0); //red
        }

        strokeWeight(1);

        this.coords = [];
        this.lines = [];
        var angle = TWO_PI / this.polygonPoints;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
          var sx = cos(a) * this.r;
          var sy = sin(a) * this.r;
          vertex(sx, sy);
        }
        endShape(CLOSE);
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
}