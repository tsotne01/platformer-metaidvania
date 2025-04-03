import { Player } from "./player.js";

class Game {
  constructor() {
    this.canvas = document.querySelector("#game");
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.width = window.innerWidth;
    this.HEIGHT = this.canvas.height = window.innerHeight;
    this.player = new Player(this.ctx);
  }

  draw() {
    this.player.draw();
  }

  update() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.player.update();
    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }

  resize() {
    this.WIDTH = this.canvas.width = window.innerWidth;
    this.HEIGHT = this.canvas.height = window.innerHeight;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.update();
  window.onresize = ()=>game.resize();
});
