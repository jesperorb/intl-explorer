import { collatorSchema } from "$lib/playground/schemas/collator.schema";
import { dateTimeFormatSchema } from "$lib/playground/schemas/dateTimeFormat.schema";
import { displayNamesSchema } from "$lib/playground/schemas/displayNames.schema";
import { durationFormatSchema } from "$lib/playground/schemas/durationFormat.schema";
import { listFormatSchema } from "$lib/playground/schemas/listFormat.schema";
import { numberFormatSchema } from "$lib/playground/schemas/numberFormat.schema";
import { pluralRulesSchema } from "$lib/playground/schemas/pluralRules.schema";
import { relativeTimeFormatSchema } from "$lib/playground/schemas/relativeTimeFormat.schema";
import { segmenterSchema } from "$lib/playground/schemas/segmenter.schema";

export const schemas = {
	NumberFormat: numberFormatSchema,
	ListFormat: listFormatSchema,
	PluralRules: pluralRulesSchema,
	DateTimeFormat: dateTimeFormatSchema,
	RelativeTimeFormat: relativeTimeFormatSchema,
	Collator: collatorSchema,
	Segmenter: segmenterSchema,
	DisplayNames: displayNamesSchema,
	DurationFormat: durationFormatSchema
};

export type SchemaKeys = keyof typeof schemas;
