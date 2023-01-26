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

<div class="h-screen grid grid-cols-2">
	<div class="bg-black" />
	<div class="grid grid-rows-[minmax(50px, 70px),_3fr,_1fr] p-3">
		<div class="flex justify-end">
			<button class="rounded-md bg-[#121315] p-2 text-white max-h-[50px]"> MN </button>
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
			<form class="flex mt-4 flex-col items-center gap-6" action="?/login" method="POST">
				<div class="relative w-4/5 text-black">
					<input
						class="drop-shadow-lg py-5 align-top content-center rounded-lg w-full px-10 focus:text-black"
						type="email"
						placeholder="и-мэйл"
						name="email"
						bind:this={emailEl}
					/>
				</div>
				<div class="relative w-4/5 text-black flex items-center">
					<input
						class="drop-shadow-lg py-5 align-top content-center rounded-lg w-full px-10 focus:text-black"
						type={showPassword ? 'text' : 'password'}
						placeholder="нууц үг"
						name="password"
					/>
					<button class="absolute right-0" on:click|preventDefault={toggleShowPassword}>
						<Icon icon="bx:show" width="30" color="#c4c4c4" />
					</button>
				</div>
				<div class="relative w-4/5 text-black flex justify-between">
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
				<p class="text-red-500 w-4/5">{form?.message || ''}</p>
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
