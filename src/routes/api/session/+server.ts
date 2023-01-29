import type { RequestHandler } from './$types'
import db from '$lib/db'
import type { CubeType } from '$lib/utils/enum-adapter'
import { cubeTypeMapper } from '$lib/utils/timer-utils'

export const GET: RequestHandler = async ({ locals, url }) => {
	const cube = url.searchParams.get('cube') as CubeType

	const sessions = await db.session.findMany({
		where: {
			userId: locals.user.id,
			deleted: null,
			main: true,
			cube
		}
	})

	if (sessions.length === 0) {
		const newSession = await db.session.create({
			data: {
				userId: locals.user.id,
				main: true,
				cube,
				name: cubeTypeMapper(cube)
			}
		})

		return new Response(JSON.stringify({ sessions: [newSession] }))
	}

	return new Response(JSON.stringify({ sessions }))
}
