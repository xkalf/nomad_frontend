import type { RequestHandler } from './$types'
import db from '$lib/db'
import { cubeTypeMapper, type CubeType } from '$lib/utils/types'

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const cube = url.searchParams.get('cube') as CubeType

	const sessions = await db.session.findMany({
		where: {
			userId: locals.user.id,
			deleted: null,
			cube
		},
		orderBy: {
			name: 'asc'
		},
		include: {
			_count: {
				select: {
					solves: {
						where: {
							deleted: null
						}
					}
				}
			}
		}
	})

	if (sessions.length === 0) {
		const newSession = await db.session.create({
			data: {
				userId: locals.user.id,
				main: true,
				name: cubeTypeMapper[cube],
				cube
			},
			include: {
				_count: {
					select: {
						solves: true
					}
				}
			}
		})
		cookies.set('sessionId', newSession.id.toString(), {
			path: '/',
			secure: process.env.NODE_ENV === 'production'
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
