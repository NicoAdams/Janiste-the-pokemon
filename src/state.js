// docs at https://www.npmjs.com/package/storeon
import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
import {segment} from "./segment";

const origin = {x:250,y:250},
length = 40;

const initialTheta = Math.PI/12;
const initialLengthMultiplier = .8;






let angle = store => {
  store.on('@init', () => ({ theta: initialTheta }))
  store.on('setAngle', ({ newTtheta }) => ({ theta: newTtheta }))
}

let lengthMultiplier = store => {
  store.on('@init', () => ({ l: initialLengthMultiplier }))
  store.on('setLengthMultiplier', ({ newL }) => ({ l: newL }))
}

let leaves = store => {
  store.on('@init', () => ({ leaves: [new segment(origin,length, 0),new segment(origin,length, Math.PI/2),new segment(origin,length, Math.PI),new segment(origin,length, -Math.PI/2)] }))
  store.on('generateNewLeaves', () => {
  	let newLeaves = []
  	for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
  		let state = store.get()
  		let branch = state["leaves"][i]
  		let theta = state["theta"]*(.9+Math.random()*.2)
  		let lengthMultiplier = state["l"]*(.9+Math.random()*.2)
  		newLeaves.push(new segment(branch.terminus,branch.length*lengthMultiplier,branch.angle+theta))
  		newLeaves.push(new segment(branch.terminus,branch.length*lengthMultiplier,branch.angle-theta))
  }
  return({leaves: newLeaves})
  
  })
}

let render = store => {
  store.on('@init', () => ({ viewport: null}))
  const assignViewport = (_, viewport) => ({ viewport });
  store.on('assignViewport',assignViewport)

  

  store.on('render', ({  }) => { 
	let ctx = store.get()["viewport"]
	ctx.lineWidth = .1;
	
  	for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
  	let leaf = store.get()["leaves"][i]
  	ctx.moveTo( leaf.x1, leaf.y1);
	ctx.lineTo( leaf.x2, leaf.y2);
  } 
	ctx.stroke();
})
}

let tick = store => {
  store.on('tick', ({}) => {store.dispatch("generateNewLeaves"); store.dispatch("render");})
}


 

export const store = createStoreon([angle,lengthMultiplier,leaves,tick,render, storeonDevtools]);







// tracks direction
const currentDirection = (store) => {
  store.on("@init", () => ({ direction: null }));
  /**
   * @param {string} direction "up" | "down" | "left" | "right" | null
   */
  const changeDirection = (_, direction) => ({ direction });
  store.on("changeDirection", changeDirection);
};


// you'd `import {store} from "./state.js"; const unbindEvent = store.on("  ")`
// working but commented example:
// store.dispatch("changeDirection", "up");
