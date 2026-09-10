const repoName = 'verdant-tamagui-admin-template'
const forGithubPages = process.env.GITHUB_PAGES === '1'

/** @type {import('expo/config').ExpoConfig} */
const expoConfig = {
  name: 'Verdant',
  slug: repoName,
  version: '0.2.1',
  orientation: 'default',
  icon: './assets/images/icon.png',
  scheme: 'verdant-admin',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E8F6EF',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    'expo-image',
  ],
  experiments: {
    typedRoutes: true,
    ...(forGithubPages ? { baseUrl: `/${repoName}` } : {}),
  },
}

module.exports = { expo: expoConfig }
