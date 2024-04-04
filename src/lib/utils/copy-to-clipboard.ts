import { trackEvent } from "$lib/utils/analytics";

export function copyToClipboard(textToCopy: string): Promise<void> {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard.writeText(textToCopy);
	} else {
		const textArea = document.createElement("textarea");
		textArea.value = textToCopy;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		return new Promise((resolve, reject) => {
			document.execCommand("copy") ? resolve() : reject();
			textArea.remove();
		});
	}
}

export const copyCode = async (code: string) => {
	await copyToClipboard(code);
	trackEvent("Copy Code", {
		code
	});
};
