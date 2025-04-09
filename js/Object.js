

export class Object {
    constructor(ctx,x,y,w,h,color){
        this.y = y;
        this.x = x;
        this.width = w;
        this.height = h;
        this.ctx = ctx;
        this.color = color;
    }

    draw(){
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.restore();
    }
}