export function createResearchAdapter({ search }) {
  return {
    async execute({ action, payload }) {
      if (action !== 'search' && action !== 'extract') throw new Error(`Unsupported research action: ${action}`);
      return search({ action, ...payload });
    }
  };
}
