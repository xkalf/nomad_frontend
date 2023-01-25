import db from '$lib/db'
import type { SolveStatus } from '$lib/utils/enum-adapter'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	try {
		await db.solve.delete({
			where: { id: Number(id) }
		})

		return new Response(JSON.stringify({ success: true }))
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify({ success: false }))
	}
}

export const PUT: RequestHandler = async ({ params: { id }, request }) => {
	const { status } = (await request.json()) as { status: SolveStatus }

	try {
		await db.solve.update({
			where: {
				id: Number(id)
			},
			data: {
				status
			}
		})

		return new Response(JSON.stringify({ success: true }))
	} catch (e) {
		console.log(e)
		return new Response(JSON.stringify({ success: false }))
	}
}
