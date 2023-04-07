import db from '$lib/db'
import type { Prisma } from '@prisma/client'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params: { id } }) => {
	const deletedSolves = await db.solveDeleted.findMany({
		where: {
			sessionId: +id
		}
	})

	const formatted = deletedSolves.map((i): Prisma.SolveCreateManyInput => {
		const { solveId, ...rest } = i

		return { ...rest, id: solveId }
	})

	await db.$transaction([
		db.solve.createMany({
			data: formatted
		}),
		db.solveDeleted.deleteMany({
			where: {
				sessionId: +id
			}
		})
	])
	return new Response(JSON.stringify({ success: true }))
}
