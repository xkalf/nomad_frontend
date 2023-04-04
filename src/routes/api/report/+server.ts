import db from '$lib/db'
import { formatTime } from '$lib/utils/timer-utils'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('userId')
	const sessions = await db.solve.findMany({
		where: {
			session: {
				userId: parseInt(userId || '1')
			}
		},
		include: {
			session: {
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

	return new Response(JSON.stringify(sessions.map(i => ({ ...i, time: formatTime(i) }))))
}
