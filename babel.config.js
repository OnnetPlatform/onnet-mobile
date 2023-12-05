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
          '@HOCs': './App/Components/HOCs',
          '@Atoms': './App/Components/atoms',
          '@Molecules': './App/Components/molecules',
          '@Utils': './App/Utils',
          '@Screens': './App/Screens',
          '@Theme': './App/Theme',
          '@Metrics': './App/Theme/Metrics',
          '@Skia': './App/Components/Skia',
          '@Khayat': './App/Libs/@Khayat/src',
          '@Context': './App/Context/',
        },
      },
    ],
    'jest-hoist',
  ],
};
