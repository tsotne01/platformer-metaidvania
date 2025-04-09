//# Handles sprite animations

export class Animation {
  constructor(ctx) {
    this.ctx = ctx;
    this.currentFrame = 0;
    this.character = null;
    this.frameTimer = 0;
  }

  animate(character, deltaTime,reverse) {
    if (this.character !== character) {
      this.character = character;
      this.currentFrame = 0;
      this.frameTimer = 0;
    }

    const frameInterval = this.character.state.speed || 100;

    this.frameTimer += deltaTime;
    if (this.frameTimer > frameInterval) {
      this.currentFrame++;
      this.frameTimer = 0;
      if (this.currentFrame >= this.character.state.frames) {
        this.currentFrame = 0;
      }
    }
    this.ctx.save()
    this.ctx.scale(reverse ? -1 : 1,1);
    this.ctx.drawImage(
      this.character.playerImage,
      this.character.sourceWidth * this.currentFrame,
      0,
      this.character.sourceWidth,
      this.character.sourceHeight,
      reverse ? -this.character.x: this.character.x,
      this.character.y,
      reverse ? -this.character.width : this.character.width,
      this.character.height
    );
    this.ctx.restore();
  }
}
