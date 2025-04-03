import { InputHandler } from "./input.js";

export class Player {
  constructor(ctx) {
    this.width = 16*5;
    this.height = 16*5;
    this.ctx = ctx;
    this.x = 0;
    this.y = window.innerHeight - this.height;
    this.speed = 5;
    this.keyHandler = new InputHandler();
    this.playerImage = new Image();
    this.playerImage.src = "../assets/herochar-sprites/herochar_idle_anim_strip_4.png"
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.playerImage,0,0,16,16,this.x, this.y, this.width, this.height)
  }

  update() {
    this.draw();
    if (this.keyHandler.getPressedKey("ArrowLeft")) {
      this.x = Math.max(0, this.x - this.speed);
    }
    if (this.keyHandler.getPressedKey("ArrowRight")) {
      this.x = Math.min(window.innerWidth - this.width, this.x + this.speed);
    }
    if (this.keyHandler.getPressedKey("ArrowDown")) {
      this.y = Math.min(this.y + this.speed, window.innerHeight - this.height);
    }
    if (this.keyHandler.getPressedKey("ArrowUp")) {
      this.y = Math.max(this.y - this.speed, 0);
    }
  }
}
