<script lang="ts">
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageServerData } from './$types'
	import Icon from '@iconify/svelte'

	export let data: PageServerData
	const { form, errors, enhance, message } = superForm(data.form)

	let isPasswordRecovery = false
	let isShow = false

	$: isPasswordRecovery, message.set(undefined)
</script>

<svelte:head>
	<title>Нэвтрэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="hidden bg-primary md:block" />
	<div class="flex h-full flex-col p-2 md:p-3">
		<div class="relative mx-auto flex flex-grow flex-col justify-center md:w-4/5">
			<div class="mx-auto flex w-4/5 flex-col justify-center md:w-full">
				<div class="mx-auto h-auto w-[30%]">
					<img src={horizontalLogo} alt="rubik logo" />
				</div>
				<p class="mt-2 text-center text-[8px] text-black md:text-xs">Түлхэлт бүр нь мэргэн байг</p>
			</div>
			<!-- Form -->
			<form
				class={`mt-4 flex w-full flex-col items-center gap-4 md:gap-6 ${
					isPasswordRecovery ? 'hidden' : 'block'
				}`}
				action="?/login"
				method="POST"
				use:enhance
			>
				<div class="relative w-full px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="email"
						placeholder="И-мэйл"
						name="email"
						autocomplete="email"
						bind:value={$form.email}
						required
					/>
					{#if $errors.email}
						<small class="text-sm text-red-500">{$errors.email}</small>
					{/if}
					<div class="w-full">
						{#if isShow}
							<input
								class="mt-4 w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
								type="text"
								placeholder="Нууц үг"
								name="password"
								bind:value={$form.password}
								autocomplete="current-password"
							/>
							<Icon icon="md:eye-off" width="25" height="25" class="absolute right-4 top-1/2" />
						{:else}
							<input
								class="mt-4 w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
								type="password"
								placeholder="Нууц үг"
								name="password"
								bind:value={$form.password}
								autocomplete="current-password"
							/>
							<Icon icon="md:eye" width="25" height="25" class="absolute right-4 top-1/2" />
						{/if}
					</div>
					{#if $errors.password}
						<small class="text-sm text-red-500">{$errors.password}</small>
					{:else if $errors._errors && $errors._errors.length > 0}
						<small class="text-sm text-red-500">{$errors._errors[0]}</small>
					{/if}
					<button
						type="button"
						on:click={() => (isPasswordRecovery = true)}
						class="mt-2 block text-sm text-primary">Нууц үг мартсан?</button
					>
				</div>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<button
						type="submit"
						class="w-full rounded-lg bg-primary p-2 text-white drop-shadow md:p-4">Нэвтрэх</button
					>
				</div>
			</form>
			<!-- <form -->
			<!-- 	method="POST" -->
			<!-- 	class={`mt-4 flex w-full flex-col items-center gap-4 md:gap-6 ${ -->
			<!-- 		isPasswordRecovery ? 'hidden' : 'block' -->
			<!-- 	}`} -->
			<!-- > -->
			<!-- 	<div class="flex relative flex-col gap-2 px-4 w-full md:w-4/5"> -->
			<!-- 		<button -->
			<!-- 			formaction="?/oAuth&provider=google" -->
			<!-- 			class="flex gap-2 justify-center items-center p-2 w-full bg-white rounded-lg border border-black md:p-4 drop-shadow" -->
			<!-- 		> -->
			<!-- 			<GoogleIcon /> -->
			<!-- 			Sign in with Google -->
			<!-- 		</button> -->
			<!-- 		<button -->
			<!-- 			formaction="?/oAuth&provider=facebook" -->
			<!-- 			class="flex gap-2 justify-center items-center p-2 w-full bg-white rounded-lg border border-black md:p-4 drop-shadow" -->
			<!-- 		> -->
			<!-- 			<FacebookIcon /> -->
			<!-- 			Sign in with Facebook -->
			<!-- 		</button> -->
			<!-- 	</div> -->
			<!-- </form> -->
			<form
				method="post"
				use:enhance
				action="?/recovery"
				class={`mt-4 flex w-full flex-col items-center gap-4 md:gap-6 ${
					isPasswordRecovery ? 'block' : 'hidden'
				}`}
			>
				<div class="relative w-full px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="email"
						placeholder="И-мэйл"
						name="email"
						autocomplete="email"
						bind:value={$form.email}
						required
					/>
					{#if $errors.email}
						<small class="text-sm text-red-500">{$errors.email}</small>
					{:else if $message}
						<small class="text-sm">{$message}</small>
					{/if}
					<!-- <button -->
					<!-- 	type="submit" -->
					<!-- 	class="p-2 mt-4 w-full text-white rounded-lg md:p-4 bg-primary drop-shadow" -->
					<!-- 	>Нууц үг сэргээх</button -->
					<!-- > -->
					<!-- <button -->
					<!-- 	type="button" -->
					<!-- 	on:click={() => (isPasswordRecovery = false)} -->
					<!-- 	class="p-2 mt-4 w-full bg-white rounded-lg border md:p-4 border-primary text-primary drop-shadow" -->
					<!-- 	>Буцах</button -->
					<!-- > -->
				</div>
			</form>
			<div class="mt-2 flex items-center justify-center space-x-2 text-lg">
				<span class="text-[#CECFD5]">Хаяг байгаа юу? </span>
				<a class="uppercase text-primary underline" href="/register">Бүртгүүлэх</a>
			</div>
		</div>
	</div>
</div>
