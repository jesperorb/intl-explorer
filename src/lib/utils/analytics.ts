export type AnalyticEvents = 
  | 'Copy Schema'
  | 'Copy Code'

export const trackEvent = (
  name: AnalyticEvents,
  data?: Record<string, unknown>
) => {
  try {
    window?.umami?.track(name, data)
  } catch (error) {
    // noop
  }
}