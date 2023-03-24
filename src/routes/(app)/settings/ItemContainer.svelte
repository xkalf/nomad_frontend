<script lang="ts">
	export let label: string = ''
	export let size: 'sm' | 'md' | 'lg' = 'sm'

	const sizeMapper = {
		sm: 'col-span-2',
		md: 'col-span-3',
		lg: 'col-span-6'
	}
</script>

<div
	class={`${sizeMapper[size]} flex flex-col items-center gap-4 rounded-lg bg-primary pt-8 pb-4 text-black`}
>
	<p class="text-center text-xl text-white">{label}</p>
	<slot />
</div>
