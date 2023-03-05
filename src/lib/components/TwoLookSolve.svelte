<script lang="ts">
	import type { TwoLookSolve } from '@prisma/client'

	export let closeFunction: () => void
	export let solveId: number
	export let data: TwoLookSolve | null

	let twoLook = {
		cross: data?.cross || '',
		firstLayer: data?.firstLayer || '',
		edge1: data?.edge1 || '',
		edge2: data?.edge2 || '',
		edge3: data?.edge3 || '',
		edge4: data?.edge4 || '',
		oll1: data?.oll1 || '',
		oll2: data?.oll2 || '',
		pll1: data?.pll1 || '',
		pll2: data?.pll2 || ''
	}

	async function submit() {
		const response = await fetch(`/api/solve/${solveId}/two-look`, {
			method: 'POST',
			body: JSON.stringify(twoLook)
		})
		const data = (await response.json()) as {
			success: boolean
			error?: string
		}

		if (data.success) {
			closeFunction()
		}
	}
</script>

<form method="POST" on:submit|preventDefault={submit} class="mt-2 text-white">
	<div class="scrollbar flex max-h-40 flex-col gap-2 overflow-y-auto pr-2">
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">Нэмэх тэмдэг</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.cross}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">Эхний үе</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.firstLayer}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">Edge 1</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.edge1}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">Edge 2</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.edge2}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">Edge 3</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.edge3}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">Edge 4</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.edge4}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">OLL 1</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.oll1}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">OLL 2</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.oll2}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">PLL 1</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.pll1}
				/>
			</div>
		</div>
		<div class="flex w-full rounded-lg bg-secondary">
			<div class="w-1/5 rounded-xl bg-primary p-3 text-center">PLL 2</div>
			<div class="flex w-4/5 items-center justify-center text-center">
				<input
					class="h-full w-full bg-transparent pl-4 focus:outline-none"
					type="text"
					bind:value={twoLook.pll2}
				/>
			</div>
		</div>
	</div>
	<div class="mt-2 flex justify-center gap-4 text-xl text-white">
		<button class="rounded-xl bg-primary py-2 px-4 text-xl text-white" type="button" on:click={closeFunction}>Болих</button>
		<button class="rounded-xl bg-primary py-2 px-4 text-xl text-white" type="submit">Хадгалах</button>
	</div>
</form>
