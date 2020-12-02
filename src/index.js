"use strict";
import Block from './modules/block.js'
import { MAP_WIDTH } from './modules/constants.js'
import Ball from './modules/ball.js';
import Player from './modules/player.js'
var player;
var balls = [];
var map = [];
var upgrades = [];
var canvas;


$( document ).ready(() => {
    canvas = document.getElementById("canvas");
    Start()
})

function Start(){
    player = new Player()
    balls.push(new Ball());
    makeMap()
    canvas.addEventListener("mousemove", e => {
        let mouse = {x: e.clientX, y: e.clientY}
        player.Move(mouse)
    })
    canvas.addEventListener("mousedown", e => {
        balls.forEach(ball => ball.click())
    })
    Update()
}

function makeMap(){
    for (let i = 0; i < map.length; i++) {
        map.pop()
    }
    for (let i = 0; i < MAP_WIDTH; i++) {
        for (let j = 0; j < 10; j++) {
            map.push(new Block(i, j))
        }
    }
}

function Update(){
    ResizeCanvas()
    let ctx = canvas.getContext("2d")
    // fill blank all
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // updates
    balls.forEach(ball => {
        let obs = [player]
        obs = obs.concat(map.flat())
        obs = obs.flat()
        ball.Update(player, obs)
    })
    upgrades.forEach(u => {
        u.Update(player)
    })
    // draws
    balls.forEach(ball => {
        ball.Draw(ctx)
    })
    map.forEach(block => {
        block.Draw(ctx)
    })
    upgrades.forEach(u => {
        u.Draw(ctx)
    })
    player.Draw(ctx)

    // garbage collector
    // balls
    balls = balls.filter(ball => ball.isAlive())
    // blocks
    map = map.filter(block => {
        if(block.isAlive())
            return true
        else{
            block.Destroy(map, upgrades)
            return false
        }
    })
    // Upgrades
    upgrades = upgrades.filter(upgrade => {
        if(upgrade.isAlive()){
            return true
        }
        else{
            upgrade.Destroy(player)
            return false
        }
    })
    // Game state
    if(balls.length <= 0) {
        player.Die()
        balls.push(new Ball())
    }
    if(!player.isAlive()) {
        player.Init()
        makeMap()
    }

    requestAnimationFrame(Update)
}

function ResizeCanvas(){
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 8;
}