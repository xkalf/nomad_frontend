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
	const solve = await db.solve.create({
		data: {
			...(await request.json())
		}
	})

	if (!solve) {
		return new Response(JSON.stringify({ success: false }))
	}

	return new Response(JSON.stringify(solve))
}
