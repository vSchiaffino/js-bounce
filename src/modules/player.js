import Obstacle from "./obstacle.js"

export default class Player extends Obstacle{
    constructor(){
        super()
        this.lifes = 3
        this.setDefaultPos()
        this.w = 100
        this.h = 20
    }

    setDefaultPos(){
        this.x = window.innerWidth / 2
        this.y = window.innerHeight - 50
    }

    Collide(ball) {
        let pos_central = this.x + this.w / 2
        let diff_pos = pos_central - ball.x
        let porc_diff = diff_pos * 100 / (this.w / 2)
        let ang = porc_diff * 60 / 100
        ball.ang = 0 - ang
    }

    Draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    Die() {
        this.lifes -= 1
        this.setDefaultPos()
    }

    isAlive() {
        return !(this.lifes <= 0)
    }

    Update(obstacles){

    }

    Move(mouse){
        if(mouse.x < 0) mouse.x = 0;
        if(mouse.x + this.w > window.innerWidth) mouse.x = window.innerWidth - this.w;
        if(mouse.x >= 0 && mouse.x + this.w <= window.innerWidth){
            this.x = mouse.x
        }
    }
}