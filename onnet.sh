echo installing dependencies ...

yarn add @react-native-community/async-storage react-redux 
yarn add react-native-safe-area-context react-native-gesture-handler @shopify/react-native-skia react-native-reanimated react-native-vision-camera react-native-worklets-core react-native-config react-native-callkeep react-native-webrtc react-native-screens react-native-section-list-get-item-layout react-native-svg realm socket.io-client react-native-incall-manager
yarn add react-native-linear-gradient react-native-redash @apollo/client @gorhom/bottom-sheet @react-native-camera-roll/camera-roll @react-native-community/blur @react-native-masked-view/masked-view @react-navigation/bottom-tabs @react-navigation/elements @react-navigation/native @react-navigation/native-stack @realm/react @sentry/react-native
yarn add @ui-kitten/components @ui-kitten/eva-icons
yarn add uuid graphql lodash moment numeral 
yarn add --dev  metro-react-native-babel-preset eslint-config-prettier eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-local-rules eslint-plugin-n eslint-plugin-promise eslint-plugin-react eslint-plugin-react-native eslint-plugin-simple-import-sort metro-react-native-babel-preset
yarn add --dev babel-plugin-module-resolver @types/uuid @tsconfig/react-native @types/jest @types/react @types/react-test-renderer typescript

cd ios && pod install
