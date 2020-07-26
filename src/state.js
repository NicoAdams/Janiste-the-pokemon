// docs at https://www.npmjs.com/package/storeon
import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
import {segment} from "./segment";

const origin = {x:0,y:0},
length = 100;

const initialTheta = Math.PI/5;
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
  store.on('@init', () => ({ leaves: [new segment(origin,length, store.get()["theta"])] }))
  store.on('generateNewLeaves', () => {
  	let newLeaves = []
  	for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
  		let state = store.get()
  		let branch = state["leaves"][i]
  		let theta = state["theta"]
  		let lengthMultiplier = state["l"]
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
  store.on('render', ({  }) => { for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
  	let leaf = store.get()["leaves"][i]
  	console.log(store.get())
  	leaf.render(store.get()["viewport"])
  } })
}

let tick = store => {
  store.on('tick', ({ newL }) => {store.dispatch("generateNewLeaves"); store.dispatch("render")})
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
