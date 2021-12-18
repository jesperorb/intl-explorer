/// <reference types="svelte" />

/**
 * ListFormat is not yet in TypeScript. It is Stage 4 and
 * not fully implemented yet so not in standard libs
 */
declare namespace Intl {
  function getCanonicalLocales(
    locales: string | string[] | undefined
  ): string[];

  type Locale = string;
  type Locales = Locale[];
  type Type = "conjunction" | "disjunction" | "unit";
  type Style = "long" | "short" | "narrow";
  type LocaleMatcher = "lookup" | "best fit";

  interface ListFormatOptions {
    type: Type;
    style: Style;
    localeMatcher: LocaleMatcher;
  }

  interface ResolvedListFormatOptions {
    type: Type;
    style: Style;
    locale: Locale;
  }

  interface ElementPartition {
    type: "element";
    value: ListPartition[] | string;
  }

  interface ListPartitionBase {
    value: string;
  }

  interface LiteralPartition extends ListPartitionBase {
    type: "literal";
  }

  type ListPartition = ElementPartition | LiteralPartition;

  type ListPartitions = ReadonlyArray<ListPartition>;

  class ListFormat {
    constructor(
      locales?: Locale | Locales | string | undefined,
      options?: Partial<ListFormatOptions>
    );

    public static supportedLocalesOf(
      locales: Locale | Locales,
      options?: Intl.SupportedLocalesOptions | undefined
    ): Locales;

    public format(list?: Iterable<string>): string;

    public formatToParts(list?: Iterable<string>): ListPartitions;

    public resolvedOptions(): ResolvedListFormatOptions;
  }
}
