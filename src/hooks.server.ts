import db from '$lib/db'
import type { Handle } from '@sveltejs/kit'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	})

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	event.locals.prisma = db

	const session = await event.locals.getSession()

	if (session) {
		try {
			const user = await db.user.findFirstOrThrow({
				where: {
					OR: [{ authId: session.user.id }, { email: session.user.email }]
				}
			})

			if (user) {
				if (!user.authId) {
					await db.user.update({
						where: {
							id: user.id
						},
						data: {
							authId: session.user.id
						}
					})
				}
				event.locals.user = user
			}
		} catch (err) {
			console.log(err)
		}
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', 'data-theme="nomad"'),
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		}
	})
}
