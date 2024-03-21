import type { VersionValue } from "@mdn/browser-compat-data";

export const getAriaLabel = (browserName: string, versionAdded: VersionValue): string => {
  if (!versionAdded) return `Not available in ${browserName}`;
  return `Available in ${browserName} from version ${versionAdded}`;
};