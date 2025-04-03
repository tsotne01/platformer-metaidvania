//# Handles keyboard/controller input

export class InputHandler {
  constructor(target = window) {
    this.target = target;
    this.keyPressed = new Set();
    this.addEvenListeners();
  }

  addEvenListeners() {
    this.target.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.addEventListener("keyup", this.handleKeyUpp.bind(this));
  }

  handleKeyDown(e) {
    if (e.code) {
      this.keyPressed.add(e.code);
    }
    e.preventDefault();
  }

  handleKeyUpp(e) {
    // console.log(e.code);
    if (e.code) {
      this.keyPressed.delete(e.code);
    }
    e.preventDefault();
  }

  getPressedKey(keycode) {
    return this.keyPressed.has(keycode);
  }
}
