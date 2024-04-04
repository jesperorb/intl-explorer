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
