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
          '@Screens': './App/Screens',
          '@Theme': './App/Theme',
          '@Skia': './App/Components/Skia',
        },
      },
    ],
    'jest-hoist',
  ],
};
