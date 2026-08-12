export function createAnalyticsAdapter({ queryMetrics }) {
  return {
    async execute({ action, payload }) {
      if (action !== 'query') throw new Error(`Unsupported analytics action: ${action}`);
      return queryMetrics(payload);
    }
  };
}
