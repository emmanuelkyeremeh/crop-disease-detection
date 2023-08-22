// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);
//   const { assetExts } = defaultConfig.resolver;
//   return {
//     ...defaultConfig,
//     resolver: {
//       ...defaultConfig.resolver,
//       assetExts: [...assetExts, "bin"],
//     },
//   };
// })();

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("bin");
config.resolver.assetExts.push("tflite");
config.resolver.assetExts.push("txt");

module.exports = config;
