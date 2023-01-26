import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	register: async ({ request, fetch }) => {
		const { email, password, firstname, lastname, birthdate } = Object.fromEntries(
			await request.formData()
		)

		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				firstname,
				lastname,
				birthdate
			})
		})

		const data = await response.json()

		if (data.success === true) {
			throw redirect(302, '/login')
		}
	}
}
