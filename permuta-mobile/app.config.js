module.exports = {
  expo: {
    name: "Permuta",
    slug: "Permuta",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "myapp",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.cozybrian.Permuta",
      supportsTablet: true,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: "com.cozybrian.Permuta",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
  },
};
