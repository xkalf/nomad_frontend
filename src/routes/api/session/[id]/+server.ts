import db from '$lib/db'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params: { id } }) => {
	const session = await db.session.findFirst({
		where: {
			id: +id,
			deleted: null
		},
		include: {
			solves: {
				orderBy: {
					createdAt: 'asc'
				},
				where: {
					deleted: null
				}
			}
		}
	})

	return new Response(JSON.stringify({ session }))
}

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	const session = await db.session.findUnique({ where: { id: +id } })

	if (!session) {
		return new Response(JSON.stringify({ success: false, error: 'Session олдсонгүй.' }))
	}

	if (session.main === true) {
		return new Response(
			JSON.stringify({ success: false, error: 'Үндсэн session устгах боломжгүй.' })
		)
	}

	await db.session.update({
		where: { id: +id },
		data: {
			deleted: new Date()
		}
	})

	return new Response(JSON.stringify({ success: true }))
}
