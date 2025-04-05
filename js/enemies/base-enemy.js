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
  }

  draw() {
    if (!this.isActive) return;

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw the health bar above the enemy if health is less than max health
    if (this.health < this.maxHealth) {
      const healthPercentage = this.health / this.maxHealth;
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.x, this.y - 5, this.width, 3);
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.x, this.y - 5, this.width * healthPercentage, 3);
    }
  }

  // Method to apply damage to the enemy
  takeDamage(amount) {
    if (this.isInvulnerable) return false; // If the enemy is invulnerable, ignore further damage

    this.health -= amount;
    this.isInvulnerable = true;
    this.invulnerableTimer = 20;

    // This mechanism prevents multiple damage in a single moment of time

    if (this.health <= 0) {
      this.isActive = false;
      return true;
    }
    return false;
  }

  // Method to check if the enemy has been hit by an attack (e.g., from the player)
  checkHitCollision(attack) {
    return this.checkCollision(attack);
  }

  die() {
    this.isActive = false;
    // TODO: add a death animation
  }

  isOnGround() {
    return this.y >= window.innerHeight - this.height;
  }

  update(player = null) {  
    if (!this.isActive) return;
  
    if (this.isInvulnerable) {
      this.invulnerableTimer--;
      if (this.invulnerableTimer <= 0) {
        this.isInvulnerable = false;
      }
    }
  
    this.physics.applyGravity(this);
    this.draw();
  }

  // Method to check if the enemy collides with the player or another object
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
