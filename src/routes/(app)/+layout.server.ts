import db from '$lib/db'
import { cubeTypeMapper, type MySettings, type SessionWithSolvesCount } from '$lib/utils/types'
import type { Session } from '@prisma/client'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (!locals.session) {
		throw redirect(303, '/login')
	}

	if (!locals.user) {
		throw redirect(303, '/fix')
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
				secure: process.env.NODE_ENV === 'production'
			})

			sessions = await db.session.findMany({
				where: {
					cube: session?.cube,
					userId: locals.user.id
				},
				orderBy: {
					name: 'asc'
				},
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
		let settings: MySettings | null
		settings = await db.settings.findFirst({
			where: {
				userId: locals.user.id
			},
			include: {
				displaySettings: true,
				timerSettings: true,
				scrambleSettings: true
			}
		})

		if (!settings) {
			settings = await db.settings.create({
				data: {
					userId: locals.user.id,
					displaySettings: {
						create: {}
					},
					timerSettings: {
						create: {}
					},
					scrambleSettings: {
						create: {}
					}
				},
				include: {
					displaySettings: true,
					timerSettings: true,
					scrambleSettings: true
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
