import { Player } from "./player.js";
import { Goblin } from "./enemies/goblin.js";
import { Collision } from "./collision.js";

class Game {
  constructor() {
    this.canvas = document.querySelector("#game");
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.width = window.innerWidth;
    this.HEIGHT = this.canvas.height = window.innerHeight;
    this.player = new Player(this.ctx);
    this.enemies = [];
    this.collistion = new Collision();
    this.enemies.push(new Goblin(this.ctx, 300, this.HEIGHT - 100));
    this.enemies.push(new Goblin(this.ctx, 300, this.HEIGHT - 100));
    window.onresize = () => this.resize();
  }

  draw() {
    this.player.draw();
  }
  gameOver() {
    console.log("GAME OVER !");
  }

  run() {
    if (this.player.health < 0) {
      this.gameOver();
      return;
    }
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.draw();
    this.player.update();
    
    this.enemies.forEach((enemy, index) => {
      enemy.update(this.player); 
  
      if (this.collistion.checkCollision(this.player, enemy)) {
        if (this.player.state == this.player.STATES.attack) {
          enemy.takeDamage(12);
        }
        this.player.getHit(5);
      }
      if (enemy.health < 0) {
        this.enemies.splice(index, 1);
      }
    });
    requestAnimationFrame(this.run.bind(this));
  }

  resize() {
    this.WIDTH = this.canvas.width = window.innerWidth;
    this.HEIGHT = this.canvas.height = window.innerHeight;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.run();
});
