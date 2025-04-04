/** @type {HTMLCanvasElement} */
import { gravity, playerSpiteHeight, playerSpiteWidth } from "./constants.js";
import { InputHandler } from "./input.js";

export class Player {
  constructor(ctx) {
    this.width = playerSpiteWidth * 6;
    this.height = playerSpiteHeight * 6;
    this.ctx = ctx;
    this.x = 0;
    this.y = window.innerHeight - this.height;
    this.speed = 2;
    this.velocityY = 0;
    this.jumpStrenght = 30;
    this.keyHandler = new InputHandler();
    this.playerImage = new Image();
    this.STATES = {
      idle: {
        name: "idle",
        frames: 3,
        src: "../assets/herochar-sprites/herochar_idle_anim_strip_4.png",
      },
      run: {
        name: "run",
        frames: 6,
        src: "../assets/herochar-sprites/herochar_run_anim_strip_6.png",
      },
      dead: {
        name: "dead",
        frames: 3,
        src: "../assets/herochar-sprites/herochar_death_anim_strip_8.png",
      },
      gethit: {
        name: "gethit",
        frames: 3,
        src: "../assets/herochar-sprites/herochar_hit_anim_strip_3.png",
      },
      jumpup: {
        name: "jumpup",
        frames: 4,
        src: "../assets/herochar-sprites/herochar_jump_up_anim_strip_3.png",
      },
      attack: {
        name: "attack",
        frames: 5,
        src: "../assets/herochar-sprites/herochar_attack_anim_strip_4(new).png",
      },
    };
    this.state = this.STATES.idle;
    this.playerImage.src = this.state.src;
    this.currentFrame = 0;
  }

  draw(time) {
    this.ctx.drawImage(
      this.playerImage,
      16 * this.currentFrame,
      0,
      15,
      16,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.currentFrame++;
    if (this.currentFrame >= this.state.frames) this.currentFrame = 0;
  }

  isOnGround() {
    return this.y >= window.innerHeight - this.height;
  }

  changeImageSource(src) {
    this.playerImage.src = src;
  }

  update() {
    if (this.keyHandler.getPressedKey("ArrowLeft")) {
      // change state to runing
      this.state = this.STATES.run;
      this.x = Math.max(0, this.x - this.speed);
    }
    if (this.keyHandler.getPressedKey("ArrowRight")) {
      // change state to runing
      this.state = this.STATES.run;
      this.x = Math.min(window.innerWidth - this.width, this.x + this.speed);
    }
    if (this.keyHandler.getPressedKey("ArrowDown")) {
      //   this.y = Math.min(this.y + this.speed, window.innerHeight - this.height);
    }
    if (this.keyHandler.getPressedKey("ArrowUp") && this.isOnGround()) {
      this.state = this.STATES.jumpup;
      this.velocityY = -this.jumpStrenght;
    }
    if (this.keyHandler.getPressedKey("Space")) {
      this.state = this.STATES.attack;
    }
    if(!this.keyHandler.getPressedKeys().size){
        this.state = this.STATES.idle;
    }
    
    this.changeImageSource(this.state.src);

    this.y += this.velocityY;
    if (!this.isOnGround()) {
      this.speed = 10;
      this.velocityY += gravity;
    } else {
      this.speed = 5;
      this.velocityY = 0;
    }
    if (this.y > window.innerHeight - this.height)
      this.y = window.innerHeight - this.height;
  }
}
