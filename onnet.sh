echo installing dependencies ...

yarn add @react-native-community/async-storage  react-redux redux redux-persist redux-persist-seamless-immutable redux-saga reduxsauce seamless-immutable
yarn add @types/seamless-immutable --dev

cd ios && pod install
