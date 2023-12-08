declare module 'react-native-config' {
  export interface NativeConfig {
    SENTRY_DSN?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
