// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PrismaClient, UserRole } from '@prisma/client'
import type { Session, SupabaseClient } from '@supabase/supabase-js'

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
			supabase: SupabaseClient
			getSession(): Promise<Session | null>
			prisma: PrismaClient
		}
		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export {}
