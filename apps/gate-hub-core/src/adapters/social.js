export function createSocialAdapter({ schedule, publish }) {
  return {
    async execute({ action, payload }) {
      if (action === 'schedule') return schedule(payload);
      if (action === 'publish') return publish(payload);
      throw new Error(`Unsupported social action: ${action}`);
    }
  };
}
