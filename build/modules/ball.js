import { fillCircle } from "./draws.js"
import { circleRect, descomponerMov, hCollide, wCollide } from'./trigonometria.js'

export default class Ball{
    constructor(){
        this.alive = true
        this.still = true
        this.ang = 30
        this.vel = 9
        this.x = 0
        this.y = 0
        this.r = 5
    }

    Update(player, obstacles){
        if(this.still){
            this.x = player.x + player.w / 2
            this.y = player.y - this.r
        }
        else{
            let backup_x = this.x
            let backup_y = this.y
            // movement
            let mov = descomponerMov(this.vel, this.ang)
            let [mov_x, mov_y] = mov
            this.x += mov_x
            this.y += mov_y
            // limites
            if(this.y + this.r>= window.innerHeight){
                this.Destroy()
            }
            if(this.x + this.r >= window.innerWidth || 
                this.x - this.r <= 0){
                    this.Colision("w", backup_x, backup_y)
                }
            else if(this.y - this.r <= 0 )
            {
                this.Colision("h", backup_x, backup_y)
            }
            // colliders
            for (let i = 0; i < obstacles.length; i++) {
                const ob = obstacles[i];
                if(circleRect(this, ob)) {
                    this.Colision(ob, backup_x, backup_y);
                }
            }
        }
    }

    Colision(collider, backup_x, backup_y){
        if (collider === "h"){
            this.ang = hCollide(this.ang)
        }
        else if(collider === "w"){
            this.ang = wCollide(this.ang)
        }
        else {
            // Player o obstaculo
            collider.Collide(this)
        }
        this.x = backup_x
        this.y = backup_y
    }

    Draw(ctx){
        fillCircle(this.x, this.y, this.r, "green", ctx)
    }

    Destroy(){
        this.alive = false;
    }

    isAlive(){
        return this.alive;
    }

    click(){
        this.still = false;
    }
}