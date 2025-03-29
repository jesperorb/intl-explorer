import type { FormatMethodsKeys } from "$lib/format-methods";

export const loadJson = async <Type extends object>(
	method: FormatMethodsKeys | "Locale" | "Playground"
): Promise<Type | undefined> => {
	try {
		const response = await fetch(`${method}-compat-data.json`);
		return response.json();
	} catch (e: unknown) {
		return undefined;
	}
};
