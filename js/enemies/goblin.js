import { Enemy } from './base-enemy.js';

export class Goblin extends Enemy {
  constructor(ctx, x, y) {
    super(ctx, x, y, 32, 32, '#aa55ff');
    this.speed = 2;
    this.direction = 1;
    this.moveDistance = 100;
    this.startX = this.x;
    this.detectionRadius = 200;
    this.isChasing = false;
  }

  playerDetected(obj) {
    const dx = obj.x - this.x;
    const dy = obj.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.detectionRadius) {
        this.isChasing = true;
        
        const normX = dx / distance;
        const normY = dy / distance;
        
        this.x += normX * this.speed;
        this.y += normY * this.speed;
        
        this.direction = normX > 0 ? 1 : -1;
        this.startX = this.x;
    } else {
        this.isChasing = false; 
    }
  }

  update(player) {
    if (!this.isActive) return;
    
    this.playerDetected(player);

    if(!this.isChasing){
      this.x += this.speed * this.direction;
      if (Math.abs(this.x - this.startX) > this.moveDistance) {
        this.direction *= -1;
      }
    }
  

    super.update(player);
  }

  draw() {
    if (!this.isActive) return;

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.isChasing) {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y - 10, 10, 5);
    }

    super.draw();
  }
}