<script lang="ts">
	export let t: 'punctuation'
		| 'comment'
		| 'operator'
		| 'key'
		| 'function'
		| 'boolean'
		| 'number'
		| 'string'
		| 'class' = 'key';
	export let noWrap: boolean = false
	export let v: string;
	export let ariaHidden: boolean = false;
	export let noTrim: boolean = false;
</script>
<span aria-hidden="{ariaHidden}" class="token {t}" class:noWrap={noWrap}>{noTrim ? v : v.toString().trim()}</span>
<style>
	.noWrap {
		white-space: nowrap;
	}
	.token.comment {
		color: var(--comment);
	}

	.token.punctuation {
		color: var(--punctuation);
	}

	.token.operator {
		color: var(--operator);
	}

	.token.key {
		color: var(--key);
	}

	.token.function {
		color: var(--function);
	}

	.token.boolean {
		color: var(--boolean);
	}

	.token.number {
		color: var(--number);
	}

	.token.string {
		color: var(--string);
	}
	.token.class {
		color: var(--class);
	}
</style>
