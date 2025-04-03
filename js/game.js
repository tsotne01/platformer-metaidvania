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
    this.player.update();
  }

  update() {
    this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    this.draw()
    requestAnimationFrame(this.update.bind(this));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.update();

});
