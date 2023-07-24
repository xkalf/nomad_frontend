import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 3;
export const component = async () => (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.6f099e57.js","_app/immutable/chunks/scheduler.4afb9c7b.js","_app/immutable/chunks/index.da0d1e51.js"];
export const stylesheets = [];
export const fonts = [];
