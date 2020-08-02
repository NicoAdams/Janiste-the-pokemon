import { select } from "d3";
import { store } from "./state.js";

import "./style.scss";

import "./sound";

const gameDiv = document.getElementById("app");

const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;
gameDiv.appendChild(canvas);
const ctx = canvas.getContext("2d");
store.dispatch("assignViewport", ctx);

store.dispatch("render");
// let w = gameViewport.node().getBoundingClientRect().width
// let h = gameViewport.node().getBoundingClientRect().height
// let startX = w/2
// let startY = h/2

document.getElementById("tick").onclick = function () {
  store.dispatch("tick");
  // console.log(store.get());
};
document.getElementById("clear").onclick = function () {
  store.dispatch("resetLeaves");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
