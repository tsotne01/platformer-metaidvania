export class Physics {
  constructor(gravity) {
    this.gravity = gravity;
  }

  applyGravity(entity) {
    entity.y += entity.velocityY;
    if (!entity.isOnGround()) {
      entity.velocityY += this.gravity;
    } else {
      entity.velocityY = 0;
    }
    if (entity.y > window.innerHeight - entity.height) {
      entity.y = window.innerHeight - entity.height;
    }
  }
}
