//# Handles sprite animations

export class Animation {
  constructor(ctx) {
    this.ctx = ctx;
    this.currentFrame = 0;
    this.character = null;
    this.currentTime = 0;
  }

  animate(character, time) {
    this.character = character;
    this.ctx.drawImage(
      this.character.playerImage,
      this.character.sourceWidth * this.currentFrame,
      0,
      this.character.sourceWidth,
      this.character.sourceHeight,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );
    this.currentTime = time;
    this.currentFrame++;
    if (this.currentFrame >= this.character.state.frames) this.currentFrame = 0;
  }
}
