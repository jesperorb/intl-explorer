import type { ServerLoadEvent } from '@sveltejs/kit';

export const loadJson = async ({ route, fetch }: ServerLoadEvent) => {
	try {
		const isNumberFormat = route.id?.includes('NumberFormat');
		const routeName = isNumberFormat ? '/NumberFormat' : route.id;
		const response = await fetch(`.${routeName}-compat-data.json`);
		return response.json();
	} catch (e: unknown) {
		return null;
	}
};
