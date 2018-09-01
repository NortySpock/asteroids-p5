class Alien
{
    constructor()
    {
        this.pos = createVector(canvasWidth/2,canvasHeight/2);
        this.vel = createVector(0,0);
        this.maxHealth = 3 + (millis()/1000/60); //1 + number of minutes you have been playing
        this.health = int(this.maxHealth);
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
        this.targetPoint;
        this.patrolPointNW = createVector(canvasWidth*(1/4),canvasHeight*(1/4));
        this.patrolPointN = createVector(canvasWidth*(2/4),canvasHeight*(1/4));
        this.patrolPointNE = createVector(canvasWidth*(3/4),canvasHeight*(1/4));
        
        
        this.patrolPointSW = createVector(canvasWidth*(1/4),canvasHeight*(3/4));
        this.patrolPointS = createVector(canvasWidth*(2/4),canvasHeight*(3/4));        
        this.patrolPointSE = createVector(canvasWidth*(3/4),canvasHeight*(3/4));
    }

    render()
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
      
      /* indicate patrol points */
      point(this.patrolPointNW.x, this.patrolPointNW.y);
      point(this.patrolPointN.x, this.patrolPointN.y);
      point(this.patrolPointNE.x, this.patrolPointNE.y);
      
      point(this.patrolPointSW.x, this.patrolPointSW.y);
      point(this.patrolPointS.x, this.patrolPointS.y);
      point(this.patrolPointSE.x, this.patrolPointSE.y);
      
      /* indicate target heading */
      if(this.targetPoint)
      {
        stroke(255,0,0);
        line(this.pos.x,this.pos.y,this.targetPoint.x,this.targetPoint.y)
      }
      pop();      
    }

    update()
    {
      //determine heading
      var targetPoint = this.patrolPointSW;
      this.targetPoint = targetPoint;
      this.graviticPull(targetPoint);

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

    graviticPull(targetPoint)
    {
      var targetAccelVector = createVector(0,0);
      targetAccelVector.sub(targetPoint)
      //targetAccelVector.normalize();
      this.vel.sub(targetAccelVector);
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
    
    calcHeadingRadians(fromPoint,toPoint)
    {
      var angle = Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x);
      if(angle < 0)
      {
          angle = (2*Math.PI) - (-angle);

      }
      return angle;
    }
}
