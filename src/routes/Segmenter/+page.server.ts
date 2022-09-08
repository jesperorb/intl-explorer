import { getCompatDataWithBrowserData } from '$lib/utils/compat-data';
import bcd from '@mdn/browser-compat-data' assert { type: 'json' };

export async function load() {
	return getCompatDataWithBrowserData(bcd, 'Segmenter');
}
