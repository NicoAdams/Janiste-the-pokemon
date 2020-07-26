import {select} from "d3"
import {store} from "./state.js"

import "./style.scss"

import "./sound"

const gameDiv = document.getElementById("app")
const gameViewport = select("#app").append("svg")
store.dispatch("assignViewport", gameViewport);


let w = gameViewport.node().getBoundingClientRect().width
let h = gameViewport.node().getBoundingClientRect().height
let startX = w/2
let startY = h/2



// console.log(store.get())
store.dispatch("tick")
store.dispatch("tick")
store.dispatch("tick")
store.dispatch("tick")
store.dispatch("tick")
store.dispatch("tick")