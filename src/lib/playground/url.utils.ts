import { browser } from '$app/environment';
import type { FormatMethodsKeys } from '$lib/format-methods';
import type { PlaygroundSchema } from './playground.types';
import { validateAndUpdateSchema } from './schemas/validate';

export const parseSchemaFromURL = <Method extends FormatMethodsKeys>():
	| PlaygroundSchema<Method>
	| undefined => {
	const params = browser ? new URLSearchParams(window.location.search).get('schema') : undefined;
	const parsedParams = params
		? (JSON.parse(atob(params)).schema as PlaygroundSchema<Method>)
		: undefined;
	return parsedParams ? validateAndUpdateSchema(parsedParams) : undefined;
};

export const setSchemaInURL = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
) => {
	const baseEncoded = btoa(JSON.stringify({ schema }));
	const params = new URLSearchParams(window.location.search);
	params.set('schema', baseEncoded);
	window.history.replaceState(
		{},
		'',
		`${window.location.origin}${window.location.pathname}?${params.toString()}`
	);
};
