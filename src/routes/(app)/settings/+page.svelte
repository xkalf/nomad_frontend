<script lang="ts">
	import { browser } from '$app/environment'
	import MobileNavbar from '$lib/components/pages/MobileNavbar.svelte'
	import SidebarContainer from '$lib/components/pages/SidebarContainer.svelte'
	import { setSettings, settings } from '$lib/stores/settings'
	import { throttleBeta } from '$lib/utils/common'
	import type { Settings } from '@prisma/client'
	import InputNumber from './InputNumber.svelte'
	import ItemContainer from './ItemContainer.svelte'
	import { voiceAlertMapper } from '$lib/utils/types'

	type SettingsForm = Omit<Settings, 'id' | 'createdAt' | 'updatedAt' | 'userId'>

	let settingsForm: SettingsForm = (({ id, createdAt, updatedAt, userId, ...rest }) => rest)(
		$settings
	)

	const updateSettings = throttleBeta(async (args: SettingsForm) => {
		if (!browser) return

		const response = await fetch('/api/settings', {
			method: 'PUT',
			body: JSON.stringify(args)
		})

		const data = await response.json()

		if (data.settings) {
			setSettings(data.settings as Settings)
		}
	}, 1000)

	$: updateSettings(settingsForm)

	const shortCuts: {
		base: 'Alt' | 'Ctrl'
		key: string
		label: string
	}[] = [
		{
			base: 'Alt',
			key: '1-7',
			label: 'Төрөл солигдоно'
		},
		{
			base: 'Alt',
			key: 'Z',
			label: 'Сүүлийн эвлүүлэлт устгана'
		},
		{
			base: 'Alt',
			key: 'C',
			label: 'Clock'
		},
		{
			base: 'Alt',
			key: 'D',
			label: 'Багцын эвлүүлэлтийг устгана'
		},
		{
			base: 'Alt',
			key: 'M',
			label: 'Megaminx'
		},
		{
			base: 'Alt',
			key: 'N',
			label: 'Шинэ хэсэг нээх'
		},
		{
			base: 'Alt',
			key: 'P',
			label: 'Pyraminx'
		},
		{
			base: 'Ctrl',
			key: '1',
			label: 'Сүүлийн эвлүүлэлтийн +2 болиулах'
		},
		{
			base: 'Alt',
			key: 'S',
			label: 'Skewb'
		},
		{
			base: 'Ctrl',
			key: '2',
			label: 'Сүүлийн эвлүүлэлтэнд +2 нэмэх'
		},
		{
			base: 'Alt',
			key: 'B',
			label: 'Blind'
		},
		{
			base: 'Ctrl',
			key: '3',
			label: 'Сүүлийн эвлүүлэлтэнд DNF нэмэх'
		}
	]
</script>

<div class="h-screen md:grid md:grid-cols-[minmax(350px,_1fr)_4fr]">
	<SidebarContainer />
	<div class="flex overflow-hidden flex-col h-screen">
		<div class="overflow-y-auto p-4 pb-8 h-auto md:p-14 md:min-h-screen bg-background">
			<!-- Display -->
			<p class="mb-4 text-4xl text-primary">Дэлгэц</p>
			<div class="page">
				<ItemContainer label="Ойртуулж холдуулах">
					<div class="grid grid-cols-3 items-center px-4 mx-auto md:px-0 md:w-1/2">
						<span class="text-lg text-white">{settingsForm.zoom}%</span>
						<input
							bind:value={settingsForm.zoom}
							min="70"
							max="130"
							step="10"
							class="col-span-2 accent-white"
							type="range"
						/>
					</div>
				</ItemContainer>
				<ItemContainer label="Хугацааны үсгийн хэлбэр">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.font}>
							<option value="Mono">Mono</option>
							<option value="Montserat">Montserat</option>
							<option value="Arial">Arial</option>
							<option value="Inter">Inter</option>
						</select>
					</div>
				</ItemContainer>
				<ItemContainer label="Хугацааны хэмжээ" mobileSize="lg">
					<InputNumber bind:value={settingsForm.timerSize} />
				</ItemContainer>
				<ItemContainer label="Үндсэн холилтийн хэмжээ ашиглах" mobileSize="lg" size="md">
					<div class="flex justify-center mx-auto w-1/2">
						<input
							class="w-6 h-6"
							type="checkbox"
							bind:checked={settingsForm.defaultScrambleSize}
						/>
					</div>
				</ItemContainer>
				<ItemContainer label="Холилтийн хэмжээ" mobileSize="lg" size="md">
					<InputNumber bind:value={settingsForm.scrambleSize} />
				</ItemContainer>
				<ItemContainer label="Дэлгэцний арын зураг" size="md">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.backgroundImage}>
							<option value={null}>Зураггүй</option>
							<option value="image-1">Зураг 1</option>
							<option value="image-2">Зураг 2</option>
							<option value="link">Линкээр оруулах</option>
							<option value="upload-image">Зураг оруулах</option>
						</select>
					</div>
				</ItemContainer>
				<ItemContainer label="Дэлгэцний арын зурагний тодруулж бүдгэрүүлэх" size="md">
					<div class="grid grid-cols-3 items-center px-4 mx-auto md:px-0 md:w-1/2">
						<span class="text-lg text-white">{settingsForm.backgroundImageOpacity}%</span>
						<input
							type="range"
							bind:value={settingsForm.backgroundImageOpacity}
							class="col-span-2 accent-white"
							min="10"
							max="100"
							step="10"
						/>
					</div>
				</ItemContainer>
			</div>
			<div
				class="hidden grid-cols-2 py-4 px-8 mt-8 text-2xl bg-white rounded-xl border-2 md:grid border-primary text-primary"
			>
				{#each shortCuts as shortCut}
					<div class="py-2">
						<span class="p-2 rounded-xl bg-background">{shortCut.base}</span>
						<span class="p-2 rounded-xl bg-background">{shortCut.key}</span>
						<span>{shortCut.label}</span>
					</div>
				{/each}
			</div>
			<!-- Timer -->
			<p class="mt-8 mb-4 text-4xl text-primary">Хугацаа хэмжигч</p>
			<div class="page">
				<ItemContainer label="Хулганаар хугацаа хэмжигчийг эхлүүлэх">
					<div class="flex justify-center mx-auto w-1/2">
						<input class="w-6 h-6" type="checkbox" bind:checked={settingsForm.useMouseTimer} />
					</div>
				</ItemContainer>
				<ItemContainer label="Ажиглалтын хугацаа">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.useWcaInspection}>
							<option value="Never">Болиулах</option>
							<option value="Always">Зөвшөөрөх</option>
							<option value="ExceptBLD">Зөвхөн Харахгүй эвлүүлэлт дээр</option>
						</select>
					</div>
				</ItemContainer>
				<ItemContainer label="Дуут дохиог чангалах">
					<div class="grid grid-cols-3 items-center px-4 mx-auto md:px-0 md:w-1/2">
						<span class="text-lg text-white">{settingsForm.voiceVolume}%</span>
						<input
							type="range"
							bind:value={settingsForm.voiceVolume}
							min="1"
							max="100"
							class="col-span-2 accent-white"
						/>
					</div>
				</ItemContainer>
				<ItemContainer label="Ажиглалтын хугацааг дуут дохиогоор сануулах" size="md">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.voiceAlert}>
							<option value="None">{voiceAlertMapper['None']}</option>
							<option value="Aliya">{voiceAlertMapper['Aliya']}</option>
							<option value="Sergelenbat">{voiceAlertMapper['Sergelenbat']}</option>
						</select>
					</div>
				</ItemContainer>
				<ItemContainer
					label="Хугацаа хэмжигчийг эхлүүлэхдээ SPACE -ыг дарах хугацаа"
					size="md"
					mobileSize="lg"
				>
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.freezeTime}>
							<option value={0}>0</option>
							<option value={300}>0.3</option>
							<option value={550}>0.55</option>
							<option value={1000}>1</option>
						</select>
					</div>
				</ItemContainer>
				<!-- <ItemContainer label="Эвлүүлсэн хугацааг харуулах байдал" size="lg" mobileSize="lg">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.unitWhenEnteringInteger}>
							<option value="X">X</option>
							<option value="X.XX">X.XX</option>
							<option value="X:XX">X:XX</option>
							<option value="X:XX:XX">X:XX:XX</option>
							<option value="Full">XX:XX:XX:XX</option>
						</select>
					</div>
				</ItemContainer> -->
				<ItemContainer label="Эвлүүлт дундаа цагаа тэмдэглэх" mobileSize="lg">
					<InputNumber value={settingsForm.multiPhase} max={10} />
				</ItemContainer>
				<ItemContainer label="Хугацаа хэмжигчийн холбох">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.enteringTimes}>
							<option value="Timer">Хугацаа хэмжигч</option>
							<option value="Typing">Бичих</option>
							<option value="Stackmat">Хугацаа хэмжигчийг AUX холбох</option>
						</select>
					</div>
				</ItemContainer>
				<ItemContainer label="Хугацаа хэмжигчийн цагийг харуулах">
					<div class="mx-auto w-1/2">
						<select class="select" bind:value={settingsForm.timerUpdate}>
							<option value="Default">0.01</option>
							<option value="Point">0.1</option>
							<option value="Seconds">зөвхөн секундийг харуулна</option>
							<option value="Inspection">ажиглалтийн хугацааг зөвхөн харуулна</option>
							<option value="None">хугацааг харуулахгүй</option>
						</select>
					</div>
				</ItemContainer>
			</div>
			<form action="/logout" method="post">
				<button class="block p-4 mt-4 w-full text-white rounded-lg md:hidden bg-primary"
					>Гарах</button
				>
			</form>
		</div>
		<MobileNavbar />
	</div>
</div>

<style>
	.select {
		@apply w-full rounded-md p-2;
	}

	.page {
		@apply grid grid-cols-6 gap-4;
	}
</style>
