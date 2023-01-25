<script lang="ts">
	import RubikLogo from '$lib/assets/rubik-logo.png'
	import NomadLogo from '$lib/assets/nomad-logo.png'
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<div class="flex min-h-screen">
	<div class="h-screen w-1/2 bg-black" />
	<div class="flex w-1/2 flex-col justify-between p-3">
		<div class="flex justify-end">
			<button class="rounded-md bg-[#121315] p-2 text-white">
				<!-- <FontAwesomeIcon icon={faGlobe} class="mr-1" /> -->
				MN
			</button>
		</div>
		<div class="mx-auto flex h-3/5 w-4/5 flex-col">
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
			<form class="mt-14 flex flex-col items-center gap-6" action="?/login" method="POST">
				<div class="relative w-4/5 text-[#cecfd5]">
					<!-- <fontawesomeicon
                icon={faenvelope}
                type="regular"
                class={icon}
              /> -->
					<input
						class="drop-shadow-lg py-5 align-top content-center rounded-lg w-full px-10 focus:text-black"
						type="email"
						placeholder="и-мэйл"
						name="email"
					/>
				</div>
				<div class="relative w-4/5 text-[#cecfd5]">
					<!-- <fontawesomeicon icon={falock} type="regular" class={icon} /> -->
					<input
						class="drop-shadow-lg py-5 align-top content-center rounded-lg w-full px-10 focus:text-black"
						type="password"
						placeholder="нууц үг"
						name="password"
					/>
				</div>
				<div class="relative w-4/5 text-[#cecfd5] flex justify-between">
					<div class="flex gap-2">
						<input
							type="checkbox"
							class="mt-1 h-4 w-4 appearance-none rounded-full border border-[#d2d4da] checked:bg-[#d2d4da]"
							id="remember"
						/>
						<label for="remember" class="cursor-pointer"> Намайг санах </label>
					</div>
					<a href="/forgot-password" class="text-black underline"> Нууц үг мартсан? </a>
				</div>
				<p>{form?.message || ''}</p>
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
		<div>
			<p class="text-center text-[#cecfd5]">
				Бүртгэл хэрэгтэй байна ?
				<a href="/register" class="text-black underline"> БҮРТГҮҮЛЭХ </a>
			</p>
		</div>
	</div>
</div>
