// docs at https://www.npmjs.com/package/storeon
import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";
import { segment } from "./segment";

const origin = { x: 500, y: 1000 },

length = 100;

const initialTheta = Math.PI / 5;
const initialThetaRandomness = .5
const initialWidth = 10;
const initialLength = .7;
const initialLengthRandomness = .5;


let angle = (store) => {
  store.on("@init", () => ({ theta: initialTheta }));
  store.on("@init", () => ({ thetaRandomnes: initialThetaRandomness}));
  store.on("setAngle", ({ newTtheta }) => ({ theta: newTtheta }));
  store.on("setAngleRandomness", ({ newThetaRandomnes }) => ({ thetaRandomnes: newThetaRandomnes }));
};

let width = (store) => {
  store.on("@init", () => ({ width: initialWidth }));
  const assignwidth = (_, width) => ({ width });
  store.on("assignwidth", assignwidth);
};

let lengthMultiplier = (store) => {
  // the "Length" is how much to scale the parent branch length by when generating the child leaf.
  store.on("@init", () => ({ length: initialLength }));
  store.on("@init", () => ({ lengthRandomnes: initialLengthRandomness }));
  store.on("setLength", ({ newL }) => ({ length: newL }));
  store.on("setLengthRandomness", ({ newLengthRandomness }) => ({ lengthRandomness: newLengthRandomness }));
};

let leaves = (store) => {

  store.on("@init", () => ({
    leaves: [new segment(origin, length, -Math.PI / 2)],
  }));
  store.on("generateNewLeaves", () => {
    let newLeaves = [];
    for (var i = store.get()["leaves"].length - 1; i >= 0; i--) {
      let state = store.get();
      let branch = state["leaves"][i];
      console.log(state["lengthRandomnes"])
      let theta = state["theta"]*((1-state["thetaRandomnes"]/2)+Math.random()*state["thetaRandomnes"]);
      let lengthMultiplier = state["length"]*((1-state["lengthRandomnes"]/2)+Math.random()*state["lengthRandomnes"]);
      newLeaves.push(
        new segment(
          branch.terminus,
          branch.length * lengthMultiplier,
          branch.angle + theta
        )
      );
      theta = state["theta"]*((1-state["thetaRandomnes"]/2)+Math.random()*state["thetaRandomnes"]);
      lengthMultiplier = state["length"]*((1-state["lengthRandomnes"]/2)+Math.random()*state["lengthRandomnes"]);
      newLeaves.push(
        new segment(
          branch.terminus,
          branch.length * lengthMultiplier,
          branch.angle - theta
        )
      );
      theta = state["theta"]*((1-state["thetaRandomnes"]/2)+Math.random()*state["thetaRandomnes"]);
      lengthMultiplier = state["length"]*((1-state["lengthRandomnes"]/2)+Math.random()*state["lengthRandomnes"]);
      newLeaves.push(
        new segment(
          branch.terminus,
          branch.length * lengthMultiplier,
          branch.angle
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
    let state = store.get();
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
    ctx.strokeStyle =
      "rgb(" +
      (255 * state["width"]) / 20 +
      ", " +
      (255 * 1) / state["width"] +
      "," +
      Math.random() * 25 +
      ")";
    ctx.stroke();

    store.dispatch("assignwidth", state["width"] * 0.8);
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
