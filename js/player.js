import { Animation } from "./animation.js";
import { gravity, playerSpiteHeight, playerSpiteWidth } from "./constants.js";
import { InputHandler } from "./input.js";
import { Physics } from "./rigidBody2d.js";

export class Player {
  constructor(ctx) {
    this.width = playerSpiteWidth * 6;
    this.height = playerSpiteHeight * 6;
    this.sourceWidth = 16;
    this.sourceHeight = 16;
    this.ctx = ctx;
    this.x = 0;
    this.y = window.innerHeight - this.height;
    this.speed = 2;
    this.velocityY = 0;
    this.jumpStrenght = 30;
    this.keyHandler = new InputHandler();
    this.playerImage = new Image();
    this.animation = new Animation(this.ctx);
    this.physics = new Physics(gravity);
    this.color = "#ff0000";
    this.isVulnerable = true;
    this.inVulnerableTime = 10;
    this.health = 100;
    this.maxHealth = 100;

    this.STATES = {
      idle: {
        name: "idle",
        frames: 3,
        src: "../assets/herochar-sprites/herochar_idle_anim_strip_4.png",
        speed: 200,
      },
      run: {
        name: "run",
        frames: 6,
        src: "../assets/herochar-sprites/herochar_run_anim_strip_6.png",
        speed: 80,
      },
      dead: {
        name: "dead",
        frames: 3,
        src: "../assets/herochar-sprites/herochar_death_anim_strip_8.png",
        speed: 150,
      },
      gethit: {
        name: "gethit",
        frames: 3,
        src: "../assets/herochar-sprites/herochar_hit_anim_strip_3.png",
        speed: 100,
      },
      jumpup: {
        name: "jumpup",
        frames: 4,
        src: "../assets/herochar-sprites/herochar_jump_up_anim_strip_3.png",
        speed: 100,
      },
      attack: {
        name: "attack",
        frames: 5,
        src: "../assets/herochar-sprites/herochar_attack_anim_strip_4(new).png",
        speed: 70,
      },
    };

    this.state = this.STATES.idle;
    this.playerImage.src = this.state.src;
  }

  draw(deltaTime) {
    this.animation.animate(this, deltaTime);

    if (this.health < this.maxHealth) {
      const healthPercentage = this.health / this.maxHealth;
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.x, this.y - 5, this.width, 3);
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.x, this.y - 5, this.width * healthPercentage, 3);
    }
  }

  isOnGround() {
    return this.y >= window.innerHeight - this.height;
  }

  changeImageSource(src) {
    this.playerImage.src = src;
  }

  getHit(damage = 1) {
    if (this.isVulnerable && this.health >= 0) {
      this.health -= damage;
    }
    this.isVulnerable = false;
  }

  update() {
    if (this.keyHandler.getPressedKey("ArrowLeft")) {
      this.state = this.STATES.run;
      this.x = Math.max(0, this.x - this.speed);
    }
    if (this.keyHandler.getPressedKey("ArrowRight")) {
      this.state = this.STATES.run;
      this.x = Math.min(window.innerWidth - this.width, this.x + this.speed);
    }
    if (this.keyHandler.getPressedKey("ArrowUp") && this.isOnGround()) {
      this.state = this.STATES.jumpup;
      this.velocityY = -this.jumpStrenght;
    }
    if (this.keyHandler.getPressedKey("Space")) {
      this.state = this.STATES.attack;
    }
    if (!this.keyHandler.getPressedKeys().size) {
      this.state = this.STATES.idle;
    }

    if (!this.isVulnerable) {
      this.inVulnerableTime--;
    }
    if (this.inVulnerableTime <= 0) {
      this.isVulnerable = true;
      this.inVulnerableTime = 20;
    }

    this.changeImageSource(this.state.src);
    this.physics.applyGravity(this);
  }
}
