// docs at https://www.npmjs.com/package/storeon
import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

// tracks direction
const currentDirection = (store) => {
  store.on("@init", () => ({ direction: null }));
  /**
   * @param {string} direction "up" | "down" | "left" | "right" | null
   */
  const changeDirection = (_, direction) => ({ direction });
  store.on("changeDirection", changeDirection);
};

export const store = createStoreon([currentDirection, storeonDevtools]);
// you'd `import {store} from "./state.js"; const unbindEvent = store.on("  ")`
// working but commented example:
store.dispatch("changeDirection", "up");
