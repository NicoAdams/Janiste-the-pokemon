// docs at https://www.npmjs.com/package/storeon
import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
import { segment } from "./segment";

const origin = { x: 500, y: 1000 },
  length = 100;

const initialTheta = Math.PI / 12;
const initialWidth = 10;
const initialLengthMultiplier = 0.8;

let angle = (store) => {
  store.on("@init", () => ({ theta: initialTheta }));
  store.on("setAngle", ({ newTtheta }) => ({ theta: newTtheta }));
};

let width = (store) => {
  store.on("@init", () => ({ width: initialWidth }));
  const assignwidth = (_, width) => ({ width });
  store.on("assignwidth", assignwidth);
};

let lengthMultiplier = (store) => {
  store.on("@init", () => ({ l: initialLengthMultiplier }));
  store.on("setLengthMultiplier", ({ newL }) => ({ l: newL }));
};

let leaves = (store) => {
  store.on("@init", () => ({
    leaves: [new segment(origin, length, -Math.PI / 2)],
  }));
  store.on("generateNewLeaves", () => {
    let newLeaves = [];
    // console.log(store.get()["leaves"].length);
    for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
      let state = store.get();
      let branch = state["leaves"][i];
      // let theta = state["theta"] * (0.9 + Math.random() * 0.2);
      let theta = state["theta"]
      // let lengthMultiplier = state["l"] * (0.9 + Math.random() * 0.2);
      let lengthMultiplier = state["l"] 
      newLeaves.push(
        new segment(
          branch.terminus,
          branch.length * lengthMultiplier,
          branch.angle + theta
        )
      );
      newLeaves.push(
        new segment(
          branch.terminus,
          branch.length * lengthMultiplier,
          branch.angle - theta
        )
      );
    }
    return { leaves: newLeaves };
  });

  store.on("resetLeaves", () => ({
    leaves: [new segment(origin, length, -Math.PI / 2)],
  }));
};

let render = (store) => {
  store.on("@init", () => ({ viewport: null }));
  const assignViewport = (_, viewport) => ({ viewport });
  store.on("assignViewport", assignViewport);

  store.on("render", ({}) => {
  	let state = store.get()
    let ctx = state["viewport"];
    
    console.log(state["leaves"].length);
     ctx.beginPath();
    for (let i = state["leaves"].length - 1; i >= 0; i--) {
      // console.log(state["leaves"])
      let leaf = state["leaves"][i];
      ctx.moveTo(leaf.x1, leaf.y1);
      ctx.lineTo(leaf.x2, leaf.y2);
      // console.log([leaf.x2, leaf.y2])

    }
    ctx.lineWidth = state["width"];
    ctx.strokeStyle = 'rgb('+Math.random()*255+', ' + Math.random()*255+ ','+Math.random()*255+')';
    ctx.stroke();
    
    
    

    store.dispatch("assignwidth",state["width"]*.9)
  });
};

let tick = (store) => {
  store.on("tick", ({}) => {
    store.dispatch("generateNewLeaves");
    store.dispatch("render");
  });
};

export const store = createStoreon([
  angle,
  lengthMultiplier,
  leaves,
  tick,
  render,
  storeonDevtools,
  width,
]);