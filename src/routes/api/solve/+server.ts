import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, locals: { prisma } }) => {
	const sessionId = url.searchParams.get('sessionId')

	if (!sessionId) {
		error(500, 'Session ID Not found');
	}

	const solves = await prisma.solve.findMany({
		where: {
			sessionId: +sessionId
		},
		orderBy: {
			createdAt: 'asc'
		}
	})
	return new Response(JSON.stringify({ success: true, solves }))
}

export const POST: RequestHandler = async ({ request, locals: { prisma } }) => {
	const data = await request.json()

	const solve = await prisma.solve.create({
		data: {
			...data
		}
	})

	return new Response(JSON.stringify(solve))
}

export const DELETE: RequestHandler = async ({ request, locals: { prisma } }) => {
	const data = (await request.json()) as { ids: number[] }
	const solves = await prisma.solve.findMany({
		where: {
			id: {
				in: data.ids
			}
		}
	})

	await prisma.$transaction([
		prisma.solveDeleted.createMany({
			data: [
				...solves.map(i => {
					const { id, ...rest } = i
					return { solveId: id, ...rest }
				})
			]
		}),
		prisma.solve.deleteMany({
			where: {
				id: {
					in: data.ids
				}
			}
		})
	])

	return new Response(JSON.stringify({ success: true }))
}
