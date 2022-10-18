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
</script>

<span class="token {t}"><slot /></span>

<style>
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
