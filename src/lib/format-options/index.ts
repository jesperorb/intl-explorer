import { collatorFormatOptions } from "$lib/format-options/collator.options";
import { datetimeFormatOptions } from "$lib/format-options/datetime-format.options";
import { displayNamesOptions } from "$lib/format-options/display-names.options";
import { durationFormatOptions } from "$lib/format-options/duration-format.options";
import { listFormatOptions } from "$lib/format-options/list-format.options";
import {
	numberFormatOptionsCommon,
	numberFormatOptionsCurrency,
	numberFormatOptionsUnit
} from "$lib/format-options/number-format.options";
import { pluralRulesFormatOptions } from "$lib/format-options/plural-rules.options";
import { relativeTimeFormatOptions } from "$lib/format-options/relative-time-format.options";
import { segmenterOptions } from "$lib/format-options/segmenter.options";

export const formatOptions = {
	DateTimeFormat: datetimeFormatOptions,
	NumberFormat: {
		...numberFormatOptionsUnit,
		...numberFormatOptionsCurrency,
		...numberFormatOptionsCommon
	},
	ListFormat: listFormatOptions,
	RelativeTimeFormat: relativeTimeFormatOptions,
	PluralRules: pluralRulesFormatOptions,
	Collator: collatorFormatOptions,
	Segmenter: segmenterOptions,
	DisplayNames: displayNamesOptions,
	DurationFormat: durationFormatOptions
};
