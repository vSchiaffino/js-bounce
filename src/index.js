"use strict";
import Game from './modules/game.js';
var canvas;
var game;

$( document ).ready(() => {
    canvas = document.getElementById("canvas");
    Start()
})

function Start(){
    game = new Game(canvas)
    // Controller
    canvas.addEventListener("mousemove", e => {
        let mouse = {x: e.clientX, y: e.clientY}
        game.Move(mouse)
    })
    canvas.addEventListener("mousedown", e => {
        game.Click()
    })
    // starting loop
    Update()
}

function Update(){
    ResizeCanvas()
    game.Update()

    requestAnimationFrame(Update)
}

function ResizeCanvas(){
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 8;
}