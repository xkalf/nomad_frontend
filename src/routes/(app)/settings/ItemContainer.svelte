<script lang="ts">
	export let label: string = ''
	export let size: 'sm' | 'md' | 'lg' = 'sm'
	export let mobileSize: 'sm' | 'lg' = 'sm'

	const sizeMapper = {
		sm: 'md:col-span-2',
		md: 'md:col-span-3',
		lg: 'col-span-6'
	}

	const mobileSizeMapper = {
		sm: 'col-span-3',
		lg: 'col-span-6'
	}
</script>

<div
	class={`${sizeMapper[size]} ${mobileSizeMapper[mobileSize]} flex flex-col items-center gap-4 rounded-lg bg-primary px-2 pt-8 pb-4 text-black`}
>
	<p class="text-center text-xl text-white">{label}</p>
	<slot />
</div>
