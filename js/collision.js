//# Collision detection logic

export class Collision {
  constructor() {}

  checkCollision(Entity1, Entity2) {
    return (
      Entity1.x < Entity2.x + Entity2.width &&
      Entity1.x + Entity1.width > Entity2.x &&
      Entity1.y < Entity2.y + Entity2.height &&
      Entity1.y + Entity1.height > Entity2.y
    );
  }
}
