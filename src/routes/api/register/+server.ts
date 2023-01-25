import db from '$lib/db'
import { session_cube_enum } from '@prisma/client'
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
						{ name: '2x2', cube: session_cube_enum.n2x2, main: true },
						{ name: '3x3', cube: session_cube_enum.n3x3, main: true },
						{ name: '4x4', cube: session_cube_enum.n4x4, main: true },
						{ name: '5x5', cube: session_cube_enum.n5x5, main: true },
						{ name: '6x6', cube: session_cube_enum.n6x6, main: true },
						{ name: '7x7', cube: session_cube_enum.n7x7, main: true },
						{ name: 'Megaminx', cube: session_cube_enum.megaminx, main: true },
						{ name: 'Pyraminx', cube: session_cube_enum.pyraminx, main: true },
						{ name: 'Square 1', cube: session_cube_enum.sq1, main: true },
						{ name: 'Clock', cube: session_cube_enum.clock, main: true },
						{ name: '3x3 Blindfold', cube: session_cube_enum.bld3, main: true },
						{ name: '4x4 Blindfold', cube: session_cube_enum.bld4, main: true },
						{ name: '5x5 Blindfold', cube: session_cube_enum.bld5, main: true }
					]
				}
			}
		})
	} catch (error) {
		console.log(error)
	}

	return new Response(JSON.stringify({ success: true }))
}
