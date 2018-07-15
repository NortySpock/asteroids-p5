class Alien
{
    constructor()
    {
        this.pos = createVector(canvasWidth/4,canvasHeight/4);
        this.vel = createVector(0,0);
        this.hidden = true;
        this.maxHealth = 3 + (millis()/1000/60); //1 + number of minutes you have been playing
        this.health = this.maxHealth;
        this.color = color(255,0,255);
        this.cloak_timer = 0;
        this.max_cloak_time_millis=3000;
        this.show_timer = 0;
        this.gun_warmup_timer = 0;
        this.scl = min(canvasHeight,canvasWidth) / 30;
        this.collideRadius = this.scl * 2;
        this.deleteFlag = false;
    }

    cloak()
    {
      this.hidden = true;
      this.cloak_timer = millis();
    }

    uncloak()
    {
      this.hidden = false;
      this.show_timer = millis();
    }

    render()
    {
      if(!this.hidden)
      {
        push();
        fill(0);
        stroke(this.color);
        ellipse(this.pos.x, this.pos.y, this.scl*2, this.scl);

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
      if(this.hidden)
      {
        return false;
      }
      else
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
    }

    decrementColor()
    {
      var darkenAmount = 255/(this.maxHealth);
      var newRed = red(this.color) - darkenAmount;
      var newGreen = green(this.color) - darkenAmount;
      var newBlue = blue(this.color) - darkenAmount;
      newRed = newRed > -1 ? newRed : 0;
      newGreen = newGreen > -1 ? newGreen : 0;
      newBlue = newBlue > -1 ? newBlue : 0;
      this.color = color(newRed, newGreen,newBlue);
    }

    hit()
    {
      if(!this.hidden)
      {
        this.decrementColor();
        this.health -= 1;
        if(this.health <= 0)
        {
          this.deleteFlag = true;
        }
      }
    }
}
