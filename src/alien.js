class Alien
{
    constructor()
    {
        this.pos = createVector(canvasWidth/4,canvasHeight/4);
        this.vel = createVector(0,0);
        this.maxHealth = 3 + (millis()/1000/60); //1 + number of minutes you have been playing
        this.health = this.maxHealth;
        this.cyan = color(0,255,255);
        this.magenta = color(255,0,255);
        this.color = this.magenta;
        this.cloak_timer = 0;
        this.max_cloak_time_millis=3000;
        this.show_timer = 0;
        this.gun_warmup_timer = 0;
        this.scl = min(canvasHeight,canvasWidth) / 28;
        this.collideRadius = this.scl * 2;
        this.deleteFlag = false;
        this.accelRate = 1;
        this.maxSpeed = 5;
        this.targetHeadingRadians = 0;
        this.patrolPoint1 = createVector(canvasWidth*(1/4),canvasHeight*(3/4));
        this.patrolPoint2 = createVector(canvasWidth*(3/4),canvasHeight*(3/4));
    }

    render()
    {
      if(!this.hidden)
      {
        push();
        fill(0);
        stroke(this.color);
        ellipse(this.pos.x, this.pos.y, this.scl*2, this.scl);
        var subScl = this.scl/4;
        line(this.pos.x+subScl,this.pos.y-subScl, this.pos.x-subScl,this.pos.y-subScl)
        line(this.pos.x-subScl,this.pos.y-subScl, this.pos.x-subScl,this.pos.y+subScl)
        line(this.pos.x+subScl,this.pos.y-subScl, this.pos.x+subScl,this.pos.y+subScl)
        point(this.pos.x, this.pos.y);
        pop();
      }
    }

    update()
    {
      //determine heading
      var targetPoint = this.patrolPoint2;
      this.targetHeadingRadians =  Math.atan2(targetPoint.y - this.pos.y, targetPoint.x - this.pos.x);

      var xcomponent =  this.accelRate * Math.sin(this.targetHeadingRadians);
      var ycomponent = this.accelRate * -Math.cos(this.targetHeadingRadians);

      this.vel.add(xcomponent,ycomponent);
      this.vel = this.vel.limit(this.maxSpeed);




      this.vel = this.vel.limit(this.maxSpeed); //speed limiter
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
    }

    checkCollision(x,y,radius)
    {
      var collide1, collide2;
      if(radius)
      {
        collide1 = dist(this.pos.x,this.pos.y,x,y) <= (this.collideRadius + radius)
        collide2 = dist(this.pos.x+(this.scl*2),this.pos.y,x,y) <= (this.collideRadius + radius)

      }
      else
      {
        collide1 = dist(this.pos.x,this.pos.y,x,y) <= (this.collideRadius)
        collide2 = dist(this.pos.x+(this.scl*2),this.pos.y,x,y) <= (this.collideRadius)
      }
      return collide1 ||  collide2;
    }

    changeColorPreservingAlpha(colorIn)
    {
      this.color = color(red(colorIn), green(colorIn),blue(colorIn),alpha(this.color));
    }

    decrementColor()
    {
      var darkenAmount = 255/(this.maxHealth);
      var newAlpha = Math.max(0,alpha(this.color)-darkenAmount);
      this.color = color(red(this.color), green(this.color),blue(this.color),newAlpha);
    }

    graviticPull()
    {
      var xcomponent = this.thrustRate * Math.sin(radians(this.rotation));
      var ycomponent = this.thrustRate * -Math.cos(radians(this.rotation));

      this.vel.add(xcomponent,ycomponent);
    }

    hit()
    {
        this.decrementColor();

        this.health -= 1;
        if(this.health <= 0)
        {
          this.deleteFlag = true;
        }
    }
}
