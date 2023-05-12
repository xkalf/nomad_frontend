<script lang="ts">
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import FacebookIcon from '$lib/icons/FacebookIcon.svelte'
	import GoogleIcon from '$lib/icons/GoogleIcon.svelte'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<svelte:head>
	<title>Нэвтрэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="hidden bg-primary md:block" />
	<div class="flex h-full flex-col p-2 md:p-3">
		<div class="mx-auto flex flex-grow flex-col justify-center md:w-4/5">
			<div class="mx-auto flex w-4/5 flex-col justify-center md:w-full">
				<img
					src={horizontalLogo}
					alt="rubik logo"
					class="mx-auto mb-4 w-3/5 max-w-xs"
					width="300"
				/>
				<p class="text-center text-[8px] text-black md:text-xs">
					Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна
				</p>
			</div>
			<!-- Form -->
			<form
				class="mt-4 flex w-full flex-col items-center gap-4 md:gap-6"
				action="?/login"
				method="POST"
			>
				<div class="relative w-full px-4 text-black md:w-4/5">
					<input
						class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10"
						type="email"
						placeholder="и-мэйл"
						name="email"
						autocomplete="email"
					/>
					<p>
						{#if form?.error}
							{form.error}
						{:else if form?.success}
							Нэврэх линкийг и-мэйл хаяг руу илгээлээ.
						{/if}
					</p>
				</div>
				<div class="relative w-full px-4 text-[#cecfd5] md:w-4/5">
					<input
						type="submit"
						class="w-full cursor-pointer rounded-lg bg-primary p-2 text-white drop-shadow md:p-4"
						value="Нэвтрэх"
					/>
				</div>
			</form>
			<form method="POST" class="mt-4 flex w-full flex-col items-center gap-4 md:gap-6">
				<div class="relative flex w-full flex-col gap-2 px-4 md:w-4/5">
					<button
						formaction="?/login&provider=google"
						class="flex w-full items-center justify-center gap-2 rounded-lg border border-black bg-white p-2 drop-shadow md:p-4"
					>
						<GoogleIcon />
						Sign in with Google
					</button>
					<button
						formaction="?/login&provider=facebook"
						class="flex w-full items-center justify-center gap-2 rounded-lg border border-black bg-white p-2 drop-shadow md:p-4"
					>
						<FacebookIcon />
						Sign in with Facebook
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
