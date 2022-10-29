import { collatorSchema } from './collator.schema';
import { dateTimeFormatSchema } from './dateTimeFormat.schema';
import { listFormatSchema } from './listFormat.schema';
import { numberFormatSchema } from './numberFormat.schema';
import { pluralRulesSchema } from './pluralRules.schema';
import { relativeTimeFormatSchema } from './relativeTimeFormat.schema';
import { segmenterSchema } from './segmenter.schema';

export const schemas = {
	ListFormat: listFormatSchema,
	NumberFormat: numberFormatSchema,
	PluralRules: pluralRulesSchema,
	DateTimeFormat: dateTimeFormatSchema,
	RelativeTimeFormat: relativeTimeFormatSchema,
	Collator: collatorSchema,
	Segmenter: segmenterSchema
};

export type SchemaKeys = keyof typeof schemas;
