import { w as writable } from "./index2.js";
const cubeType = writable("N3");
function setCubeType(c) {
  cubeType.set(c);
}
const session = writable();
function setSession(s) {
  session.set(s);
}
const sessions = writable([]);
function initialSessions(s) {
  sessions.set(s);
}
export {
  setCubeType as a,
  session as b,
  cubeType as c,
  sessions as d,
  initialSessions as i,
  setSession as s
};
