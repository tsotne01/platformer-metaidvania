import { Enemy } from './base-enemy.js';
import { Animation } from "../animation.js";
import { playerSpiteHeight, playerSpiteWidth } from "../constants.js";

export class Goblin extends Enemy {
    constructor(ctx, x, y) {
        super(ctx, x, y, playerSpiteWidth * 6, playerSpiteHeight * 6, '#aa55ff');
        this.speed = 2;
        this.direction = 1;
        this.moveDistance = 100;
        this.sourceWidth = 16;
        this.sourceHeight = 16;
        this.startX = this.x;
        this.playerImage = new Image();
        this.animation = new Animation(ctx);
        this.reverse = false;
        this.isMoving = false;
        this.STATES = {
            idle: {
                name: "idle",
                frames: 3,
                src: "../assets/enemies sprites/goblin/goblin_idle_anim_strip_4.png",
                speed: 200,
            },
            run: {
                name: "run",
                frames: 5,
                src: "../assets/enemies sprites/goblin/goblin_run_anim_strip_6.png",
                speed: 80,
            },
            dead: {
                name: "dead",
                frames: 5,
                src: "../assets/enemies sprites/goblin/goblin_death_anim_strip_6.png",
                speed: 150,
            },
            gethit: {
                name: "gethit",
                frames: 2,
                src: "../assets/enemies sprites/goblin/goblin_hit_anim_strip_3.png",
                speed: 100,
            },
            attack: {
                name: "attack",
                frames: 3,
                src: "../assets/enemies sprites/goblin/goblin_attack_anim_strip_4.png",
                speed: 70,
            },
        };
        this.state = this.STATES.idle;
        this.loadImage(this.state.src);
        this.health = 100;
        this.maxHealth = 100;
    }

    loadImage(src) {
        this.playerImage = new Image();
        this.playerImage.onload = () => {
            this.imageLoaded = true;
        };
        this.playerImage.src = src;
        this.imageLoaded = false;
    }

    draw(deltaTime) {
        if (!this.isActive || !this.imageLoaded) return;

        this.animation.animate(this, deltaTime, this.reverse);

        if (this.health < this.maxHealth) {
            const healthPercentage = this.health / this.maxHealth;
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.x, this.y - 5, this.width, 3);
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.x, this.y - 5, this.width * healthPercentage, 3);
        }

        if (this.isChasing) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.x, this.y - 10, 10, 5);
        }

        super.draw();
    }

    update(player) {
        if (!this.isActive) return;

        this.isMoving = false;
        
        if (!this.isChasing) {
            this.x += this.speed * this.direction;
            if (Math.abs(this.x - this.startX) > this.moveDistance) {
                this.direction *= -1;
            }
            this.isMoving = true;
            this.reverse = this.direction < 0;
        } else {
            this.isMoving = true;
            this.reverse = this.x > player.x;
        }

        // Update state based on movement
        if (this.isMoving) {
            this.state = this.STATES.run;
        } else {
            this.state = this.STATES.idle;
        }

        if (this.state.src !== this.playerImage.src) {
            this.loadImage(this.state.src);
        }

        super.update(player);
    }
}
