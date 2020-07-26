import "./sound";
// import { store } from "./state";
import {select} from "d3"
import "./style.scss"
const gameDiv = document.getElementById("app")
const gameViewport = select("#app").append("svg")

const drawLine = (line) => {gameViewport.append("line")
								.attr("x1", line.x1)
								.attr("y1", line.y1)
								.attr("x2", line.x2)
								.attr("y2", line.y2)
								.attr("stroke-width",1)
								.attr("stroke-linecap","round")
								.attr("stroke", "black");
							}

function line(origin, length, angle) {
	this.origin = origin

	this.length = length
	this.angle = angle
	this.x1 = origin.x
	this.y1 = origin.y
	this.x2 = origin.x+length*Math.cos(angle)
	this.y2 = origin.y+length*Math.sin(angle)
	this.terminus = {x:this.x2,y:this.y2}
}



let startX = 0
let startY = 0
let endX = 300
let endY = 300
let oldList = [new line({x:startX,y:startY},100,Math.PI/4)]
const tick = () => {
	let L = oldList.length
	for (var i = L - 1; i >= 0; i--) {
		let l = oldList[0]
		let len = Math.sqrt((l.x2-l.x1)**2+(l.y2-l.y1)**2)/1.77
		let angle = Math.atan2(l.y2-l.y1,l.x2-l.x1)
		let r = Math.random()
		oldList.push(new line({x:l.x2,y:l.y2},len,angle+Math.PI*r/5))
		oldList.push(new line({x:l.x2,y:l.y2},len,angle-Math.PI*r/5))
		oldList.shift()
	}
	for (var i = oldList.length - 1; i >= 0; i--) {
		drawLine(oldList[i])
	}
	if (oldList.length>2048)
	{
		clearInterval(myVar);
	}
	

}
let myVar = setInterval(tick, 100);