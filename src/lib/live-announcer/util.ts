import { getContext } from "svelte";
import type { AnnounceFunction } from "./types";
import { liveAnnouncerContextKey } from "./constants";

export const getAnnouncer = () => getContext(liveAnnouncerContextKey) as AnnounceFunction;
