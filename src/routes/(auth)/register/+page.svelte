<script lang="ts">
	import { page } from '$app/stores'
	import horizontalLogo from '$lib/assets/horizontal-logo.webp'
	import Icon from '@iconify/svelte'

	const input = 'w-full border-4 border-[#e7e7e7] p-4 pl-14 focus:outline-none'
	const icon = 'absolute top-1/2 left-4 -translate-y-1/2 text-3xl'
</script>

<svelte:head>
	<title>Бүртгүүлэх</title>
</svelte:head>

<div class="h-screen md:grid md:grid-cols-2">
	<div class="flex h-full flex-col p-4 md:p-3">
		<img src={horizontalLogo} alt="logo" width="200" class="mx-auto mt-8" />
		<div class="mx-auto mt-8 w-4/5">
			<form action="?/register" class="flex flex-col gap-2 text-2xl text-primary">
				<label for="lastname">Нэр</label>
				<div class="relative">
					<input id="firstname" type="text" class={input} />
					<Icon class={icon} icon="fa-solid:id-card" />
					<!-- <Icon
						class="absolute right-1 top-1 translate-x-1/2 -translate-y-1/2 text-3xl"
						icon="material-symbols:check-circle-rounded"
					/> -->
				</div>
				<label for="firstname">Овог</label>
				<div class="relative">
					<input type="text" id="firstname" class={input} />
					<Icon class={icon} icon="fa-solid:id-card" />
				</div>
				<label for="email">Мэйл</label>
				<div class="relative">
					<input type="text" id="email" class={input} value={$page.data.session?.user.email} />
					<Icon class={icon} icon="clarity:email-solid" />
				</div>
				<label for="phone">Утас</label>
				<div class="relative">
					<input type="text" id="phone" class={input} />
					<Icon class={icon} icon="material-symbols:phone-in-talk-rounded" />
				</div>
				<div class="flex gap-2">
					<div class="flex w-1/2 flex-col gap-2">
						<label for="birthdate">Төрсөн өдөр</label>
						<div class="relative">
							<input type="date" id="birthdate" class={input} />
						</div>
					</div>
					<div class="flex w-1/2 flex-col gap-2">
						<label for="gender">Хүйс</label>
						<div class="relative">
							<select class={input}>
								<option value="Male">Эрэгтэй</option>
								<option value="Female">Эмэгтэй</option>
							</select>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="hidden bg-primary md:block" />
</div>
