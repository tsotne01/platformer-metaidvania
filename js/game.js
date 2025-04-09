import { Player } from "./player.js";
import { Goblin } from "./enemies/goblin.js";
import { Collision } from "./collision.js";
import { Object } from "./Object.js";

class Game {
  constructor() {
    this.canvas = document.querySelector("#game");
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.width = window.innerWidth;
    this.HEIGHT = this.canvas.height = window.innerHeight;

    this.player = new Player(this.ctx);
    this.enemies = [];
    this.platforms = []; // Array for platforms
    this.collision = new Collision();
    this.platforms.push(new Object(this.ctx, 200, this.HEIGHT - 300, 200, 70, "#fffff"));
    this.platforms.push(new Object(this.ctx, 900, this.HEIGHT - 200, 200, 70, "#fffff"));
    // Add enemies
    this.enemies.push(new Goblin(this.ctx, 300, this.HEIGHT - 150));
    this.enemies.push(new Goblin(this.ctx, 600, this.HEIGHT - 150));

    // Add simple rectangular platforms
    // this.platforms = [
    //   // { x: 0, y: this.HEIGHT - 50, width: this.WIDTH, height: 50, color: '#2e8b57' }
    //   {
    //     x: 200,
    //     y: this.HEIGHT - 200,
    //     width: 200,
    //     height: 20,
    //     color: "#2e8b57",
    //   }, // Platform 1
    //   {
    //     x: 500,
    //     y: this.HEIGHT - 300,
    //     width: 200,
    //     height: 20,
    //     color: "#2e8b57",
    //   }, // Platform 2
    //   {
    //     x: 100,
    //     y: this.HEIGHT - 400,
    //     width: 150,
    //     height: 20,
    //     color: "#2e8b57",
    //   }, // Platform 3
    // ];

    this.lastTime = 0;
    window.onresize = () => this.resize();
  }

  draw(deltaTime) {
    // Draw platforms (simple rectangles)
    this.platforms.forEach((platform) => {
      this.ctx.fillStyle = platform.color;
      this.ctx.fillRect(
        platform.x,
        platform.y,
        platform.width,
        platform.height
      );
    });

    // Draw player
    this.player.draw(deltaTime);
  }

  gameOver() {
    console.log("GAME OVER!");
  }

  run(timestamp = 0) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    if (this.player.health < 0) {
      this.gameOver();
      return;
    }

    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    this.player.update();
    this.draw(deltaTime);

    // Platform collision detection
    this.platforms.forEach((platform) => {
      if (
        this.player.x < platform.x + platform.width &&
        this.player.x + this.player.width > platform.x &&
        this.player.y < platform.y + platform.height &&
        this.player.y + this.player.height > platform.y
      ) {
        // Collision from top
        if (
          this.player.velocityY > 0 &&
          this.player.y + this.player.height < platform.y + platform.height / 2
        ) {
          this.player.y = platform.y - this.player.height -1;
          this.player.velocityY = 0;
          this.player.isJumping = false;
        }
        // Collision from bottom
        else if (this.player.velocityY < 0) {
          this.player.y = platform.y + platform.height + 1;
          this.player.velocityY = 0;
        }
        // Collision from left
        else if (this.player.velocityX > 0) {
          this.player.x = platform.x - this.player.width - 1;
          this.player.velocityX = 0;
        }
        // Collision from right
        else if (this.player.velocityX < 0) {
          this.player.x = platform.x + platform.width + 1;
          this.player.velocityX = 0;
        } else {
          this.player.velocityX = 2;
          this.player.velocityY = 2;
        }
      }
    });

    // Enemy logic
    this.enemies.forEach((enemy, index) => {
      enemy.update(this.player);

      if (this.collision.checkCollision(this.player, enemy)) {
        if (this.player.state === this.player.STATES.attack) {
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

    // Update platform positions on resize
    this.platforms = [
      {
        x: 0,
        y: this.HEIGHT - 50,
        width: this.WIDTH,
        height: 50,
        color: "#2e8b57",
      },
      {
        x: 200,
        y: this.HEIGHT - 200,
        width: 200,
        height: 20,
        color: "#2e8b57",
      },
      {
        x: 500,
        y: this.HEIGHT - 300,
        width: 200,
        height: 20,
        color: "#2e8b57",
      },
      {
        x: 100,
        y: this.HEIGHT - 400,
        width: 150,
        height: 20,
        color: "#2e8b57",
      },
    ];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.run();
});
