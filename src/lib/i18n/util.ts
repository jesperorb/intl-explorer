import { getContext } from "svelte";
import { i18nContextKey } from "./types";
import * as m from "$paraglide/messages"

export const getMessages = () => getContext(i18nContextKey) as typeof m;
export const getMessagesWithoutContext = () => m;