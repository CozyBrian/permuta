process.env.EXPO_ROUTER_APP_ROOT = "./src/app";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      // [
      //   "module:react-native-dotenv",
      //   {
      //     envName: "APP_ENV",
      //     moduleName: "@env",
      //     path: ".env",
      //   },
      // ],
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
          },
          extensions: [".js", ".ts", ".tsx", ".json"],
        },
      ],
      "nativewind/babel",
    ],
  };
};
