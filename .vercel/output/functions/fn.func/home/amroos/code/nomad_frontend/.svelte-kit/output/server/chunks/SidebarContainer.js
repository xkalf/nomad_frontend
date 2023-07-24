import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "./ssr.js";
import { p as page } from "./stores.js";
import { H as HomeIcon, S as StatsIcon, P as ProfileIcon, a as SettingsIcon } from "./MobileNavbar.js";
const SidebarContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  function getIconColor(route) {
    return route === $page.route.id;
  }
  $$unsubscribe_page();
  return `<div class="hidden max-h-screen flex-col overflow-hidden bg-sidebar p-6 md:flex"><div class="flex justify-between py-4 text-primary"><p class="lowercase">${escape($page.data.user.email)}</p> <form action="/logout" method="POST" data-svelte-h="svelte-xinhov"><button type="submit">Гарах</button></form></div> <div class="flex justify-between px-2"><div class="flex h-14 w-14 items-center justify-center rounded-lg"><a href="/">${validate_component(HomeIcon, "HomeIcon").$$render(
    $$result,
    {
      open: getIconColor("/(app)"),
      isPrimary: true
    },
    {},
    {}
  )}</a></div> <div class="flex h-14 w-14 items-center justify-center rounded-lg">${validate_component(StatsIcon, "StatsIcon").$$render($$result, { isPrimary: true }, {}, {})}</div> <div class="flex h-14 w-14 items-center justify-center rounded-lg">${validate_component(ProfileIcon, "ProfileIcon").$$render($$result, { isPrimary: true }, {}, {})}</div> <div class="flex h-14 w-14 items-center justify-center rounded-lg"><a href="/settings">${validate_component(SettingsIcon, "SettingsIcon").$$render(
    $$result,
    {
      open: getIconColor("/(app)/settings"),
      isPrimary: true
    },
    {},
    {}
  )}</a></div></div> ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  SidebarContainer as S
};
