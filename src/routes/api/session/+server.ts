import type { RequestHandler } from './$types'
import db from '$lib/db'
import type { CubeType } from '$lib/utils/enum-adapter'
import { cubeTypeMapper } from '$lib/utils/timer-utils'

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

	if (!session) {
		const newSession = await db.session.create({
			data: {
				userId: locals.user.id,
				main: true,
				cube,
				name: cubeTypeMapper(cube)
			}
		})

		return new Response(JSON.stringify({ session: newSession }))
	}

	return new Response(JSON.stringify({ session }))
}
