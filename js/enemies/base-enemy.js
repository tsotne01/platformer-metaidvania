import { gravity } from "../constants.js";
import { Physics } from "../rigidBody2d.js";

export class Enemy {
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color || "#ff0000";
        this.isActive = true;
        this.health = 100;
        this.maxHealth = 100;
        this.isInvulnerable = false;
        this.invulnerableTimer = 0;
        this.scoreValue = 50;
        this.damage = 10;
        this.velocityY = 0;
        this.physics = new Physics(gravity);
        this.detectionRadius = 200;
        this.isChasing = false;
        this.speed = 2;
        this.direction = 1;
        this.moveDistance = 100;
        this.startX = this.x;
    }

    draw() {
        if (!this.isActive) return;

        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        if (this.health < this.maxHealth) {
            const healthPercentage = this.health / this.maxHealth;
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.x, this.y - 5, this.width, 3);
            this.ctx.fillStyle = "green";
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
    }

    isOnGround() {
        return this.y >= window.innerHeight - this.height;
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

    update(player = null) {
        if (!this.isActive) return;

        if (player) {
            this.playerDetected(player);
        }

        if (!this.isChasing) {
            this.x += this.speed * this.direction;
            if (Math.abs(this.x - this.startX) > this.moveDistance) {
                this.direction *= -1;
            }
        }

        if (this.isInvulnerable) {
            this.invulnerableTimer--;
            if (this.invulnerableTimer <= 0) {
                this.isInvulnerable = false;
            }
        }

        this.physics.applyGravity(this);
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