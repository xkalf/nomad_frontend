import type { RequestHandler } from './$types'
import db from '$lib/db'
import { cubeTypeMapper } from '$lib/utils/types'
import type { CubeType } from '@prisma/client'
import { NODE_ENV } from '$env/static/private'

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const cube = url.searchParams.get('cube') as CubeType

	const sessions = await db.session.findMany({
		where: {
			userId: locals.user.id,
			cube
		},
		orderBy: [
			{
				main: 'desc'
			},
			{
				name: 'desc'
			}
		],
		include: {
			_count: {
				select: {
					solves: true
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
			secure: NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30 * 12 * 10
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
