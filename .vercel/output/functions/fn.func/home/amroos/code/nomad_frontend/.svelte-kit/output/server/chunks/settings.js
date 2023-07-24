import { w as writable } from "./index2.js";
const settings = writable();
const setSettings = (s) => {
  settings.set(s);
};
export {
  settings as a,
  setSettings as s
};
