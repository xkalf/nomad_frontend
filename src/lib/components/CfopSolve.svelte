<script lang="ts">
	import type { CfopSolve } from '@prisma/client'
	import { onMount } from 'svelte'

	export let closeFunction: () => void
	export let solveId: number

	let cfop = {
		cross: '',
		f2l1: '',
		f2l2: '',
		f2l3: '',
		f2l4: '',
		oll: '',
		pll: ''
	}

	async function submit() {
		const response = await fetch(`/api/solve/${solveId}/cfop`, {
			method: 'POST',
			body: JSON.stringify(cfop)
		})
		const data = (await response.json()) as {
			success: boolean
			error?: string
		}

		if (data.success) {
			closeFunction()
		}
	}

	onMount(async () => {
		const data = (await (await fetch(`/api/solve/${solveId}/cfop`)).json()) as CfopSolve

		if (data) {
			cfop = {
				cross: data.cross || '',
				f2l1: data.f2l1 || '',
				f2l2: data.f2l2 || '',
				f2l3: data.f2l3 || '',
				f2l4: data.f2l4 || '',
				oll: data.oll || '',
				pll: data.pll || ''
			}
		}
	})
</script>

<form method="POST" on:submit|preventDefault={submit} class="mt-2">
	<div class="scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto pr-2">
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">Cross</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.cross}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">F2L 1</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.f2l1}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">F2L 2</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.f2l2}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">F2L 3</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.f2l3}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">F2L 4</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.f2l4}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">OLL</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.oll}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-[#2B2F32]">
			<div class="w-1/5 rounded-xl bg-[#33393e] p-3 text-center">PLL</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={cfop.pll}
				/>
			</div>
		</div>
	</div>
	<div class="mt-2 flex justify-center gap-4 text-xl text-white">
		<button class="button py-2 px-4" type="button" on:click={closeFunction}>Болих</button>
		<button class="button py-2 px-4" type="submit">Хадгалах</button>
	</div>
</form>
