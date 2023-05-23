<script lang="ts">
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import FacebookIcon from '$lib/icons/FacebookIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageServerData } from './$types'

	export let data: PageServerData
	const { form, errors, enhance, message } = superForm(data.form)

	let isPasswordRecovery = false

	$: isPasswordRecovery, message.set(undefined)
</script>

<svelte:head>
	<title>Нэвтрэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="hidden md:block bg-primary" />
	<div class="flex flex-col p-2 h-full md:p-3">
		<div class="flex relative flex-col flex-grow justify-center mx-auto md:w-4/5">
			<div class="flex flex-col justify-center mx-auto w-4/5 md:w-full">
				<div class="mx-auto h-auto w-[30%]">
					<img src={horizontalLogo} alt="rubik logo" />
				</div>
				<p class="mt-2 text-center text-black md:text-xs text-[8px]">
					Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна
				</p>
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
				<div class="relative px-4 w-full text-black md:w-4/5">
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
					<input
						class="mt-4 w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="password"
						placeholder="Нууц үг"
						name="password"
						bind:value={$form.password}
						autocomplete="current-password"
					/>
					{#if $errors.password}
						<small class="text-sm text-red-500">{$errors.password}</small>
					{/if}
					<button
						type="button"
						on:click={() => (isPasswordRecovery = true)}
						class="block mt-2 text-sm text-primary">Нууц үг мартсан?</button
					>
				</div>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<button
						type="submit"
						class="p-2 w-full text-white rounded-lg md:p-4 bg-primary drop-shadow">Нэвтрэх</button
					>
				</div>
			</form>
			<form
				method="POST"
				class={`mt-4 flex w-full flex-col items-center gap-4 md:gap-6 ${
					isPasswordRecovery ? 'hidden' : 'block'
				}`}
			>
				<div class="flex relative flex-col gap-2 px-4 w-full md:w-4/5">
					<button
						formaction="?/oAuth&provider=google"
						class="flex gap-2 justify-center items-center p-2 w-full bg-white rounded-lg border border-black md:p-4 drop-shadow"
					>
						<GoogleIcon />
						Sign in with Google
					</button>
					<button
						formaction="?/oAuth&provider=facebook"
						class="flex gap-2 justify-center items-center p-2 w-full bg-white rounded-lg border border-black md:p-4 drop-shadow"
					>
						<FacebookIcon />
						Sign in with Facebook
					</button>
				</div>
			</form>
			<form
				method="post"
				use:enhance
				action="?/recovery"
				class={`mt-4 flex w-full flex-col items-center gap-4 md:gap-6 ${
					isPasswordRecovery ? 'block' : 'hidden'
				}`}
			>
				<div class="relative px-4 w-full text-black md:w-4/5">
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
					<button
						type="submit"
						class="p-2 mt-4 w-full text-white rounded-lg md:p-4 bg-primary drop-shadow"
						>Нууц үг сэргээх</button
					>
					<button
						type="button"
						on:click={() => (isPasswordRecovery = false)}
						class="p-2 mt-4 w-full bg-white rounded-lg border md:p-4 border-primary text-primary drop-shadow"
						>Буцах</button
					>
				</div>
			</form>
			<div class="absolute bottom-4 left-1/2 text-lg -translate-x-1/2">
				<span class="text-[#CECFD5]">Хаяг байгаа юу? </span>
				<a class="underline uppercase text-primary" href="/register">Бүртгүүлэх</a>
			</div>
		</div>
	</div>
</div>
