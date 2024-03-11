import { collatorSchema } from './collator.schema';
import { dateTimeFormatSchema } from './dateTimeFormat.schema';
import { displayNamesSchema } from './displayNames.schema';
import { durationFormatSchema } from './durationFormat.schema';
import { listFormatSchema } from './listFormat.schema';
import { numberFormatSchema } from './numberFormat.schema';
import { pluralRulesSchema } from './pluralRules.schema';
import { relativeTimeFormatSchema } from './relativeTimeFormat.schema';
import { segmenterSchema } from './segmenter.schema';

export const schemas = {
	NumberFormat: numberFormatSchema,
	ListFormat: listFormatSchema,
	PluralRules: pluralRulesSchema,
	DateTimeFormat: dateTimeFormatSchema,
	RelativeTimeFormat: relativeTimeFormatSchema,
	Collator: collatorSchema,
	Segmenter: segmenterSchema,
	DisplayNames: displayNamesSchema,
	DurationFormat: durationFormatSchema,
};

export type SchemaKeys = keyof typeof schemas;
