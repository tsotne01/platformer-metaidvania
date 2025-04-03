export class Enemy {
    constructor(ctx, x, y, width, height, color) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color || '#ff0000';
      this.isActive = true;
    }
  
    draw() {
      if (!this.isActive) return;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      if (!this.isActive) return;
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