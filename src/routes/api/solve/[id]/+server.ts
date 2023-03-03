import db from '$lib/db'
import type { SolveStatus } from '@prisma/client'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params: { id } }) => {
	const solve = await db.solve.findUnique({
		where: { id: +id },
		include: { twoLookSolve: true, cfopSolve: true }
	})

	return new Response(JSON.stringify({ solve }))
}

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	try {
		const solve = await db.solve.findUnique({
			where: {
				id: +id
			}
		})

		if (!solve) {
			return new Response(JSON.stringify({ success: false, error: 'Эвлүүлэлт олдсонгүй.' }))
		}

		const { id: solveId, ...rest } = solve

		await db.$transaction([
			db.solveDeleted.create({
				data: { solveId, ...rest }
			}),
			db.solve.delete({
				where: { id: +id }
			})
		])

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
