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
	<div class="hidden md:block bg-primary" />
	<div class="flex flex-col p-2 h-full md:p-3">
		<div class="flex flex-col flex-grow justify-center mx-auto md:w-4/5">
			<div class="flex flex-col justify-center mx-auto w-4/5 md:w-full">
				<div class="mx-auto h-auto w-[30%]"><img src={horizontalLogo} alt="rubik logo" /></div>
				<p class="mt-2 text-center text-black md:text-xs text-[8px]">
					Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна
				</p>
			</div>
			<!-- Form -->
			<form
				class="flex flex-col gap-4 items-center mt-4 w-full md:gap-6"
				action="?/recovery"
				method="POST"
				use:enhance
			>
				<div class="relative px-4 w-full text-black md:w-4/5">
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
						name="password-re"
						autocomplete="new-password"
						bind:value={$form['password-re']}
					/>
					{#if $errors['password-re']}
						<small class="text-sm text-red-500">{$errors['password-re']}</small>
					{/if}
				</div>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<button
						type="submit"
						class="p-2 w-full text-white rounded-lg cursor-pointer md:p-4 bg-primary drop-shadow"
						>Нууц үг сэргээх</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
