import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import "../../chunks/supabase.js";
const app = "";
const logo = "/_app/immutable/assets/vertical-logo.6b01b948.png";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  {
    {
      if (typeof gtag !== "undefined") {
        gtag("config", "G-5BDWRZD9W5", {
          page_title: document.title,
          page_path: $page.url.href
        });
      }
    }
  }
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1bgzy8z_START --><script async src="https://www.googletagmanager.com/gtag/js?id=G-5BDWRZD9W5" data-svelte-h="svelte-7wehjb"><\/script><script data-svelte-h="svelte-r0t49s">window.dataLayer = window.dataLayer || []

		function gtag() {
			dataLayer.push(arguments)
		}

		gtag('js', new Date())
		gtag('config', 'G-5BDWRZD9W5')
	<\/script><meta name="keywords" content="rubik, cube, timer, nomad, team, 3x3"><meta name="og:image"${add_attribute("content", logo, 0)}><meta name="og:title" content="Нүүдэлчин рубик шооны клуб"><meta name="og:type" content="website"><!-- HEAD_svelte-1bgzy8z_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
