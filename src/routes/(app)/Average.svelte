<script lang="ts">
	export let label: string
	export let value: string
	export let best: boolean = false
</script>

<div
	class={`flex justify-between rounded-xl bg-sidebarElement py-4 px-3 text-white 2xl:px-4 ${
		best ? 'w-full' : 'w-1/2'
	}`}
>
	<span>{label}</span>
	<span>{value}</span>
</div>
