export interface RuntimeConfig {
  apiUrl: string;
}

declare global {
  interface Window {
    APP_CONFIG: RuntimeConfig;
  }
}
