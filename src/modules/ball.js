import { BALL_ACELLERATION } from "./constants.js"
import { fillCircle } from "./draws.js"
import { circleRect, descomponerMov, hCollide, lineCircle, wCollide } from'./trigonometria.js'

export default class Ball{
    constructor(ang, pos){
        this.alive = true
        this.ang = ang || 0
        this.vel = 9
        this.x = pos?.x || innerWidth / 2
        this.y = pos?.y || 0
        this.r = 5

        this.attached = false
    }

    disattach(){
        this.attached = false
    }

    attach(){
        this.attached = true
    }

    Update(player, obstacles){
        if(this.attached){
            
        }
        else{
            let parts = Math.floor(this.vel)
            let colisiono = false;
            for (let i = 0; i < parts; i++) {
                const movt = this.vel / parts
                let backup_x = this.x
                let backup_y = this.y
                // movement
                let mov = descomponerMov(movt, this.ang)
                let [mov_x, mov_y] = mov
                this.x += mov_x
                this.y += mov_y
                // limites
                if(this.y + this.r>= window.innerHeight){
                    this.Die()
                    colisiono = true
                }
                if(this.x + this.r >= window.innerWidth || 
                    this.x - this.r <= 0){
                        this.Colision("w", backup_x, backup_y)
                        colisiono = true
                    }
                else if(this.y - this.r <= 0 )
                {
                    this.Colision("h", backup_x, backup_y)
                    colisiono = true
                }
                // colliders
                for (let i = 0; i < obstacles.length; i++) {
                    const ob = obstacles[i];
                    if(ob.shape === "poly"){
                        let points = ob.GetPoints()
                        let actual = 0;
                        points.forEach(point => {
                            let next = actual + 1;
                            next = next === points.length ? 0 : next
                            let next_p = points[next]
                            if(lineCircle({p1: point, p2: next_p}, this)){
                                let type = actual === 0 || actual === 2 ? "h" : "w"
                                this.Colision(ob, backup_x, backup_y, type)
                                colisiono = true
                            }
                            ++actual;
                        });
                        if(circleRect(this, ob)) {
                            this.Colision(ob, backup_x, backup_y);
                            colisiono = true
                        }
                    }
                    else if(ob.shape === "rect"){
                        if(circleRect(this, ob)) {
                            this.Colision(ob, backup_x, backup_y);
                            colisiono = true
                        }
                    }
                }
                if(colisiono)
                    break
            }
                
            }
    }

    Colision(collider, backup_x, backup_y, type){
        this.vel += BALL_ACELLERATION
        if (collider === "h"){
            this.ang = hCollide(this.ang)
        }
        else if(collider === "w"){
            this.ang = wCollide(this.ang)
        }
        else {
            // Player o obstaculo
            collider.Collide(this, type)
        }
        this.x = backup_x
        this.y = backup_y
    }

    Draw(ctx){
        fillCircle(this.x, this.y, this.r, "green", ctx)
    }

    Die(){
        this.alive = false;
    }

    isAlive(){
        return this.alive;
    }

    click(){
        this.attached = false;
    }
}