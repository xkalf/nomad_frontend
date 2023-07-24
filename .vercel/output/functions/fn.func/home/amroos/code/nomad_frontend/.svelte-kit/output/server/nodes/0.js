import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.67522c9d.js","_app/immutable/chunks/scheduler.4afb9c7b.js","_app/immutable/chunks/index.da0d1e51.js","_app/immutable/chunks/stores.1a771838.js","_app/immutable/chunks/singletons.e5aac8c6.js","_app/immutable/chunks/index.440ffa8a.js","_app/immutable/chunks/supabase.5962bf10.js","_app/immutable/chunks/_commonjsHelpers.852922b8.js","_app/immutable/chunks/navigation.6df6eabc.js"];
export const stylesheets = ["_app/immutable/assets/0.2fabe3a8.css"];
export const fonts = [];
