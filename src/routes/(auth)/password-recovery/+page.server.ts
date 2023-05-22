import { AuthApiError } from '@supabase/supabase-js'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'
import type { PageServerLoad } from './$types'

const passwordRecoverySchema = z
  .object({
    password: z.string().min(8, {
      message: 'Нууц үг 8-аас дээш урттай байна.'
    }),
    'password-re': z.string()
  })
  .refine(obj => obj.password !== obj['password-re'], {
    message: 'Нууц үг хоорондоо таарахгүй байна.'
  })

export const load: PageServerLoad = async event => {
  const form = await superValidate(event, passwordRecoverySchema)

  return {
    form
  }
}

export const actions: Actions = {
  recovery: async event => {
    const { locals } = event
    const form = await superValidate(event, passwordRecoverySchema)

    if (!form.valid) {
      return fail(400, {
        form
      })
    }

    const { error } = await locals.sb.auth.updateUser({
      email: locals.session?.user.email,
      password: form.data.password
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
