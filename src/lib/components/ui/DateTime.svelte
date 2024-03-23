<script lang="ts">
	import Spacing from "$lib/components/ui/Spacing.svelte";

	export let defaultValue: string;
	export let onChange: (datetime: string) => void;
	export let fullWidth: boolean | undefined = undefined;

	const [date, time] = defaultValue.split('T');

	let dateString = date;
	let timeString = time;

	const onChangeDate = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		onChange(`${value}T${timeString}`);
	};
	const onChangeTime = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		onChange(`${dateString}T${value}`);
	};
</script>

<div class="datetime" class:fullWidth={fullWidth}>
	<div class="date">
		<label for="date">Date</label>
		<Spacing size={1} /> 
		<input type="date" id="date" on:input={onChangeDate} value={dateString} />
	</div>
	<div class="time">
		<label for="time">Time</label>
		<Spacing size={1} /> 
		<input type="time" id="time" on:input={onChangeTime} value={timeString} />
	</div>
</div>

<style>
	.datetime {
		display: flex;
		gap: 1rem;
	}
	.fullWidth, .date, .time, #date, #time {
		width: 100%;
	}
</style>
