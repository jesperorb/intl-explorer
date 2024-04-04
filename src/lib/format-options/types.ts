export type AllFormatOptions = {
	DateTimeFormat: Intl.DateTimeFormatOptions;
	NumberFormat: Intl.NumberFormatOptions;
	ListFormat: Intl.ListFormatOptions;
	RelativeTimeFormat: Intl.RelativeTimeFormatOptions;
	PluralRules: Intl.PluralRulesOptions;
	Collator: Intl.CollatorOptions;
	Segmenter: Intl.SegmenterOptions;
	DisplayNames: Intl.DisplayNamesOptions;
	DurationFormat: Intl.DurationFormatOptions;
};

export type AllFormatOptionsKeys = {
	DateTimeFormat: keyof AllFormatOptions["DateTimeFormat"];
	NumberFormat: keyof AllFormatOptions["NumberFormat"];
	ListFormat: keyof AllFormatOptions["ListFormat"];
	RelativeTimeFormat: keyof AllFormatOptions["RelativeTimeFormat"];
	PluralRules: keyof AllFormatOptions["PluralRules"];
	Collator: keyof AllFormatOptions["Collator"];
	Segmenter: keyof AllFormatOptions["Segmenter"];
	DisplayNames: keyof AllFormatOptions["DisplayNames"];
	DurationFormat: keyof AllFormatOptions["DurationFormat"];
};

export type AllMethods = {
	DateTimeFormat: Intl.DateTimeFormat;
	NumberFormat: Intl.NumberFormat;
	ListFormat: Intl.ListFormat;
	RelativeTimeFormat: Intl.RelativeTimeFormat;
	PluralRules: Intl.PluralRules;
	Collator: Intl.Collator;
	Segmenter: Intl.Segmenter;
	DisplayNames: Intl.DisplayNames;
	DurationFormat: Intl.DurationFormat;
};
