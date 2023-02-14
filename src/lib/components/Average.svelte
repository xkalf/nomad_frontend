<script lang="ts">
	export let label: string
	export let value: string
	export let best = false
	export let mobile = false
</script>

<div
	class={`flex rounded-xl py-4 px-3 text-white 2xl:px-4 ${best ? 'w-full' : 'w-1/2'} ${
		mobile ? 'justify-evenly bg-mobileAverage' : 'justify-between bg-sidebarElement'
	}`}
>
	<span>{label}</span>
	<span>{value}</span>
</div>
