import db from '$lib/db'
import { formatTime, getAvg, getBestAverage } from '$lib/utils/timer-utils'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params: { id } }) => {
	const solves = await db.solve.findMany({
		where: {
			sessionId: +id
		}
	})

	const averages: {
		solves: string[]
		avg: string
	}[] = []

	for (let i = 4; i < solves.length; i++) {
		averages.push({
			solves: solves.slice(i, i + 5).map(i => formatTime(i)),
			avg: getAvg(solves.slice(i, i + 5), 5)
		})
	}

	return new Response(JSON.stringify({ averages, bestAverage: getBestAverage(solves, 5) }))
}
