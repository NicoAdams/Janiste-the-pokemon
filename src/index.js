import "./sound"
import {store} from "./state"
const unbind = store.on('changeDirection', (store, direction) => console.log({direction}))
store.dispatch('changeDirection', 'up')
console.log({store})
unbind()