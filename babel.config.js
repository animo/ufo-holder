module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          '@internal': './src',
          '@components': './components',
        },
      },
    ],
    ['module:react-native-reanimated/plugin'],
  ],
}
