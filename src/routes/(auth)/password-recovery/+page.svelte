<script lang="ts">
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageServerData } from './$types'

	export let data: PageServerData

	const { form, errors, enhance } = superForm(data.form)
</script>

<svelte:head>
	<title>Нууц үг сэргээх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="hidden bg-primary md:block" />
	<div class="flex h-full flex-col p-2 md:p-3">
		<div class="mx-auto flex flex-grow flex-col justify-center md:w-4/5">
			<div class="mx-auto flex w-4/5 flex-col justify-center md:w-full">
				<div class="mx-auto h-auto w-[30%]"><img src={horizontalLogo} alt="rubik logo" /></div>
				<p class="mt-2 text-center text-[8px] text-black md:text-xs">
					Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна
				</p>
			</div>
			<!-- Form -->
			<form
				class="mt-4 flex w-full flex-col items-center gap-4 md:gap-6"
				action="?/recovery"
				method="POST"
				use:enhance
			>
				<div class="relative w-full px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="password"
						placeholder="Нууц үг"
						name="password"
						autocomplete="new-password"
						bind:value={$form.password}
					/>
					{#if $errors.password}
						<small class="text-sm text-red-500">{$errors.password}</small>
					{/if}
					<input
						class="mt-4 w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="password"
						placeholder="Нууц үг давтах"
						name="passwordRe"
						autocomplete="new-password"
						bind:value={$form.passwordRe}
					/>
					{#if $errors.passwordRe}
						<small class="text-sm text-red-500">{$errors.passwordRe}</small>
					{:else if $errors._errors && $errors._errors.length > 0}
						<small class="text-sm text-red-500">{$errors._errors[0]}</small>
					{/if}
				</div>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<button
						type="submit"
						class="w-full cursor-pointer rounded-lg bg-primary p-2 text-white drop-shadow md:p-4"
						>Нууц үг сэргээх</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
