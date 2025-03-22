import type { AnnounceOptions } from "./types";

export const liveAnnouncerContextKey = "live-announcer";
export const liveAnnouncerRegionIdPolite = "live-announcer-polite";
export const liveAnnouncerRegionIdAssertive = "live-announcer-assertive";
export const defaultAnnounceTimeoutMs = 1000;
export const defaultAnnounceSetting: AnnounceOptions["setting"] = "polite";
export const defaultAnnounceOptions: AnnounceOptions = {
	setting: defaultAnnounceSetting,
	timeout: defaultAnnounceTimeoutMs,
}
