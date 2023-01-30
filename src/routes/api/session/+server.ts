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
			cube
		}
	})

	if (sessions.length === 0) {
		const newSession = await db.session.create({
			data: {
				userId: locals.user.id,
				main: true,
				name: cubeTypeMapper[cube],
				cube
			}
		})

		return new Response(JSON.stringify({ sessions: [newSession] }))
	}

	return new Response(JSON.stringify({ sessions }))
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const input = (await request.json()) as {
		name: string
		cube: CubeType
	}

	const session = await db.session.create({
		data: {
			...input,
			userId: locals.user.id
		},
		include: {
			solves: true
		}
	})

	return new Response(JSON.stringify({ session }))
}
