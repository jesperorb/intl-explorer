import { browser } from "$app/environment";
import type { FormatMethodsKeys } from "$lib/format-methods";
import type { PlaygroundSchema } from "$lib/playground/playground.schema";
import { validateAndUpdateSchema } from "$lib/playground/validate";

export const getSchemaParam = () =>
	browser ? new URLSearchParams(window.location.search).get("schema") : undefined;

export const parseSchemaFromURL = <Method extends FormatMethodsKeys>():
	| PlaygroundSchema<Method>
	| undefined => {
	const params = browser ? new URLSearchParams(window.location.search).get("schema") : undefined;
	const parsedParams = params
		? (JSON.parse(atob(params)).schema as PlaygroundSchema<Method>)
		: undefined;
	return parsedParams ? validateAndUpdateSchema(parsedParams) : undefined;
};

export const createSchemaUrl = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
) => {
	const baseEncoded = btoa(JSON.stringify({ schema }));
	const params = new URLSearchParams(window.location.search);
	params.set("schema", baseEncoded);
	return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
};
