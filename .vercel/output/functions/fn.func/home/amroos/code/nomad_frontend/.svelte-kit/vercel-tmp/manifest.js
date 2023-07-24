export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","icon_192.png","icon_512.png","manifest.json","service-worker.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.a53fc253.js","app":"_app/immutable/entry/app.c2686841.js","imports":["_app/immutable/entry/start.a53fc253.js","_app/immutable/chunks/scheduler.4afb9c7b.js","_app/immutable/chunks/singletons.e5aac8c6.js","_app/immutable/chunks/index.440ffa8a.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/entry/app.c2686841.js","_app/immutable/chunks/_commonjsHelpers.852922b8.js","_app/immutable/chunks/supabase.5962bf10.js","_app/immutable/chunks/scheduler.4afb9c7b.js","_app/immutable/chunks/index.da0d1e51.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js'),
			() => import('../output/server/nodes/11.js')
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/api/report",
				pattern: /^\/api\/report\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/report/_server.ts.js')
			},
			{
				id: "/api/report/[id]",
				pattern: /^\/api\/report\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/report/_id_/_server.ts.js')
			},
			{
				id: "/api/session",
				pattern: /^\/api\/session\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/session/_server.ts.js')
			},
			{
				id: "/api/session/[id]",
				pattern: /^\/api\/session\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/session/_id_/_server.ts.js')
			},
			{
				id: "/api/session/[id]/recover",
				pattern: /^\/api\/session\/([^/]+?)\/recover\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/session/_id_/recover/_server.ts.js')
			},
			{
				id: "/api/session/[id]/reset",
				pattern: /^\/api\/session\/([^/]+?)\/reset\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/session/_id_/reset/_server.ts.js')
			},
			{
				id: "/api/settings",
				pattern: /^\/api\/settings\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/settings/_server.ts.js')
			},
			{
				id: "/api/solve",
				pattern: /^\/api\/solve\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/solve/_server.ts.js')
			},
			{
				id: "/api/solve/[id]",
				pattern: /^\/api\/solve\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/solve/_id_/_server.ts.js')
			},
			{
				id: "/api/solve/[id]/cfop",
				pattern: /^\/api\/solve\/([^/]+?)\/cfop\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/solve/_id_/cfop/_server.ts.js')
			},
			{
				id: "/api/solve/[id]/two-look",
				pattern: /^\/api\/solve\/([^/]+?)\/two-look\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/solve/_id_/two-look/_server.ts.js')
			},
			{
				id: "/fix",
				pattern: /^\/fix\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(auth)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/(auth)/logout/_server.ts.js')
			},
			{
				id: "/(auth)/password-recovery",
				pattern: /^\/password-recovery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/solves",
				pattern: /^\/solves\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
