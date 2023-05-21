<script lang="ts">
	export let connectTimer: () => Promise<void>
</script>

<button class="mx-auto w-1/2 rounded-lg bg-white p-2" on:click={connectTimer}>Холбох</button>
