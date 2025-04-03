

class Game {
    constructor(){
        this.canvas = document.querySelector("#game");
        this.ctx = this.canvas.getContext("2d");
        console.log(this.ctx);
    }
}


new Game();