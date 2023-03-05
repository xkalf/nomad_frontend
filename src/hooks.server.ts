import db from '$lib/db'
import type { Handle } from '@sveltejs/kit'
import '$lib/supabase'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event)

	event.locals.sb = supabaseClient
	event.locals.session = session

	if (session) {
		const user = await db.user.findFirst({
			where: {
				OR: [{ authId: session.user.id }, { email: session.user.email }]
			}
		})

		if (user) {
			await db.user.update({
				where: {
					id: user.id
				},
				data: {
					authId: session.user.id
				}
			})
			event.locals.user = user
		}
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', 'data-theme="nomad"')
	})
}
