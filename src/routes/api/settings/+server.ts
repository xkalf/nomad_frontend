import db from '$lib/db'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
	const settings = await db.settings.findFirst({
		where: {
			userId: locals.user.id
		}
	})

	if (settings) {
		return new Response(JSON.stringify({ settings }))
	}

	const newSettings = await db.settings.create({
		data: {
			userId: locals.user.id
		}
	})

	return new Response(JSON.stringify({ settings: newSettings }))
}

export const PUT: RequestHandler = async ({ locals, request }) => {
	const formData = await request.json()

	const settings = await db.settings.update({
		where: {
			userId: locals.user.id
		},
		data: { ...formData }
	})

	return new Response()
}
