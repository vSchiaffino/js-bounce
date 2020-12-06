import { PROYECTIL_COLOR } from "./constants.js"
import { rectRect } from "./trigonometria.js"

export default class Proyectil{
    constructor(pos, medidas, velocidad){
        this.x = pos.x
        this.y = pos.y
        this.w = medidas.w
        this.h = medidas.h
        
        this.velocidad = velocidad
        this.alive = true
    }

    Update(blocks){
        this.y -= this.velocidad

        blocks.forEach(block => {
            if (rectRect(this, block)){
                this.Collide(block)
                this.Die()
            }
        });
    }

    Collide(block){

    }

    Die(){
        this.alive = false
    }

    Destroy(proyectiles){
        let index = proyectiles.findIndex(e => e === this)
        if(index != -1){
            proyectiles.splice(index, 1)
        }
    }

    Draw(ctx){
        ctx.fillStyle = PROYECTIL_COLOR
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    isAlive(){
        return this.alive
    }
};
