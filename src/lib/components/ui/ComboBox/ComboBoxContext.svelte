<script context="module" lang="ts">
	let id = 1;

	export function uid() {
		return `ui:${id++}`;
	}

	export function clone(json: string) {
		return JSON.parse(JSON.stringify(json));
	}

	export function onClickOutside(element: HTMLElement, callback: () => void) {
		const onClick = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (!element.contains(target)) {
				callback();
			}
		};

		document.body.addEventListener("mousedown", onClick);

		return {
			update(newCallback: () => void) {
				callback = newCallback;
			},

			destroy() {
				document.body.removeEventListener("mousedown", onClick);
			}
		};
	}
</script>

<div class="ui">
	<slot />
</div>

<style>
	/* Default styles */
	.ui :global(*) {
		box-sizing: border-box;
	}

	/* Utility classes */
	.ui :global(.visually-hidden) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.ui :global(.icon) {
		width: 24px;
		height: 24px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
