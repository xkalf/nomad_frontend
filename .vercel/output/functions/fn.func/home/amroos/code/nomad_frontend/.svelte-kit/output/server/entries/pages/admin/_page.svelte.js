import { c as create_ssr_component, b as subscribe, f as each, e as escape, v as validate_component, d as add_attribute } from "../../../chunks/ssr.js";
import { CubeType } from "@prisma/client";
import { c as cubeTypeMapper } from "../../../chunks/types.js";
import { b as browser } from "../../../chunks/environment.js";
import { S as Solves, c as Mean } from "../../../chunks/Solves2.js";
import { s as solves, i as initialSolves } from "../../../chunks/solves.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "select.svelte-nujtkw{@apply mb-2 block border py-2 px-4 text-sm font-medium text-gray-900;}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $solves, $$unsubscribe_solves;
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  let { data } = $$props;
  let selected = {
    user: data.users[0],
    cube: "N3",
    session: data.users[0].sessions[0]
  };
  let sessions = [];
  async function getSolves() {
    if (!selected.session || !browser)
      return;
    const data2 = await (await fetch(`/api/session/${selected.session.id}?admin=true`)).json();
    initialSolves(data2.session.solves);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    sessions = selected.user?.sessions.filter((i) => i.cube === selected.cube) || [];
  }
  {
    getSolves();
  }
  $$unsubscribe_solves();
  return `<div class="flex items-center gap-4 p-4 text-xl"><select class="svelte-nujtkw">${each(data.users, (user) => {
    return `<option${add_attribute("value", user, 0)}>${escape(user.firstname)}</option>`;
  })}</select> <select class="svelte-nujtkw">${each(Object.values(CubeType), (cube) => {
    return `<option${add_attribute("value", cube, 0)}>${escape(cubeTypeMapper[cube])}</option>`;
  })}</select> <select class="svelte-nujtkw">${selected.user ? `${each(sessions, (session) => {
    return `<option${add_attribute("value", session, 0)}>${escape(session.name)} (${escape(session._count.solves)})</option>`;
  })}` : ``}</select> <p>Count : ${escape($solves.length)}</p></div> <div class="grid max-h-72 md:grid-cols-2">${validate_component(Solves, "Solves").$$render($$result, { mobile: true, showDate: true }, {}, {})} ${validate_component(Mean, "Mean").$$render($$result, { isOpen: true, isAdmin: true }, {}, {})} </div>`;
});
export {
  Page as default
};
