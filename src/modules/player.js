import Obstacle from "./obstacle.js"
import { hCollide } from "./trigonometria.js"

export default class Player extends Obstacle{
    constructor(){
        super()
        this.x = window.innerWidth / 2
        this.y = window.innerHeight - 50
        this.w = 100
        this.h = 20
    }

    Collide(ball) {
        let pos_central = this.x + this.w / 2
        let diff_pos = pos_central - ball.x
        let porc_diff = diff_pos * 100 / (this.w / 2)
        let ang = porc_diff * 60 / 100
        console.log("quedo: ", ang)
        ball.ang = 0 - ang
    }

    Draw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.w, this.h)
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