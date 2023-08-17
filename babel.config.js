module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@pages": "./src/pages",
          "@screens": "./src/screens",
          "@styles": "./src/styles",
        },
      }],
      ["module:react-native-dotenv", {

        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
    ]
  };
};
