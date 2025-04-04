//# Handles keyboard/controller input

export class InputHandler {
  constructor(target = window) {
    this.target = target;
    this.keyPressed = new Set();
    this.handledKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight","Space"];
    this.addEvenListeners();
  }

  addEvenListeners() {
    this.target.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.addEventListener("keyup", this.handleKeyUpp.bind(this));
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (this.handledKeys.includes(e.code)) {
      this.keyPressed.add(e.code);
    }
  }

  handleKeyUpp(e) {
    e.preventDefault();
    if (e.code) {
      this.keyPressed.delete(e.code);
    }
  }

  getPressedKey(keycode) {
    return this.keyPressed.has(keycode);
  }
  getPressedKeys(){
    return this.keyPressed;
  }
}
