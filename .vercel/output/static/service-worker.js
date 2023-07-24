const a = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), i = [
  a + "/_app/immutable/assets/vertical-logo.6b01b948.png",
  a + "/_app/immutable/assets/horizontal-logo.d04e909d.webp",
  a + "/_app/immutable/assets/ads.ce7106f4.webp",
  a + "/_app/immutable/assets/timer-logo.37fde3ae.webp",
  a + "/_app/immutable/assets/arrow.2ff7a406.webp",
  a + "/_app/immutable/assets/loading-logo.ccd4282f.webp",
  a + "/_app/immutable/assets/5.91d6925b.css",
  a + "/_app/immutable/assets/10.640da543.css",
  a + "/_app/immutable/assets/4.55e30f4e.css",
  a + "/_app/immutable/assets/0.2fabe3a8.css",
  a + "/_app/immutable/chunks/index.440ffa8a.js",
  a + "/_app/immutable/chunks/singletons.e5aac8c6.js",
  a + "/_app/immutable/chunks/_commonjsHelpers.852922b8.js",
  a + "/_app/immutable/chunks/parse.7d180a0f.js",
  a + "/_app/immutable/chunks/scheduler.4afb9c7b.js",
  a + "/_app/immutable/entry/app.c2686841.js",
  a + "/_app/immutable/entry/start.a53fc253.js",
  a + "/_app/immutable/chunks/environment.60829b93.js",
  a + "/_app/immutable/chunks/navigation.6df6eabc.js",
  a + "/_app/immutable/chunks/settings.a9f0e7d1.js",
  a + "/_app/immutable/chunks/sessions.f42a971b.js",
  a + "/_app/immutable/nodes/2.6310849e.js",
  a + "/_app/immutable/chunks/Loading.922ea4c8.js",
  a + "/_app/immutable/chunks/solves.205925c1.js",
  a + "/_app/immutable/nodes/1.b15f912d.js",
  a + "/_app/immutable/chunks/index.da0d1e51.js",
  a + "/_app/immutable/chunks/each.e59479a4.js",
  a + "/_app/immutable/nodes/11.3d39b531.js",
  a + "/_app/immutable/nodes/8.8b67f427.js",
  a + "/_app/immutable/chunks/index.9fa36a06.js",
  a + "/_app/immutable/chunks/2x2x2.kpuzzle.json-BHTFIME6.4e3bdc4e.js",
  a + "/_app/immutable/chunks/2x2x2.kpuzzle.svg-CYX37VBY.c413c52d.js",
  a + "/_app/immutable/chunks/3x3x3.kpuzzle.svg-5U7LUACF.49bc8095.js",
  a + "/_app/immutable/chunks/fto.kpuzzle.svg-H2RJX6UR.cbbdf211.js",
  a + "/_app/immutable/nodes/3.6f099e57.js",
  a + "/_app/immutable/chunks/redi_cube.kpuzzle.svg-3DWDYE3O.35c60da3.js",
  a + "/_app/immutable/chunks/SidebarContainer.913c624c.js",
  a + "/_app/immutable/chunks/stores.1a771838.js",
  a + "/_app/immutable/chunks/redi_cube.kpuzzle.json-43CP47Z6.4e3ca445.js",
  a + "/_app/immutable/chunks/sq1-hyperorbit.kpuzzle.json-AMXAFQCM.5dc076c2.js",
  a + "/_app/immutable/chunks/kilominx.kpuzzle.svg-ZLRTRUTM.d7e1050d.js",
  a + "/_app/immutable/nodes/10.bcf05d60.js",
  a + "/_app/immutable/chunks/clock.kpuzzle.json-PYHONPBY.289d7e31.js",
  a + "/_app/immutable/chunks/clock.kpuzzle.svg-JSRDCSQF.68844df7.js",
  a + "/_app/immutable/nodes/0.67522c9d.js",
  a + "/_app/immutable/nodes/7.5dbb5759.js",
  a + "/_app/immutable/chunks/3x3x3-ll.kpuzzle.svg-KZNSV76X.4e603eeb.js",
  a + "/_app/immutable/chunks/MobileNavbar.d1a0c3c0.js",
  a + "/_app/immutable/chunks/pyraminx.kpuzzle.svg-UHDZCBET.a39aaa53.js",
  a + "/_app/immutable/chunks/sq1-hyperorbit.kpuzzle.svg-MNHJTJ6V.dd33941a.js",
  a + "/_app/immutable/nodes/6.b61c8523.js",
  a + "/_app/immutable/chunks/Icon.37d97ff6.js",
  a + "/_app/immutable/nodes/9.512d989d.js",
  a + "/_app/immutable/chunks/hammer.546ac84c.js",
  a + "/_app/immutable/chunks/MobileContainer.dc44ef9b.js",
  a + "/_app/immutable/chunks/index.e9cf99c5.js",
  a + "/_app/immutable/nodes/5.6e8c36c5.js",
  a + "/_app/immutable/chunks/index.38d946f2.js",
  a + "/_app/immutable/chunks/supabase.5962bf10.js",
  a + "/_app/immutable/chunks/Solves.1dd92adb.js",
  a + "/_app/immutable/chunks/index.5c1212a0.js",
  a + "/_app/immutable/nodes/4.f1367259.js",
  a + "/_app/immutable/chunks/3d-dynamic-BOMV4HRU.e39a8f1b.js"
], l = [
  a + "/favicon.ico",
  a + "/icon_192.png",
  a + "/icon_512.png",
  a + "/manifest.json"
], b = "1690158640618", m = `cache-${b}`, u = self, n = [
  ...i,
  // the app itself
  ...l
  // everything in `static`
];
u.addEventListener("install", (s) => {
  async function p() {
    await (await caches.open(m)).addAll(n);
  }
  s.waitUntil(p());
});
u.addEventListener("activate", (s) => {
  async function p() {
    for (const e of await caches.keys())
      e !== m && await caches.delete(e);
  }
  s.waitUntil(p());
});
u.addEventListener("fetch", async (s) => {
  if (s.request.method !== "GET")
    return;
  async function p() {
    const e = new URL(s.request.url), t = await caches.open(m);
    if (n.includes(e.pathname))
      return t.match(e.pathname);
    try {
      const c = await fetch(s.request);
      return c.status === 200 && t.put(s.request, c.clone()), c;
    } catch {
      return t.match(s.request);
    }
  }
  s.respondWith(p());
});
