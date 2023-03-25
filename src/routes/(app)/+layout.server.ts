import db from '$lib/db'
import { cubeTypeMapper, type SessionWithSolvesCount } from '$lib/utils/types'
import type { Session, Settings } from '@prisma/client'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (!locals.session) {
		throw redirect(303, '/login')
	}

	if (!locals.user) {
		throw redirect(303, '/register')
	}

	const getSessions = async () => {
		let session: Session | null = null
		let sessions: SessionWithSolvesCount[]

		if (sessionId) {
			session = await db.session.findFirst({
				where: {
					id: +sessionId,
					userId: locals.user.id
				}
			})
		}

		if (!session) {
			session = await db.session.findFirst({
				where: {
					cube: 'N3',
					main: true,
					userId: locals.user.id
				}
			})
		}

		if (!session) {
			session = await db.session.create({
				data: {
					cube: 'N3',
					name: cubeTypeMapper['N3'],
					main: true,
					userId: locals.user.id
				}
			})
		}

		if (session) {
			cookies.set('sessionId', session.id.toString(), {
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 * 12 * 10
			})

			sessions = await db.session.findMany({
				where: {
					cube: session?.cube,
					userId: locals.user.id
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
						select: { solves: true }
					}
				}
			})

			return { session, sessions }
		}
	}

	const getSettings = async () => {
		let settings: Settings | null
		settings = await db.settings.findFirst({
			where: {
				userId: locals.user.id
			}
		})

		if (!settings) {
			settings = await db.settings.create({
				data: {
					userId: locals.user.id
				}
			})
		}

		return settings
	}

	return {
		user: locals.user,
		getSessions: getSessions(),
		settings: getSettings()
	}
}
