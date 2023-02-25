<script lang="ts">
	import horizontalLogo from '$lib/assets/horizontal-logo.png'
	import type { ActionData } from './$types'
	import Icon from '@iconify/svelte'

	export let form: ActionData
	let showPassword = false

	function toggleShowPassword() {
		showPassword = !showPassword
	}
</script>

<svelte:head>
	<title>Нэвтрэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="hidden bg-black md:block" />
	<div class="flex h-full flex-col p-2 md:p-3">
		<div class="flex justify-end">
			<button class="max-h-[50px] rounded-md bg-[#121315] p-2 text-white">MN</button>
		</div>
		<div class="mx-auto flex flex-grow flex-col justify-center md:w-4/5 md:-translate-y-24">
			<div class="mx-auto flex w-4/5 flex-col justify-center md:w-full">
				<img src={horizontalLogo} alt="rubik logo" class="w-full" />
				<p class="text-center text-[8px] text-black md:text-xs">
					Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна
				</p>
			</div>
			<!-- Form -->
			<form
				class="mt-4 flex w-full flex-col items-center gap-4 md:gap-6"
				action="/login"
				method="POST"
			>
				<div class="relative w-full px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="email"
						placeholder="и-мэйл"
						name="email"
						autocomplete="email"
						value={form?.data?.email || ''}
					/>
					{#if form?.errors?.find(i => i.field === 'email')}
						<p class="text-red-500">{form?.errors.find(i => i.field === 'email')?.message}</p>
					{/if}
				</div>
				<div class="relative flex w-full items-center px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type={showPassword ? 'text' : 'password'}
						placeholder="нууц үг"
						autocomplete="current-password"
						value={form?.data?.password || ''}
						name="password"
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span class="absolute right-6 cursor-pointer md:right-4" on:click={toggleShowPassword}>
						{#if showPassword}
							<Icon icon="bx:show" width="30" color="#c4c4c4" />
						{:else}
							<Icon icon="bx:hide" width="30" color="#c4c4c4" />
						{/if}
					</span>
					{#if form?.errors?.find(i => i.field === 'password')}
						<p class="text-red-500">{form?.errors.find(i => i.field === 'password')?.message}</p>
					{/if}
				</div>
				<div class="relative flex w-full justify-between px-4 text-black md:w-4/5">
					<p class="text-red-500">{form?.message || ''}</p>
					<!-- <div class="flex gap-1 md:gap-2">
						<input
							type="checkbox"
							class="mt-1 h-4 w-4 appearance-none rounded-full border border-[#d2d4da] checked:bg-[#d2d4da]"
							id="remember"
						/>
						<label for="remember" class="cursor-pointer text-xs md:text-base">Намайг санах </label>
					</div> -->
					<a href="/forgot-password" class="text-xs text-black underline md:text-base">
						Нууц үг мартсан?
					</a>
				</div>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<input
						type="submit"
						class="w-full rounded-lg bg-black p-2 text-white drop-shadow md:p-4"
						value="Нэвтрэх"
					/>
					<!-- <button class="mt-4 w-full rounded-lg bg-white p-2 drop-shadow md:p-4">
						login with google
					</button> -->
				</div>
			</form>
		</div>
		<div class="mt-auto mb-4">
			<p class="text-center text-[#ccc]">
				Бүртгэл хэрэгтэй байна ?
				<a href="/register" class="text-black underline">БҮРТГҮҮЛЭХ </a>
			</p>
		</div>
	</div>
</div>
