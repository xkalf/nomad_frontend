import db from '$lib/db'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('userId')
	const sessions = await db.solve.findMany({
		where: {
			Session: {
				userId: parseInt(userId || '1')
			}
		},
		include: {
			Session: {
				select: {
					name: true,
					cube: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	return new Response(JSON.stringify(sessions))
}
