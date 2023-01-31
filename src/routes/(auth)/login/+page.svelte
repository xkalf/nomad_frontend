<script lang="ts">
	import RubikLogo from '$lib/assets/rubik-logo.png'
	import NomadLogo from '$lib/assets/nomad-logo.png'
	import type { ActionData } from './$types'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import Icon from '@iconify/svelte'

	export let form: ActionData
	let showPassword = false

	let emailEl: HTMLInputElement

	function toggleShowPassword() {
		showPassword = !showPassword
	}

	onMount(() => {
		if (browser) {
			emailEl.focus()
		}
	})
</script>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="hidden bg-black md:block" />
	<div class="grid grid-rows-[.1fr,_3fr,_.5fr] p-1 md:grid-rows-[70px,_5fr,_1fr] md:p-3">
		<div class="flex justify-end">
			<button class="max-h-[50px] rounded-md bg-[#121315] p-2 text-white"> MN </button>
		</div>
		<div class="mx-auto flex flex-col md:w-4/5">
			<div class="mx-auto flex w-4/5 flex-col justify-center md:w-full">
				<img src={RubikLogo} alt="rubik logo" class="w-1/6 rounded-full p-4 shadow-lg" />
				<img src={NomadLogo} alt="nomad logo" />
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
						bind:this={emailEl}
					/>
				</div>
				<div class="relative flex w-full items-center px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type={showPassword ? 'text' : 'password'}
						placeholder="нууц үг"
						autocomplete="current-password"
						name="password"
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span class="absolute right-6 cursor-pointer md:right-0" on:click={toggleShowPassword}>
						{#if showPassword}
							<Icon icon="bx:show" width="30" color="#c4c4c4" />
						{:else}
							<Icon icon="bx:hide" width="30" color="#c4c4c4" />
						{/if}
					</span>
				</div>
				<div class="relative flex w-full justify-between px-4 text-black md:w-4/5">
					<div class="flex gap-1 md:gap-2">
						<input
							type="checkbox"
							class="mt-1 h-4 w-4 appearance-none rounded-full border border-[#d2d4da] checked:bg-[#d2d4da]"
							id="remember"
						/>
						<label for="remember" class="cursor-pointer text-xs md:text-base">Намайг санах </label>
					</div>
					<a href="/forgot-password" class="text-xs text-black underline md:text-base">
						Нууц үг мартсан?
					</a>
				</div>
				<p class="w-4/5 text-red-500">{form?.message || ''}</p>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<input
						type="submit"
						class="w-full rounded-lg bg-black p-2 text-white drop-shadow md:p-4"
						value="Нэвтрэх"
					/>
					<button class="mt-4 w-full rounded-lg bg-white p-2 drop-shadow md:p-4">
						login with google
					</button>
				</div>
			</form>
		</div>
		<div class="my-4 self-end">
			<p class="text-center text-[#cecfd5]">
				Бүртгэл хэрэгтэй байна ?
				<a href="/register" class="text-black underline"> БҮРТГҮҮЛЭХ </a>
			</p>
		</div>
	</div>
</div>
