import Ball from "./ball.js";
import { MAP_HEIGHT, MAP_WIDTH } from "./constants.js";
import getBlock from "./helpers.js";
import Obstacle from "./obstacle.js";
import { hCollide, lineCircle, wCollide } from './trigonometria.js'
import Upgrade from "./upgrade.js";

export default class Block extends Obstacle{
    constructor(x, y) {
        super()
        this.shape = "poly"
        this.map_x = x
        this.map_y = y
        this.w = window.innerWidth / MAP_WIDTH
        this.h = window.innerHeight / MAP_HEIGHT

        this.i = x
        this.j = y

        this.x = x * this.w
        this.y = y * this.h

        this.upgrade = ""

        if(Math.random() * 10 <= 2){
            this.destroyEffect = "e"
        }
        else if(Math.random() * 10 <= 2){
            this.destroyEffect = "b"
        }
        else{
            this.destroyEffect = ""
        }

        this.hp = 1
        this.alive = true
    }

    GetPoints(){
        return [
            {x: this.x, y: this.y},
            {x: this.x + this.w, y: this.h},
            {x: this.x + this.w, y: this.y + this.h},
            {x: this.x, y: this.y + this.h},
        ]
    }

    Draw(ctx){
        if(this.destroyEffect === "e"){
            ctx.fillStyle = "magenta"
        }
        else if(this.destroyEffect === "b"){
            ctx.fillStyle = "blue"
        }
        else{
            ctx.fillStyle = "red"
        }
        ctx.strokeStyle = "orange"
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.strokeRect(this.x, this.y, this.w, this.h)
    }

    Collide(ball, type) {
        // detecting if h o w collide
        if( type === "h")
        {
            ball.ang = hCollide(ball.ang)
        }
        else{
            ball.ang = wCollide(ball.ang)
        }
        this.getDamaged(1)
    }

    getDamaged(dmg){
        this.hp -= dmg;
        if(this.hp <= 0){
            this.Die()
        }
    }

    isAlive(){
        return this.alive
    }

    Destroy(map, upgrades, balls){
        // if(Math.random() * 5 >= 4){
        //     upgrades.push(new Upgrade({x: this.x + this.w / 2, y: this.y + this.h / 2}))
        // }
        if(this.upgrade != "") {
            upgrades.push(new Upgrade({x: this.x + this.w / 2, y: this.y + this.h / 2}, this.upgrade))
        }
        if(this.destroyEffect != "") {
            if(this.destroyEffect === "e") {
                let blocksMovToDestruct = [
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [-1, 1],
                    [-1, 0],
                    [-1, -1],
                    [0, -1],
                    [1, -1],
                ]
                blocksMovToDestruct.forEach(mov => {
                    let [movx, movy] = mov
                    let i = this.i + movx,
                        j = this.j + movy;
                    let block = getBlock(i, j, map)
                    block?.Die()
                })
            }
            if(this.destroyEffect === "b") {
                let ang = Math.random() * 80 + 150
                let pos = {x: this.x + this.w / 2, y: this.y + this.h / 2};
                balls.push(new Ball(ang, pos))
            }
        }

    }

    Die(){
        this.alive = false
    }
}