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

<div class="grid h-screen grid-cols-2">
	<div class="bg-black" />
	<div class="grid-rows-[minmax(50px, 70px),_3fr,_1fr] grid p-3">
		<div class="flex justify-end">
			<button class="max-h-[50px] rounded-md bg-[#121315] p-2 text-white"> MN </button>
		</div>
		<div class="mx-auto flex w-4/5 flex-col">
			<div class="flex flex-col items-center">
				<img src={RubikLogo} alt="rubik logo" class="w-1/6 rounded-full p-4 shadow-lg" />
				<img src={NomadLogo} alt="nomad logo" />
				<p class="text-center text-xs text-black">
					Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна
				</p>
			</div>
			<!-- Form -->
			<form class="mt-4 flex flex-col items-center gap-6" action="/login" method="POST">
				<div class="relative w-4/5 text-black">
					<input
						class="w-full content-center rounded-lg py-5 px-10 align-top drop-shadow-lg focus:text-black"
						type="email"
						placeholder="и-мэйл"
						name="email"
						autocomplete="email"
						bind:this={emailEl}
					/>
				</div>
				<div class="relative flex w-4/5 items-center text-black">
					<input
						class="w-full content-center rounded-lg py-5 px-10 align-top drop-shadow-lg focus:text-black"
						type={showPassword ? 'text' : 'password'}
						placeholder="нууц үг"
						autocomplete="current-password"
						name="password"
					/>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span class="absolute right-0 cursor-pointer" on:click={toggleShowPassword}>
						{#if showPassword}
							<Icon icon="bx:show" width="30" color="#c4c4c4" />
						{:else}
							<Icon icon="bx:hide" width="30" color="#c4c4c4" />
						{/if}
					</span>
				</div>
				<div class="relative flex w-4/5 justify-between text-black">
					<div class="flex gap-2">
						<input
							type="checkbox"
							class="mt-1 h-4 w-4 appearance-none rounded-full border border-[#d2d4da] checked:bg-[#d2d4da]"
							id="remember"
						/>
						<label for="remember" class="cursor-pointer">Намайг санах </label>
					</div>
					<a href="/forgot-password" class="text-black underline"> Нууц үг мартсан? </a>
				</div>
				<p class="w-4/5 text-red-500">{form?.message || ''}</p>
				<div class="relative w-4/5 text-[#cecfd5]">
					<input
						type="submit"
						class="w-full rounded-lg bg-black p-4 text-white drop-shadow"
						value="Нэвтрэх"
					/>
					<button class="mt-4 w-full rounded-lg bg-white p-4 drop-shadow">
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
