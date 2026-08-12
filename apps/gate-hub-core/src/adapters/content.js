export function createContentAdapter({ generate, publish }) {
  return {
    async execute({ action, payload }) {
      if (action === 'generate') return generate(payload);
      if (action === 'publish') return publish(payload);
      throw new Error(`Unsupported content action: ${action}`);
    }
  };
}
