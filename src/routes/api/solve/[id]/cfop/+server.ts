import db from '$lib/db'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, params: { id } }) => {
	const data = await request.json()

	try {
		await db.cfopSolve.upsert({
			where: {
				solveId: +id
			},
			create: { ...data },
			update: { ...data }
		})

		return new Response(JSON.stringify({ success: true }))
	} catch (e) {
		return new Response(JSON.stringify({ success: false, error: e }))
	}
}
