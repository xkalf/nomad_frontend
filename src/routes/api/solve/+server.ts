import type { RequestHandler } from './$types'
import db from '$lib/db'

export const GET: RequestHandler = async ({ url }) => {
	const sessionId = url.searchParams.get('sessionId')

	if (!sessionId) {
		return new Response(JSON.stringify({ success: false }))
	}

	const solves = await db.solve.findMany({
		where: {
			sessionId: Number(sessionId)
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

	if (!solve) {
		return new Response(JSON.stringify({ success: false }))
	}

	return new Response(JSON.stringify(solve))
}

export const DELETE: RequestHandler = async ({ request }) => {
	const data = (await request.json()) as { ids: number[] }

	await db.solve.updateMany({
		where: {
			id: {
				in: data.ids
			}
		},
		data: {
			deleted: new Date()
		}
	})

	return new Response(JSON.stringify({ success: true }))
}
