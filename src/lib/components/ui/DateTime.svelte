<script lang="ts">
	export let defaultValue: string;
	export let onChange: (datetime: string) => void;

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

<div class="datetime">
	<div>
		<label for="date">Date</label>
		<input type="date" id="date" on:input={onChangeDate} value={dateString} />
	</div>
	<div>
		<label for="time">Time</label>
		<input type="time" id="time" on:input={onChangeTime} value={timeString} />
	</div>
</div>

<style>
	.datetime {
		display: flex;
		gap: 1rem;
	}
	input {
		border: 1px solid grey;
		border-radius: 4px;
		background-color: white;
		padding: 0.5rem;
	}
</style>
