export type AllFormatOptions = {
	DateTimeFormat: Intl.DateTimeFormatOptions;
	NumberFormat: Intl.NumberFormatOptions;
	ListFormat: Intl.ListFormatOptions;
	RelativeTimeFormat: Intl.RelativeTimeFormatOptions;
	PluralRules: Intl.PluralRulesOptions;
	Collator: Intl.CollatorOptions;
	Segmenter: Intl.SegmenterOptions;
}

export type AllFormatOptionsKeys = {
	DateTimeFormat: keyof AllFormatOptions["DateTimeFormat"];
	NumberFormat: keyof AllFormatOptions["NumberFormat"];
	ListFormat: keyof AllFormatOptions["ListFormat"];
	RelativeTimeFormat: keyof AllFormatOptions["RelativeTimeFormat"];
	PluralRules: keyof AllFormatOptions["PluralRules"];
	Collator: keyof AllFormatOptions["Collator"];
	Segmenter: keyof AllFormatOptions["Segmenter"];
}
