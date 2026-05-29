import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gamesurvey.campus',
  appName: 'Game Survey Campus',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f0c29',
      showSpinner: false
    }
  }
};

export default config;