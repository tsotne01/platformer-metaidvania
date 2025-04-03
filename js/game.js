import { Player } from "./player.js";
import { Goblin } from "./enemies/goblin.js"

class Game {
  constructor() {
    this.canvas = document.querySelector("#game");
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.width = window.innerWidth;
    this.HEIGHT = this.canvas.height = window.innerHeight;
    this.player = new Player(this.ctx);
    this.enemies = [];

    this.enemies.push(new Goblin(this.ctx, 300, this.HEIGHT - 100));
  }

  draw() {
    this.player.draw();
  }
  
  update() {
    this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    this.player.update();
    this.draw();

    this.enemies.forEach(enemy => {
      enemy.update();
      
      if (enemy.checkCollision(this.player)) {
        console.log("Player hit enemy!");
      }
    });
    requestAnimationFrame(this.update.bind(this));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.update();

});
