import { getContext } from "svelte";
import { i18nContextKey } from "$lib/i18n/types";
import * as m from "$paraglide/messages";

export const getMessages = () => getContext(i18nContextKey) as typeof m;
export const getMessagesWithoutContext = () => m;
