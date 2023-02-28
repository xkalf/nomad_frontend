import db from '$lib/db'
import {
	cubeTypeMapper,
	type MySettings,
	type SessionWithSolves,
	type SessionWithSolvesCount
} from '$lib/utils/types'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const ok = !!locals.user
	const sessionId = cookies.get('sessionId')

	if (!ok) {
		throw redirect(307, '/login')
	}

	const getSessions = async () => {
		let session: SessionWithSolves | null = null
		let sessions: SessionWithSolvesCount[]

		if (sessionId) {
			session = await db.session.findFirst({
				where: {
					id: +sessionId,
					deleted: null
				},
				include: {
					solves: {
						where: { deleted: null }
					}
				}
			})
		}

		if (!session) {
			session = await db.session.findFirst({
				where: {
					deleted: null,
					cube: '333',
					main: true
				},
				include: {
					solves: {
						where: { deleted: null }
					}
				}
			})
		}

		if (!session) {
			session = await db.session.create({
				data: {
					cube: '333',
					name: cubeTypeMapper['333'],
					main: true
				},
				include: {
					solves: true
				}
			})
		}

		if (session) {
			sessions = await db.session.findMany({
				where: {
					cube: session?.cube,
					deleted: null
				},
				include: {
					_count: {
						select: { solves: { where: { deleted: null } } }
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
