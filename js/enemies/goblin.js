import { Enemy } from './base-enemy.js';

export class Goblin extends Enemy {
    constructor(ctx, x, y) {
        super(ctx, x, y, 32, 32, '#aa55ff');
        this.speed = 2;
        this.direction = 1;
        this.moveDistance = 100;
        this.startX = this.x;
    }

    update(player) {
        if (!this.isActive) return;

        if (!this.isChasing) {
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