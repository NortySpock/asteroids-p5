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
        this.mass = 100;
        this.maxForce = 100;
        this.maxSpeed = 10;
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
