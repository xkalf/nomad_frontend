import db from '$lib/db'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	try {
		await db.solve.updateMany({
			where: {
				sessionId: +id
			},
			data: {
				deleted: new Date()
			}
		})

		return new Response(JSON.stringify({ success: true }))
	} catch (e) {
		console.log(e)
		return new Response(JSON.stringify({ success: false }))
	}
}
