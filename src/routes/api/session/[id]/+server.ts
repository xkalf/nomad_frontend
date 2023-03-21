import db from '$lib/db'
import type { RequestHandler } from './$types'
import { NODE_ENV } from '$env/static/private'

export const GET: RequestHandler = async ({ params: { id }, cookies }) => {
	const session = await db.session.findFirst({
		where: {
			id: +id
		},
		include: {
			solves: {
				orderBy: {
					createdAt: 'asc'
				}
			}
		}
	})

	cookies.set('sessionId', id, {
		path: '/',
		secure: NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30 * 12 * 10
	})
	return new Response(JSON.stringify({ session }))
}

export const DELETE: RequestHandler = async ({ params: { id } }) => {
	const [session, solves] = await db.$transaction([
		db.session.findUnique({ where: { id: +id } }),
		db.solve.findMany({ where: { sessionId: +id } })
	])

	if (!session) {
		return new Response(JSON.stringify({ success: false, error: 'Session олдсонгүй.' }))
	}

	if (session.main === true) {
		return new Response(
			JSON.stringify({ success: false, error: 'Үндсэн session устгах боломжгүй.' })
		)
	}

	const { id: sessionId, ...sessionRest } = session

	await db.$transaction([
		db.sessionDeleted.create({
			data: { sessionId, ...sessionRest }
		}),
		db.solveDeleted.createMany({
			data: [
				...solves.map(i => {
					const { id, ...rest } = i
					return { solveId: id, ...rest }
				})
			]
		}),
		db.solve.deleteMany({
			where: { sessionId: +id }
		}),
		db.session.delete({
			where: { id: +id }
		})
	])

	return new Response(JSON.stringify({ success: true }))
}
