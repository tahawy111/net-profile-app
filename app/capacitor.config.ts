import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.netprofile.app',
  appName: 'net-profile-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
