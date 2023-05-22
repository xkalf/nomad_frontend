<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import { page } from '$app/stores'
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import Icon from '@iconify/svelte'
	import { z } from 'zod'

	const input = 'w-full border-4 border-[#e7e7e7] p-4 pl-14 focus:outline-none'
	const icon = 'absolute top-1/2 left-4 -translate-y-1/2 text-3xl'

	let error: undefined | string

	const registerSchema = z.object({
		firstname: z
			.string()
			.min(2, { message: 'Нэр 2-оос дээш урттай байх ёстой.' })
			.trim()
			.transform(i => i.toLocaleLowerCase()),
		lastname: z
			.string()
			.min(2, { message: 'Овог 2-оос дээш урттай байх ёстой.' })
			.trim()
			.transform(i => i.toLocaleLowerCase()),
		password: z.string().min(8, { message: 'Нууц үг 8-аас дээш урттай байна.' }),
		email: z.string().email({ message: 'Буруу мэйл хаяг байна.' }),
		phone: z.string().length(8, { message: 'Утасны дугаар буруу байна.' }),
		birthdate: z.string().transform(i => new Date(i)),
		gender: z.enum(['Male', 'Female'])
	})

	const submit: SubmitFunction = ({ data, cancel }) => {
		const schema = registerSchema.safeParse(Object.fromEntries(data))

		if (!schema.success) {
			error = schema.error.issues[0].message
			cancel()
		}
	}
</script>

<svelte:head>
	<title>Бүртгүүлэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="flex h-full flex-col p-4 md:p-3">
		<img src={horizontalLogo} alt="logo" width="200" class="mx-auto mt-8" />
		<div class="mx-auto mt-8 w-4/5">
			<form
				action="?/register"
				use:enhance={submit}
				method="POST"
				class="flex flex-col gap-2 text-2xl text-primary"
			>
				<label for="firstname">Нэр</label>
				<div class="relative">
					<input name="firstname" id="firstname" type="text" class={input} required />
					<Icon class={icon} icon="fa-solid:id-card" />
				</div>
				<label for="lastname">Овог</label>
				<div class="relative">
					<input name="lastname" type="text" id="lastname" class={input} required />
					<Icon class={icon} icon="fa-solid:id-card" />
				</div>
				<label for="email">Мэйл</label>
				<div class="relative">
					<input
						name="email"
						type="email"
						id="email"
						class={input}
						value={$page.data.session?.user.email || ''}
					/>
					<Icon class={icon} icon="clarity:email-solid" />
				</div>
				<label for="password">Нууц үг</label>
				<div class="relative">
					<input class={input} name="password" id="password" required type="password" />
					<Icon class={icon} icon="fa-solid:lock" />
				</div>
				<label for="phone">Утас</label>
				<div class="relative">
					<input name="phone" type="text" id="phone" required class={input} />
					<Icon class={icon} icon="material-symbols:phone-in-talk-rounded" />
				</div>
				<div class="flex gap-2">
					<div class="flex w-1/2 flex-col gap-2">
						<label for="birthdate">Төрсөн өдөр</label>
						<div class="relative">
							<input name="birthdate" type="date" id="birthdate" required class={input} />
							<Icon class={icon} icon="clarity:date-solid" />
						</div>
					</div>
					<div class="flex w-1/2 flex-col gap-2">
						<label for="gender">Хүйс</label>
						<div class="relative">
							<select name="gender" required class={input + ' py-[18px]'}>
								<option value="Male">Эрэгтэй</option>
								<option value="Female">Эмэгтэй</option>
							</select>
							<Icon class={icon} icon="material-symbols:person" />
						</div>
					</div>
				</div>
				<button class="mt-2 rounded bg-primary p-4 py-2 text-white" type="submit">Бүртгүүлэх</button
				>
			</form>
			{#if error}
				<p class="mt-2 text-right text-2xl text-red-500">{error}</p>
			{/if}
		</div>
	</div>
	<div class="hidden bg-primary md:block" />
</div>
