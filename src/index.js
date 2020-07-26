import "./sound";
import { store } from "./state";
import {select} from "d3"
import "./style.scss"
const gameDiv = document.getElementById("app")
const gameViewport = document.createElement('svg')
gameDiv.appendChild(gameViewport)

const square = () => select('rect').attr('height', 10).attr('width', 10).attr('x', 0).attr('y', 0)
// setTimeout(() => {}, )
console.log(square())
const unbind = store.on("changeDirection", (store, direction) =>
  console.log({ direction })
);

store.dispatch("changeDirection", "up");
console.log({ store });
unbind();
