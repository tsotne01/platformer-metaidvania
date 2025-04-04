export class Enemy {
  constructor(ctx, x, y, width, height, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color || '#ff0000';
    this.isActive = true;
    this.health = 100; 
    this.maxHealth = 100;
    this.isInvulnerable = false;
    this.invulnerableTimer = 0;
    this.scoreValue = 50;
    this.damage = 10;
  }

  draw() {
    if (!this.isActive) return;
    
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Health bar
    if (this.health < this.maxHealth) {
      const healthPercentage = this.health / this.maxHealth;
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y - 5, this.width, 3);
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(this.x, this.y - 5, this.width * healthPercentage, 3);
    }
  }

  takeDamage(amount) {
    if (this.isInvulnerable) return false;
    
    this.health -= amount;
    this.isInvulnerable = true;
    this.invulnerableTimer = 20;
    
    if (this.health <= 0) {
      this.isActive = false;
      return true;
    }
    return false;
  }

  checkHitCollision(attack) {
    return this.checkCollision(attack);
  }

  die() {
    this.isActive = false;
    // TODO: add a death animation
  }

  update() {
    if (!this.isActive) return;
    
    if (this.isInvulnerable) {
      this.invulnerableTimer--;
      if (this.invulnerableTimer <= 0) {
        this.isInvulnerable = false;
      }
    }
    
    this.draw();
  }

  checkCollision(player) {
    if (!this.isActive) return false;
    return (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    );
  }
}