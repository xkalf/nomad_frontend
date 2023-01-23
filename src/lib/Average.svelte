<script lang="ts">
	export let label: string
	export let value: string
	export let best: boolean = false
</script>

<div
	class={`flex justify-between bg-sidebarElement py-4 px-3 2xl:px-4 text-white rounded-xl ${
		best ? 'w-full' : 'w-1/2'
	}`}
>
	<span>{label}</span>
	<span>{value}</span>
</div>
