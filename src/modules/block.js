import { MAP_HEIGHT, MAP_WIDTH } from "./constants.js";
import Obstacle from "./obstacle.js";
import { hCollide, wCollide } from './trigonometria.js'

export default class Block extends Obstacle{
    constructor(x, y) {
        super()
        this.w = window.innerWidth / MAP_WIDTH
        this.h = window.innerHeight / MAP_HEIGHT

        this.x = x * this.w
        this.y = y * this.h
        this.alive = true
    }

    Draw(ctx){
        ctx.fillStyle = "red"
        ctx.strokeStyle = "orange"
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.strokeRect(this.x, this.y, this.w, this.h)
    }

    Collide(ball) {
        // detecting if h o w collide
        if(ball.y > this.y && this.y + this.h < ball.y){
            ball.ang = hCollide(ball.ang)
        }
        else{
            ball.ang = wCollide(ball.ang)
        }
        this.Destroy()
    }

    isAlive(){
        return this.alive
    }

    Destroy(){
        this.alive = false
    }
}