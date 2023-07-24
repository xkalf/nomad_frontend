import { w as writable } from "./index2.js";
const solves = writable([]);
function addSolves(solve) {
  solves.update((state) => [...state, solve]);
}
function initialSolves(s) {
  solves.set(s);
}
function deleteSolves(id) {
  solves.update((state) => state.filter((i) => i.id !== id));
}
function deleteSolvesMany(ids) {
  solves.update((state) => state.filter((i) => !ids.includes(i.id)));
}
function resetSolves() {
  solves.update(() => []);
}
export {
  addSolves as a,
  deleteSolves as b,
  deleteSolvesMany as d,
  initialSolves as i,
  resetSolves as r,
  solves as s
};
