import { AuthApiError } from '@supabase/supabase-js'
import { fail, redirect, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
  recovery: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
      'password-re': string
    }

    if (body.password !== body['password-re']) {
      return fail(400, {
        error: 'Нууц үг хоорондоо таарахгүй байна.'
      })
    }

    const { error } = await locals.sb.auth.updateUser({
      email: locals.session?.user.email,
      password: body.password
    })

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          error: 'Нууц үг сэргээхэд алдаа гарлаа.'
        })
      }

      return fail(400, {
        error: 'Сервер алдаа гарлаа.'
      })
    }

    throw redirect(303, '/')
  }
}
