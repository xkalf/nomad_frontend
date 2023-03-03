import db from '$lib/db'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	try {
		const deletedSolves = await db.solve.findMany({
			where: {
				sessionId: +id
			}
		})

		await db.$transaction([
			db.solveDeleted.createMany({
				data: [
					...deletedSolves.map(i => {
						const { id, ...rest } = i

						return { ...rest, solveId: id }
					})
				]
			}),
			db.solve.deleteMany({
				where: {
					sessionId: +id
				}
			})
		])

		return new Response(JSON.stringify({ success: true }))
	} catch (e) {
		return new Response(JSON.stringify({ success: false }))
	}
}
