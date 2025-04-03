import { Enemy } from './base-enemy.js';

export class Goblin extends Enemy {
  constructor(ctx, x, y) {
    super(ctx, x, y, 32, 32, '#aa55ff');
    this.speed = 2;
    this.direction = 1;
    this.moveDistance = 100;
    this.startX = x;
  }

  update() {
    if (!this.isActive) return;

    this.x += this.speed * this.direction;
    
    if (Math.abs(this.x - this.startX) > this.moveDistance) {
      this.direction *= -1;
    }

    super.update();
  }
}