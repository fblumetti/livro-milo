import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.org.fise.livromilo',
  appName: 'Livro do Milo',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'always',        // respect safe areas (notch / home indicator)
    backgroundColor: '#FFF4DE',
    preferredContentMode: 'mobile',
  },
};

export default config;
