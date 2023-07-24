import { c as create_ssr_component, d as add_attribute } from "./ssr.js";
const arrow = "/_app/immutable/assets/arrow.2ff7a406.webp";
const loadingLogo = "/_app/immutable/assets/loading-logo.ccd4282f.webp";
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { loading = false } = $$props;
  let { fix = false } = $$props;
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.fix === void 0 && $$bindings.fix && fix !== void 0)
    $$bindings.fix(fix);
  return `<div${add_attribute("class", `absolute top-0 left-0 z-40 h-screen w-full backdrop-blur-sm ${loading ? "block" : "hidden"}`, 0)}><div${add_attribute("class", `absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:h-96 md:w-96`, 0)}><img class="absolute top-1/2 left-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 md:w-64"${add_attribute("src", loadingLogo, 0)} alt="loading-logo"> <img${add_attribute("class", `z-0 animate-rotate`, 0)}${add_attribute("src", arrow, 0)} alt="arrow"></div></div> ${fix ? `<h1 class="absolute right-1/2 top-1/2 z-50 w-full translate-y-60 translate-x-1/2 text-4xl text-black" data-svelte-h="svelte-1ctjnv2">Сервэрт засвар хийж байна</h1>` : ``}`;
});
export {
  Loading as L
};
