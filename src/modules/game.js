import Player from './player.js'
import Ball from './ball.js'
import Block from './block.js'
import { MAP_WIDTH } from './constants.js'

export default class Game{
    constructor(canvas){
        this.canvas = canvas

        this.map = []
        this._makeMap()
        this.player = new Player()
        this.balls = []
        this._makeBall()
        this.proyectiles = []
        this.upgrades = []
    }

    _restart(){
        this._makeMap()
        this.player.restart()
        this._makeBall()
    }

    _makeBall(){
        this.balls.push(new Ball())
        this.player.attachBall(this.balls[0])
    }

    _makeMap(){
        for (let i = 0; i < this.map.length; i++) {
            this.map.pop()
        }
        for (let i = 0; i < MAP_WIDTH; i++) {
            for (let j = 0; j < 10; j++) {
                this.map.push(new Block(i, j))
            }
        }
    }

    Move(mouse){
        this.player.Move(mouse)
    }

    Click(){
        this.player.click(this.proyectiles)
    }

    MakeObstacles(){
        let obs = [this.player]
        obs = obs.concat(this.map.flat())
        obs = obs.flat()
        return obs
    }

    Draw(){
        // draws
        let ctx = this.canvas.getContext("2d");
        let draws = [this.player]
        draws = draws.concat(this.map, this.player, this.balls, this.proyectiles, this.upgrades)
        draws.forEach(d => {
            d.Draw(ctx)
        })
    }

    UpdateEntidades(){
        this.player.Update(this.MakeObstacles())
        this.balls.forEach(ball => {
            ball.Update(this.player, this.MakeObstacles())
        })
        this.proyectiles.forEach(p => {
            p.Update(this.map.flat())
        })
        this.upgrades.forEach(u => {
            u.Update(this.player)
        })
    }

    DestroyEntidades(){
        // balls
        this.balls = this.balls.filter(ball => ball.isAlive())
        // blocks
        this.map = this.map.filter(block => {
            if(block.isAlive())
                return true
            else{
                block.Destroy(this.map, this.upgrades, this.balls)
                return false
            }
        })
        // Upgrades
        this.upgrades = this.upgrades.filter(upgrade => {
            if(upgrade.isAlive()){
                return true
            }
            else{
                upgrade.Destroy(this.player)
                return false
            }
        })
        // proyectiles
        this.proyectiles = this.proyectiles.filter(p => {
            if(p.isAlive()){
                return true
            }
            else{
                p.Destroy(this.proyectiles)
                return false
            }
        })
    }

    CheckGameState(){
        if(this.balls.length <= 0) {
            this.player.Die()
            this._makeBall()
        }
        if(!this.player.isAlive()) {
            this._restart()
        }
    }

    Update(){
        this.UpdateEntidades()
        this.DestroyEntidades()
        this.CheckGameState()
        this.Draw()
    }
}