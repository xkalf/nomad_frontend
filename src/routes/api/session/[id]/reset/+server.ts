import db from '$lib/db'
import type { RequestHandler } from './$types'

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	try {
		const deletedSolves = await db.solve.findMany({
			where: {
				sessionId: +id
			}
		})

		const [cfopSolves, twoLookSolves] = await db.$transaction([
			db.cfopSolve.findMany({
				where: {
					solveId: { in: deletedSolves.map(i => i.id) }
				}
			}),
			db.twoLookSolve.findMany({
				where: {
					solveId: { in: deletedSolves.map(i => i.id) }
				}
			})
		])

		await db.$transaction([
			db.solveDeleted.createMany({
				data: [
					...deletedSolves.map(i => {
						const { id, ...rest } = i

						return { ...rest, solveId: id }
					})
				]
			}),
			db.cfopSolveDeleted.createMany({
				data: [
					...cfopSolves.map(i => {
						const { id: cfopSolveId, ...rest } = i
						return { ...rest, cfopSolveId }
					})
				]
			}),
			db.cfopSolve.deleteMany({
				where: {
					id: { in: cfopSolves.map(i => i.id) }
				}
			}),
			db.twoLookSolveDeleted.createMany({
				data: [
					...twoLookSolves.map(i => {
						const { id: twoLookSolveId, ...rest } = i
						return { ...rest, twoLookSolveId }
					})
				]
			}),
			db.twoLookSolve.deleteMany({
				where: {
					id: { in: twoLookSolves.map(i => i.id) }
				}
			})
		])

		await db.solve.deleteMany({
			where: {
				sessionId: +id
			}
		})

		return new Response(JSON.stringify({ success: true }))
	} catch (e) {
		return new Response(JSON.stringify({ success: false }))
	}
}
