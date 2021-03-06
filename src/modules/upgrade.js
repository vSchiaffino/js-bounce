import { FALL_VELOCITY, UPGRADE_COLOR, UPGRADE_H, UPGRADE_W } from "./constants.js"
import { rectRect } from "./trigonometria.js"

export default class Upgrade{
    constructor(pos, type){
        this.x = pos.x
        this.y = pos.y
        this.w = UPGRADE_W
        this.h = UPGRADE_H
        this.alive = true
        this.type = type
    }

    isAlive(){
        return this.alive
    }

    Draw(ctx){
        ctx.fillStyle = UPGRADE_COLOR
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    Update(player){
        // move
        this.y += FALL_VELOCITY
        // collide
        if(rectRect(this, player)){
            this.Die()
        }
    }

    Die(){
        this.alive = false
    }

    Destroy(player){
        // mejorar player
        if(this.type === "c"){
            player.Control_pu()
        }
        else if(this.type === "e"){
            player.Extend_pu()
        }
        else if(this.type === "l"){
            player.Laser_pu()
        }
    }
}