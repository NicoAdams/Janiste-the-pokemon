import {select} from "d3"
import {store} from "./state.js"

import "./style.scss"

import "./sound"

const gameDiv = document.getElementById("app")

const canvas  = document.createElement("canvas");
canvas.width = 1000
canvas.height = 1000
gameDiv.appendChild(canvas)
const ctx = canvas.getContext('2d');
store.dispatch("assignViewport", ctx);


// let w = gameViewport.node().getBoundingClientRect().width
// let h = gameViewport.node().getBoundingClientRect().height
// let startX = w/2
// let startY = h/2


let counter = 0
let interval = window.setInterval(function(){store.dispatch("tick");counter+=1},100)
window.setInterval(function(){if (counter>11) {counter = 0;window.clearInterval(interval);console.log(store.get())}},100)
