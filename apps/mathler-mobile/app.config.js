export default {
  expo: {
    name: 'mathler-mobile',
    slug: 'mathler-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.dev.gpuente.mathlermobile',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    owner: 'dev.gpuente',
    extra: {
      STORYBOOK_ENABLED: process.env.STORYBOOK_ENABLED,
      eas: {
        projectId: 'e2d4b862-52b3-4993-8a4e-21b40a9e3dac',
      },
    },
  },
};
