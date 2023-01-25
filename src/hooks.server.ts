import db from '$lib/db'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session')

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event)
	}

	// find the user based on the session
	const user = await db.user.findUnique({
		where: { token: session },
		select: { email: true, role: true, id: true }
	})

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			email: user.email,
			role: user.role,
			id: user.id
		}
	}

	// load page as normal
	return await resolve(event)
}
