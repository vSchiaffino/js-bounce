import { MAP_HEIGHT, MAP_WIDTH } from "./constants.js";
import Obstacle from "./obstacle.js";
import { hCollide, lineCircle, wCollide } from './trigonometria.js'

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
        let points = [
            {x: this.x, y: this.y},
            {x: this.x + this.w, y: this.y},
            {x: this.x + this.w, y: this.y + this.h},
            {x: this.x, y: this.y + this.h},
        ]
        // detecting if h o w collide
        if( lineCircle({p1: points[0], p2: points[1]}, ball) || 
            lineCircle({p1: points[2], p2: points[3]}, ball) )
        {
            console.log("collision h: entra: ", ball.ang)
            ball.ang = hCollide(ball.ang)
            console.log("sale: ", ball.ang)
        }
        else{
            console.log("collision w: entra: ", ball.ang)
            ball.ang = wCollide(ball.ang)
            console.log("sale: ", ball.ang)
        }



        // if(ball.y > this.y && this.y + this.h < ball.y){
        // }
        // else{
        //     ball.ang = wCollide(ball.ang)
        // }
        this.Destroy()
    }

    isAlive(){
        return this.alive
    }

    Destroy(){
        this.alive = false
    }
}