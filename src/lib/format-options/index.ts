import { collatorFormatOptions } from "./collator.options"
import { datetimeFormatOptions } from "./datetime-format.options"
import { listFormatOptions } from "./list-format.options"
import { numberFormatOptionsCurrency, numberFormatOptionsUnit } from "./number-format.options"
import { pluralRulesFormatOptions } from "./plural-rules.options"
import { relativeTimeFormatOptions } from "./relative-time-format.options"
import { segmenterOptions } from "./segmenter.options"

export const formatOptions = {
	DateTimeFormat: datetimeFormatOptions,
	NumberFormat: {
		...numberFormatOptionsUnit,
		...numberFormatOptionsCurrency
	},
	ListFormat: listFormatOptions,
	RelativeTimeFormat: relativeTimeFormatOptions,
	PluralRules: pluralRulesFormatOptions,
	Collator: collatorFormatOptions,
	Segmenter: segmenterOptions
}
