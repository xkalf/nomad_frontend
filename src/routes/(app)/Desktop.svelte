<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.png'
	import Sidebar from './Sidebar.svelte'
	import { displayTime, formatMegaminxScramble, type StateType } from '$lib/utils/timer-utils'
	import Modal from '$lib/Modal.svelte'
	import type { CubeType } from '$lib/utils/enum-adapter'
	import type { Session } from '@prisma/client'

	export let time: number
	export let state: StateType
	export let cubeType: CubeType
	export let scramble: string | null
	export let session: Session
	export let sessions: Session[]
	export let deleteAllModalOpen: boolean
	export let deleteLastModalOpen: boolean
	export let getSessionById: (id: number) => Promise<void>
	export let removeSession: (id: number) => void
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let deleteLastSolve: () => Promise<void>
	export let removeSolves: () => Promise<void>

	$: textColor = state === 'ready' ? 'text-green-500' : 'text-white'
</script>

<div class="h-screen grid grid-cols-[minmax(350px,_1fr)_4fr]">
	<Sidebar {getSessionById} {removeSession} {session} {cubeType} {changeCubeType} {sessions} />
	<div class="bg-[#363C41] p-4 flex flex-col overflow-hidden justify-between">
		<!-- Scramble -->
		<div class="mt-[3vh] flex justify-center items-center h-1/6 p-20 text-center">
			<p
				class={`text-5xl text-scramble ${
					cubeType === 'minx' && 'text-justify text-3xl lg:text-4xl font-mono mt-10'
				} ${cubeType === '777' || cubeType === '666' ? 'text-2xl lg:text-3xl' : ''}`}
			>
				{#if !scramble}
					Холилт хийж байна
				{:else if cubeType === 'minx'}
					{@html formatMegaminxScramble(scramble)}
				{:else}
					{scramble}
				{/if}
			</p>
		</div>
		<!-- Time -->
		<div class="flex justify-center items-center">
			<p class={`${textColor} text-[200px] leading-6 font-mono`}>{displayTime(time)}</p>
		</div>
		<div class="grid grid-cols-[3fr,_minmax(70px,_1fr)]">
			<div class="flex justify-center items-end mb-10 col-span-3">
				<img src={timerLogo} alt="Nomad Team" />
			</div>
			<!-- Tools -->
			<div class="bg-sidebarBg col-start-4 rounded-xl">
				<scramble-display
					{scramble}
					event={cubeType}
					visualization={cubeType === 'pyram' ? '2D' : '3D'}
				/>
				<div class="flex justify-around items-center p-3">
					<span class="text-white text-xl py-2">Function</span>
					<select class="bg-sidebarElement text-white py-2 px-4 text-xl rounded-xl">
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
	<p class="text-white text-lg">Сүүлийн эвлүүлэлтийг устгах уу?</p>
</Modal>

<Modal
	okFunction={removeSolves}
	isOpen={deleteAllModalOpen}
	cancelFunction={() => {
		deleteAllModalOpen = false
	}}
>
	<p class="text-white text-lg">Энэ session-ийн эвлүүлэлтүүдийг устгах уу?</p>
</Modal>

<style>
	scramble-display {
		width: 100%;
	}

	@media screen and (max-width: 1024px) {
		scramble-display {
			width: 60%;
		}
	}
</style>
