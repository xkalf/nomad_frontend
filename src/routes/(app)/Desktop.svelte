<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.png'
	import Sidebar from './Sidebar.svelte'
	import { displayTime, formatMegaminxScramble } from '$lib/utils/timer-utils'
	import Modal from '$lib/components/Modal.svelte'
	import type { CubeType, StateType } from '$lib/utils/types'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'

	export let time: number
	export let state: StateType
	export let scramble: string | null
	export let deleteAllModalOpen: boolean
	export let deleteLastModalOpen: boolean
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let deleteLastSolve: () => Promise<void>
	export let removeSolves: () => Promise<void>

	$: textColor = state === 'ready' ? 'text-green-500' : 'text-white'
</script>

<div class="grid h-screen grid-cols-[minmax(350px,_1fr)_4fr]">
	<Sidebar {changeCubeType} />
	<div class="flex flex-col justify-between overflow-hidden bg-[#363C41] p-4">
		<!-- Scramble -->
		<div class="h-1/6 mt-[3vh] flex items-center justify-center p-20 pt-5 text-center">
			<p
				class={`text-5xl text-scramble ${
					$cubeType === 'minx' && 'text-justify font-mono text-2xl md:text-3xl'
				} ${$cubeType === '777' || $cubeType === '666' ? 'text-2xl lg:text-3xl' : ''}`}
			>
				{#if !scramble}
					Холилт хийж байна
				{:else if $cubeType === 'minx'}
					{@html formatMegaminxScramble(scramble)}
				{:else}
					{scramble}
				{/if}
			</p>
		</div>
		<!-- Time -->
		<div class="flex items-center justify-center">
			<p class={`${textColor} font-mono text-[200px] leading-6`}>{displayTime(time)}</p>
		</div>
		<div class="grid grid-cols-[3fr,_minmax(70px,_1fr)]">
			<div class="col-span-3 mb-10 flex items-end justify-center">
				<img src={timerLogo} alt="Nomad Team" />
			</div>
			<!-- Tools -->
			<div class="col-start-4 rounded-xl bg-sidebarBg">
				<ScrambleDisplay {scramble} />
				<div class="flex items-center justify-around p-3">
					<span class="py-2 text-xl text-white">Function</span>
					<select class="rounded-xl bg-sidebarElement py-2 px-4 text-xl text-white">
						<option>Draw Scramble</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal
	okFunction={deleteLastSolve}
	cancelFunction={() => {
		deleteLastModalOpen = false
	}}
	isOpen={deleteLastModalOpen}
>
	<p class="text-lg text-white">Сүүлийн эвлүүлэлтийг устгах уу?</p>
</Modal>

<Modal
	okFunction={removeSolves}
	isOpen={deleteAllModalOpen}
	cancelFunction={() => {
		deleteAllModalOpen = false
	}}
>
	<p class="text-lg text-white">Энэ session-ийн эвлүүлэлтүүдийг устгах уу?</p>
</Modal>
