import type { RequestHandler } from './$types'
import db from '$lib/db'
import type { session_cube_enum } from '@prisma/client'

export const GET: RequestHandler = async ({ locals, url }) => {
	const cube = url.searchParams.get('cube') as session_cube_enum

	console.log(cube)

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
				}
			}
		}
	})

	return new Response(JSON.stringify({ session }))
}
