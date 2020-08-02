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
ctx.globalAlpha = 0.7;
store.dispatch("assignViewport", ctx);

store.dispatch("render");

document.getElementById("tick").onclick = function () {
  store.dispatch("tick");
  // console.log(store.get());
};
document.getElementById("clear").onclick = function () {
  store.dispatch("resetLeaves");
  store.dispatch("assignwidth", 10);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  store.dispatch("render");
};
