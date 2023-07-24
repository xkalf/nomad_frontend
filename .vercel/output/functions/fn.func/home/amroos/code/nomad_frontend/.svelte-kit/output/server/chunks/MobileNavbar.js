import { c as create_ssr_component, d as add_attribute, e as escape, b as subscribe, v as validate_component } from "./ssr.js";
import { s as solves } from "./solves.js";
import { p as page } from "./stores.js";
const HomeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { isPrimary = false } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.isPrimary === void 0 && $$bindings.isPrimary && isPrimary !== void 0)
    $$bindings.isPrimary(isPrimary);
  return `<svg width="50" height="30" viewBox="-7 -2 50 30"${add_attribute("fill", isPrimary ? "#0B487E" : "white", 0)}${add_attribute("fill-opacity", open ? 1 : 0.5, 0)} preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.7981 0.709584C15.3519 0.379646 15.9681 0.168026 16.6078 0.0880658L17.024 0.0360382C17.4084 -0.0120128 17.7973 -0.0120127 18.1817 0.0360382L18.5749 0.0851915C19.2295 0.167005 19.8592 0.386633 20.4226 0.729591L29.3793 6.1815C30.359 6.77782 31.1963 7.5813 31.8325 8.53556L33.0119 10.3048C33.1449 10.5042 33.0019 10.7712 32.7623 10.7712H2.41269C2.1795 10.7712 2.03547 10.5168 2.15544 10.3169L3.07574 8.78302C3.74381 7.66958 4.67732 6.73899 5.79285 6.07442L14.7981 0.709584ZM2.72028 11.4717C2.22079 11.4717 1.7979 11.8403 1.72966 12.3351L1.02302 17.4582C0.940131 18.0592 1.40703 18.5949 2.01364 18.5949H11.165C11.7173 18.5949 12.165 18.1472 12.165 17.5949V14.4118C12.165 13.8595 12.6127 13.4118 13.165 13.4118H22.4638C23.0161 13.4118 23.4638 13.8595 23.4638 14.4118V17.5949C23.4638 18.1472 23.9115 18.5949 24.4638 18.5949H33.6151C34.2218 18.5949 34.6887 18.0592 34.6058 17.4582L33.8991 12.3351C33.8309 11.8403 33.408 11.4717 32.9085 11.4717H2.72028ZM0.520889 20.2214C0.577159 19.715 1.00522 19.3318 1.51477 19.3318H11.1641C11.7164 19.3318 12.1641 19.7795 12.1641 20.3318V24.9637C12.1641 25.516 11.7164 25.9637 11.1641 25.9637H1.00012C0.404106 25.9637 -0.0595836 25.4457 0.00623483 24.8533L0.520889 20.2214ZM35.1061 20.2214C35.0498 19.715 34.6218 19.3318 34.1122 19.3318H24.4629C23.9106 19.3318 23.4629 19.7795 23.4629 20.3318V24.9637C23.4629 25.516 23.9106 25.9637 24.4629 25.9637H34.6269C35.2229 25.9637 35.6866 25.4457 35.6208 24.8533L35.1061 20.2214ZM12.8911 14.7712C12.8911 14.4375 13.1616 14.1669 13.4954 14.1669H22.0895C22.4232 14.1669 22.6937 14.4375 22.6937 14.7712V24.8424C22.6937 25.4728 22.1827 25.9838 21.5523 25.9838H14.0325C13.4021 25.9838 12.8911 25.4728 12.8911 24.8424V14.7712ZM14.8382 16.5839C14.8382 16.3244 15.0486 16.1139 15.3082 16.1139H20.2767C20.5362 16.1139 20.7467 16.3244 20.7467 16.5839V23.5666C20.7467 23.8262 20.5362 24.0366 20.2767 24.0366H15.3082C15.0486 24.0366 14.8382 23.8262 14.8382 23.5666V16.5839Z"></path></svg>`;
});
const ProfileIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { isPrimary = false } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.isPrimary === void 0 && $$bindings.isPrimary && isPrimary !== void 0)
    $$bindings.isPrimary(isPrimary);
  return `<svg width="29" height="29" viewBox="0 0 29 29"${add_attribute("fill", isPrimary ? "#0B487E" : "white", 0)}${add_attribute("fill-opacity", open ? 1 : 0.5, 0)} xmlns="http://www.w3.org/2000/svg"><path d="M14.5 16.3125C19.0029 16.3125 22.6562 12.6592 22.6562 8.15625C22.6562 3.65332 19.0029 0 14.5 0C9.99707 0 6.34375 3.65332 6.34375 8.15625C6.34375 12.6592 9.99707 16.3125 14.5 16.3125ZM21.75 18.125H18.6291C17.3717 18.7027 15.9727 19.0312 14.5 19.0312C13.0273 19.0312 11.634 18.7027 10.3709 18.125H7.25C3.24551 18.125 0 21.3705 0 25.375V26.2812C0 27.7822 1.21777 29 2.71875 29H26.2812C27.7822 29 29 27.7822 29 26.2812V25.375C29 21.3705 25.7545 18.125 21.75 18.125Z"></path></svg> `;
});
const SettingsIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { isPrimary = false } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.isPrimary === void 0 && $$bindings.isPrimary && isPrimary !== void 0)
    $$bindings.isPrimary(isPrimary);
  return `<svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg"${add_attribute("stroke", isPrimary ? "#0B487E" : "white", 0)}${add_attribute("stroke-opacity", open ? 1 : 0.5, 0)}><path d="M2 10.8473V18.14C2 20.8195 2 20.8195 4.52781 22.5258L11.4793 26.545C12.5283 27.1517 14.2346 27.1517 15.271 26.545L22.2224 22.5258C24.7503 20.8195 24.7503 20.8195 24.7503 18.1527V10.8473C24.7503 8.18048 24.7503 8.18049 22.2224 6.47422L15.271 2.45501C14.2346 1.84833 12.5283 1.84833 11.4793 2.45501L4.52781 6.47422C2 8.18049 2 8.18048 2 10.8473Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.3737 18.2914C15.4678 18.2914 17.1654 16.5938 17.1654 14.4997C17.1654 12.4056 15.4678 10.708 13.3737 10.708C11.2796 10.708 9.58203 12.4056 9.58203 14.4997C9.58203 16.5938 11.2796 18.2914 13.3737 18.2914Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg> `;
});
const StatsIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { isPrimary = false } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.isPrimary === void 0 && $$bindings.isPrimary && isPrimary !== void 0)
    $$bindings.isPrimary(isPrimary);
  return `<svg width="31" height="29" viewBox="0 0 31 29"${add_attribute("fill", isPrimary ? "#0B487E" : "white", 0)}${add_attribute("fill-opacity", open ? 1 : 0.5, 0)} xmlns="http://www.w3.org/2000/svg"><path d="M29.4942 16.2H16.2339L25.065 25.0892C25.4025 25.429 25.9579 25.4566 26.305 25.1275C28.4676 23.0766 29.9552 20.3119 30.3916 17.204C30.4665 16.6719 30.0278 16.2 29.4942 16.2ZM28.6096 12.5549C28.1491 5.83522 22.8146 0.465539 16.1389 0.00203403C15.6292 -0.0334039 15.2001 0.399163 15.2001 0.913294V13.4999H27.7048C28.2156 13.4999 28.6448 13.0679 28.6096 12.5549ZM12.5177 16.2V2.85225C12.5177 2.31506 12.0489 1.87349 11.5208 1.94887C4.86131 2.89613 -0.228995 8.75238 0.00794564 15.7708C0.251592 22.9787 6.41707 28.8895 13.5812 28.799C16.3976 28.7635 19.0001 27.85 21.1398 26.3223C21.5813 26.0073 21.6103 25.3531 21.2275 24.9677L12.5177 16.2Z"></path></svg>`;
});
const SolvesIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = true } = $$props;
  let { count = 0 } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  return `<svg width="50" height="30" viewBox="-6 -1 50 30" fill="white"${add_attribute("fill-opacity", open ? 1 : 0.5, 0)} xmlns="http://www.w3.org/2000/svg"><path d="M17.4158 20.837C17.6582 21.3314 17.4552 21.9347 16.9358 22.1174C16.1584 22.3909 15.3435 22.5501 14.5167 22.5884C13.3571 22.6423 12.1989 22.4572 11.1138 22.0449C10.0287 21.6325 9.03983 21.0017 8.20863 20.1913C7.61596 19.6136 7.11244 18.9534 6.71281 18.2326C6.44583 17.7511 6.6948 17.1652 7.20433 16.9566C7.71387 16.748 8.28977 16.9973 8.57401 17.4688C8.8588 17.9413 9.20347 18.3767 9.60044 18.7636C10.2361 19.3833 10.9922 19.8657 11.822 20.1811C12.6518 20.4964 13.5376 20.6379 14.4243 20.5967C14.9781 20.571 15.5249 20.4745 16.0516 20.3103C16.5772 20.1466 17.1734 20.3426 17.4158 20.837Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M24.4798 14.2468C24.4137 19.91 19.8023 24.4805 14.1234 24.4805C8.40329 24.4805 3.76623 19.8435 3.76623 14.1234C3.76623 8.78286 7.80829 4.38641 13 3.82645V12.7403C13 13.5723 13.6745 14.2468 14.5065 14.2468H24.4798ZM15.3827 0.0553823H36.4935C37.3255 0.0553823 38 0.729863 38 1.56188V12.7403C38 13.5723 37.3255 14.2468 36.4935 14.2468H28.2462C28.1799 21.9901 21.8823 28.2468 14.1234 28.2468C6.32325 28.2468 0 21.9235 0 14.1234C0 6.32325 6.32325 0 14.1234 0C14.5478 0 14.9678 0.018721 15.3827 0.0553823Z"></path><text x="26" y="10"${add_attribute("fill", open ? "black" : "white", 0)} font-size="9" text-anchor="middle" font-weight="bold">${escape(count)}</text></svg>`;
});
const MobileNavbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $solves, $$unsubscribe_solves;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  function getIconColor(route) {
    return route === $page.route.id;
  }
  $$unsubscribe_page();
  $$unsubscribe_solves();
  return `<div class="mt-auto flex h-20 items-center justify-around bg-primary p-4 md:hidden"><a data-sveltekit-preload-data href="/">${validate_component(HomeIcon, "HomeIcon").$$render($$result, { open: getIconColor("/(app)") }, {}, {})}</a> <a data-sveltekit-preload-data href="/solves">${validate_component(SolvesIcon, "SolvesIcon").$$render(
    $$result,
    {
      open: getIconColor("/(app)/solves"),
      count: $solves.length
    },
    {},
    {}
  )}</a> ${validate_component(StatsIcon, "StatsIcon").$$render($$result, {}, {}, {})} ${validate_component(ProfileIcon, "ProfileIcon").$$render($$result, {}, {}, {})} <a data-sveltekit-preload-data href="/settings">${validate_component(SettingsIcon, "SettingsIcon").$$render($$result, { open: getIconColor("/(app)/settings") }, {}, {})}</a></div>`;
});
export {
  HomeIcon as H,
  MobileNavbar as M,
  ProfileIcon as P,
  StatsIcon as S,
  SettingsIcon as a
};
