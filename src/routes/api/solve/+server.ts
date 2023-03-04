import type { RequestHandler } from './$types'
import db from '$lib/db'

export const GET: RequestHandler = async ({ url }) => {
	const sessionId = url.searchParams.get('sessionId')

	if (!sessionId) {
		return new Response(JSON.stringify({ success: false }))
	}

	const solves = await db.solve.findMany({
		where: {
			sessionId: +sessionId
		},
		orderBy: {
			createdAt: 'asc'
		}
	})
	return new Response(JSON.stringify({ success: true, solves }))
}

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json()

	const solve = await db.solve.create({
		data: {
			...data
		}
	})

	return new Response(JSON.stringify(solve))
}

export const DELETE: RequestHandler = async ({ request }) => {
	const data = (await request.json()) as { ids: number[] }
	const solves = await db.solve.findMany({
		where: {
			id: {
				in: data.ids
			}
		}
	})

	await db.$transaction([
		db.solveDeleted.createMany({
			data: [
				...solves.map(i => {
					const { id, ...rest } = i
					return { solveId: id, ...rest }
				})
			]
		}),
		db.solve.deleteMany({
			where: {
				id: {
					in: data.ids
				}
			}
		})
	])

	return new Response(JSON.stringify({ success: true }))
}
