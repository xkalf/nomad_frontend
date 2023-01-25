import type { RequestHandler } from './$types'
import db from '$lib/db'
import type { CubeType } from '$lib/utils/enum-adapter'

export const GET: RequestHandler = async ({ locals, url }) => {
	const cube = url.searchParams.get('cube') as CubeType

	const session = await db.session.findFirst({
		where: {
			userId: locals.user.id,
			main: true,
			cube
		},
		include: {
			solves: {
				orderBy: {
					createdAt: 'asc'
				},
				where: {
					deleted: null
				}
			}
		}
	})

	return new Response(JSON.stringify({ session }))
}
