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
		color: var(--code-comment);
	}

	.token.punctuation {
		color: var(--code-punctuation);
	}

	.token.operator {
		color: var(--code-operator);
	}

	.token.key {
		color: var(--code-key);
	}

	.token.function {
		color: var(--code-function);
	}

	.token.boolean {
		color: var(--code-boolean);
	}

	.token.number {
		color: var(--code-number);
	}

	.token.string {
		color: var(--code-string);
	}
	.token.class {
		color: var(--code-class);
	}
	
</style>
