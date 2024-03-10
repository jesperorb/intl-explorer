// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

type UmamiAnalytics = {
	track: (name: string, data?: Record<string, unknown>) => void
}

declare interface Window {
  umami?: UmamiAnalytics
}