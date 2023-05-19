// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UserRole } from '@prisma/client'
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import type { Session as SbSession } from '@supabase/supabase-js'

// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				email: string
				role: UserRole
				id: number
			}
			sb: TypedSupabaseClient
			session: SbSession | null
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null
		}
		// interface Platform {}
	}
}

export { }
