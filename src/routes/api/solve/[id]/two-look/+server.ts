import db from '$lib/db'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params: { id } }) => {
	const twoLook = await db.twoLookSolve.findUnique({
		where: { solveId: +id }
	})
	return new Response(JSON.stringify(twoLook))
}

export const POST: RequestHandler = async ({ request, params: { id } }) => {
	const data = await request.json()
	try {
		await db.twoLookSolve.upsert({
			where: {
				solveId: +id
			},
			create: { ...data, solveId: +id },
			update: { ...data, solveId: +id }
		})

		return new Response(JSON.stringify({ success: true }))
	} catch (e) {
		return new Response(JSON.stringify({ success: false, error: e }))
	}
}
