/**
 * Static deployments have no trusted server on which to keep the Gemini key.
 * Browser-only features remain available; API-backed actions are hidden or disabled.
 */
export const isStaticDeployment = import.meta.env.MODE === 'static';
