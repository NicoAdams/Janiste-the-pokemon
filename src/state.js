// docs at https://www.npmjs.com/package/storeon
import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
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
const origin = {x:0,y:0},
length = 100;

const initialTheta = Math.PI/5;
const initialLengthMultiplier = .8;


// tracks direction
const currentDirection = (store) => {
  store.on("@init", () => ({ direction: null }));
  /**
   * @param {string} direction "up" | "down" | "left" | "right" | null
   */
  const changeDirection = (_, direction) => ({ direction });
  store.on("changeDirection", changeDirection);
};



let angle = store => {
  store.on('@init', () => ({ theta: initialTheta }))
  store.on('setAngle', ({ newTtheta }) => ({ theta: newTtheta }))
}

let lengthMultiplier = store => {
  store.on('@init', () => ({ l: initialLengthMultiplier }))
  store.on('setLengthMultiplier', ({ newL }) => ({ l: newL }))
}

let leaves = store => {
  store.on('@init', () => ({ leaves: [new line(origin,length, store.angle)] }))
  store.on('generateNewLeaves', () => {
  	let newLeaves = []
  	for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
  		branch = store.get()["leaves"][i]
  		newLeaves.push(new line(branch.terminus,branch.length*lengthMultiplier,branch.angle+theta))
  		newLeaves.push(new line(branch.terminus,branch.length*lengthMultiplier,branch.angle-theta))
  }
  {leaves: newLeaves}
  })
}

let render = store => {
  store.on('render', ({ newL }) => { for (var i = leaves.length - 1; i >= 0; i--) {
  	leaf = leaves[i]
  	drawLine(leaf)
  } })
}

let tick = store => {
  store.on('tick', ({ newL }) => {store.generateNewLeaves(); store.render()})
}


 

export const store = createStoreon([angle,lengthMultiplier,leaves, storeonDevtools]);
// you'd `import {store} from "./state.js"; const unbindEvent = store.on("  ")`
// working but commented example:
// store.dispatch("changeDirection", "up");
