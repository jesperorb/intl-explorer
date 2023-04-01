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
</script>

<span class="token {t}" class:noWrap={noWrap}><slot /></span>

<style>
	.noWrap {
		white-space: nowrap;
	}
	.token.comment {
		color: var(--gray);
	}

	.token.punctuation {
		color: var(--purple);
	}

	.token.operator {
		color: var(--teal);
	}

	.token.key {
		color: var(--white);
	}

	.token.function {
		color: var(--light-blue);
	}

	.token.boolean {
		color: var(--red);
	}

	.token.number {
		color: var(--orange);
	}

	.token.string {
		color: var(--green);
	}
	.token.class {
		color: #fac863;
	}
</style>
