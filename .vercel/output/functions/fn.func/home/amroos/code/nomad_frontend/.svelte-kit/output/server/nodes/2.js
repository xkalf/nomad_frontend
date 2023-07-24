import * as server from '../entries/pages/(app)/_layout.server.ts.js';

export const index = 2;
export const component = async () => (await import('../entries/pages/(app)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.6310849e.js","_app/immutable/chunks/scheduler.4afb9c7b.js","_app/immutable/chunks/index.da0d1e51.js","_app/immutable/chunks/Loading.922ea4c8.js","_app/immutable/chunks/sessions.f42a971b.js","_app/immutable/chunks/index.440ffa8a.js","_app/immutable/chunks/settings.a9f0e7d1.js","_app/immutable/chunks/solves.205925c1.js"];
export const stylesheets = [];
export const fonts = [];
