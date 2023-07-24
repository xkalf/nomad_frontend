import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { L as Loading } from "../../../chunks/Loading.js";
import { s as setSession, a as setCubeType, i as initialSessions } from "../../../chunks/sessions.js";
import { s as setSettings } from "../../../chunks/settings.js";
import { i as initialSolves } from "../../../chunks/solves.js";
let loading = false;
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  setSettings(data.settings);
  if (data.getSessions) {
    setSession(data.getSessions.session);
    initialSolves(data.getSessions.session.solves);
    setCubeType(data.getSessions.session.cube);
    initialSessions(data.getSessions.sessions);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Loading, "Loading").$$render($$result, { loading }, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
