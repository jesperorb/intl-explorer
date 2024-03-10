export type AnalyticEvents = 'Change Schema'
  | 'Copy Schema'
  | 'Copy Code'
  | 'Change Option'
  | 'Parse Schema'
  | 'View Browser Support'

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