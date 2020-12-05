import Obstacle from "./obstacle.js"

export default class Player extends Obstacle{
    constructor(){
        super()
        this.w = 100
        this.h = 20
        this.shape = "rect"
        this.upgrade = "c"

        this.attachedBalls = []

        this.Init()
    }

    click(){
        this.attachedBalls.forEach(b => {
            this.attachedBalls.pop()
            b.disattach()

            this.PushBall(b)
        })
    }

    attachBall(ball){
        this.attachedBalls.push(ball)
        ball.attach()
    }

    Init() {
        this.lifes = 3
        this.setDefaultPos()
    }

    setDefaultPos(){
        this.x = window.innerWidth / 2
        this.y = window.innerHeight - 50
    }

    Collide(ball) {
        if(this.upgrade === "c"){
            this.attachBall(ball)
        }
        else if (this.upgrade === ""){
            this.PushBall(ball)
        }
    }

    PushBall(ball){
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
        if(mouse.x + this.w / 2 > window.innerWidth) mouse.x = window.innerWidth - this.w / 2;
        if(mouse.x >= 0 && mouse.x + this.w / 2 <= window.innerWidth){
            this.x = mouse.x - this.w / 2
        }
    }

    // Power ups
    Extend_pu(){
        let n = 20
        
        this.w += n
        this.x -= n / 2
    }

    Life_pu(){
        this.lifes += 1
    }
}