import db from '$lib/db'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
	const settings = await db.settings.findFirst({
		where: {
			userId: locals.user.id
		},
		include: {
			displaySettings: true,
			timerSettings: true,
			scrambleSettings: true
		}
	})

	if (settings) {
		return new Response(JSON.stringify({ settings }))
	}

	const newSettings = await db.settings.create({
		data: {
			userId: locals.user.id,
			displaySettings: {
				create: {}
			},
			timerSettings: {
				create: {}
			},
			scrambleSettings: {
				create: {}
			}
		},
		include: {
			displaySettings: true,
			timerSettings: true,
			scrambleSettings: true
		}
	})

	return new Response(JSON.stringify({ settings: newSettings }))
}
