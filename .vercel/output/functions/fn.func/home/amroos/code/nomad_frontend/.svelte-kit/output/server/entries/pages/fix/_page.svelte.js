import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { L as Loading } from "../../../chunks/Loading.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Loading, "Loading").$$render($$result, { loading: true, fix: true }, {}, {})}`;
});
export {
  Page as default
};
