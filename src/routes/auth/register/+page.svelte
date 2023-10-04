<script lang="ts">
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import Icon from '@iconify/svelte'
	import type { PageServerData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'

	const input = 'w-full border-4 border-[#e7e7e7] p-4 pl-14 focus:outline-none'
	const icon = 'absolute top-1/2 left-4 -translate-y-1/2 text-3xl'

	export let data: PageServerData

	const { form, errors, enhance } = superForm(data.form)
</script>

<svelte:head>
	<title>Бүртгүүлэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="flex h-full flex-col p-4 md:p-3">
		<img src={horizontalLogo} alt="logo" width="200" class="mx-auto mt-8" />
		<div class="mx-auto mt-8 w-4/5 md:p-4">
			<form
				action="?/register"
				use:enhance
				method="POST"
				class="flex flex-col gap-2 text-2xl text-primary"
			>
				<label for="firstname">Нэр</label>
				<div class="relative">
					<input
						bind:value={$form.firstname}
						name="firstname"
						id="firstname"
						type="text"
						class={input}
						required
					/>
					<Icon class={icon} icon="fa-solid:id-card" />
				</div>
				{#if $errors.firstname}
					<small class="text-sm text-red-500">{$errors.firstname}</small>
				{/if}
				<label for="lastname">Овог</label>
				<div class="relative">
					<input
						bind:value={$form.lastname}
						name="lastname"
						type="text"
						id="lastname"
						class={input}
						required
					/>
					<Icon class={icon} icon="fa-solid:id-card" />
				</div>
				{#if $errors.lastname}
					<small class="text-sm text-red-500">{$errors.lastname}</small>
				{/if}
				<label for="email">И-Мэйл хаяг</label>
				<div class="relative">
					<input bind:value={$form.email} name="email" type="email" id="email" class={input} />
					<Icon class={icon} icon="clarity:email-solid" />
				</div>
				{#if $errors.email}
					<small class="text-sm text-red-500">{$errors.email}</small>
				{/if}
				<label for="password">Нууц үг</label>
				<div class="relative">
					<input class={input} name="password" id="password" required type="password" />
					<Icon class={icon} icon="fa-solid:lock" />
				</div>
				{#if $errors.password}
					<small class="text-sm text-red-500">{$errors.password}</small>
				{/if}
				<label for="passwordRe">Нууц үг давтах</label>
				<div class="relative">
					<input class={input} name="passwordRe" id="passwordRe" required type="password" />
					<Icon class={icon} icon="fa-solid:lock" />
				</div>
				{#if $errors.passwordRe}
					<small class="text-sm text-red-500">{$errors.passwordRe}</small>
				{/if}
				<label for="phone">Утас</label>
				<div class="relative">
					<input
						bind:value={$form.phone}
						name="phone"
						type="text"
						id="phone"
						required
						class={input}
					/>
					<Icon class={icon} icon="material-symbols:phone-in-talk-rounded" />
				</div>
				{#if $errors.phone}
					<small class="text-sm text-red-500">{$errors.phone}</small>
				{/if}
				<div class="flex flex-wrap gap-2">
					<div class="flex w-full flex-col gap-2 md:w-1/2">
						<label for="birthdate">Төрсөн өдөр</label>
						<div class="relative">
							<input
								bind:value={$form.birthdate}
								name="birthdate"
								type="date"
								id="birthdate"
								required
								class={input}
							/>
							<Icon class={icon} icon="clarity:date-solid" />
						</div>
						{#if $errors.birthdate}
							<small class="text-sm text-red-500">{$errors.birthdate}</small>
						{/if}
					</div>
					<div class="flex w-full flex-col gap-2 md:w-1/2">
						<label for="gender">Хүйс</label>
						<div class="relative">
							<select bind:value={$form.gender} name="gender" required class={`${input} py-[18px]`}>
								<option value="Male">Эрэгтэй</option>
								<option value="Female">Эмэгтэй</option>
							</select>
							<Icon class={icon} icon="material-symbols:person" />
						</div>
						{#if $errors.gender}
							<small class="text-sm text-red-500">{$errors.gender}</small>
						{/if}
					</div>
				</div>
				{#if $errors._errors && $errors._errors.length > 0}
					<small class="text-sm text-red-500">{$errors._errors[0]}</small>
				{/if}
				<button class="mt-2 rounded bg-primary p-4 py-2 text-white" type="submit">Бүртгүүлэх</button
				>
			</form>
			<div class="mt-2 flex items-center justify-center space-x-2 text-lg">
				<span class="text-[#CECFD5]">Хаяг байгаа юу? </span>
				<a class="uppercase text-primary underline" href="/auth/login">Нэвтрэх</a>
			</div>
		</div>
	</div>
	<div class="hidden bg-primary md:block" />
</div>
