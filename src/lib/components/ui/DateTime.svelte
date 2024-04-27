<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";
	import { getMessages } from "$i18n/util";

	export let defaultValue: string;
	export let onChange: (datetime: string) => void;
	export let fullWidth: boolean | undefined = undefined;

	const m = getMessages();

	const [date, time] = defaultValue.split("T");

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

<div class="datetime" class:fullWidth>
	<div class="date">
		<label for="date">{m.date()}</label>
		<Spacing size={2} />
		<input type="date" id="date" on:input={onChangeDate} value={dateString} />
	</div>
	<div class="time">
		<label for="time">{m.time()}</label>
		<Spacing size={2} />
		<input type="time" id="time" on:input={onChangeTime} value={timeString} />
	</div>
</div>

<style>
	.datetime {
		display: flex;
		gap: 1rem;
	}
	.fullWidth,
	.date,
	.time,
	#date,
	#time {
		width: 100%;
	}
</style>
