const repoName = 'tamagui-tailadmin-free-dashboard-template'
const forGithubPages = process.env.GITHUB_PAGES === '1'

/** @type {import('expo/config').ExpoConfig} */
const expoConfig = {
  name: 'TailAdmin Tamagui',
  slug: repoName,
  version: '0.1.0',
  orientation: 'default',
  icon: './assets/images/icon.png',
  scheme: 'tamagui-tailadmin',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
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
