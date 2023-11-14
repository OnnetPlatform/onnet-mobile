module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@Components/*': './App/Components',
          '@HOCs': './App/Components/HOCs',
          '@Atoms': './App/Components/atoms',
          '@Molecules': './App/Components/molecules',
          '@Screens': './App/Screens',
          '@Theme': './App/Theme',
          '@Metrics': './App/Theme/Metrics',
          '@Skia': './App/Components/Skia',
          '@Khayat': './App/Libs/@Khayat/src',
        },
      },
    ],
    'jest-hoist',
  ],
};
