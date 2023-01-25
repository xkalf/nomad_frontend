import db from '$lib/db'
import type { RequestHandler } from '@sveltejs/kit'
import bcrypt from 'bcrypt'

export const POST: RequestHandler = async event => {
	const data = (await event.request.json()) as {
		firstname: string
		lastname: string
		email: string
		password: string
		birthdate: string
	}

	try {
		await db.user.create({
			data: {
				...data,
				birthdate: new Date(data.birthdate),
				password: await bcrypt.hash(data.password, 10),
				sessions: {
					create: [
						{ name: '2x2', cube: '222', main: true },
						{ name: '3x3', cube: '333', main: true },
						{ name: '4x4', cube: '444', main: true },
						{ name: '5x5', cube: '555', main: true },
						{ name: '6x6', cube: '666', main: true },
						{ name: '7x7', cube: '777', main: true },
						{ name: 'Megaminx', cube: 'minx', main: true },
						{ name: 'Pyraminx', cube: 'pyram', main: true },
						{ name: 'Square 1', cube: 'sq1', main: true },
						{ name: 'Clock', cube: 'clock', main: true },
						{ name: '3x3 Blindfold', cube: '333bf', main: true },
						{ name: '4x4 Blindfold', cube: '444bf', main: true },
						{ name: '5x5 Blindfold', cube: '555bf', main: true }
					]
				}
			}
		})
		return new Response(JSON.stringify({ success: true }))
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify({ success: false }))
	}
}
