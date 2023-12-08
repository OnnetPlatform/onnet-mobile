cmake_minimum_required(VERSION 3.13)

find_package(react-native-worklets-core REQUIRED CONFIG)

# Define the library name here.
project(onnet_appmodules)

# This file includes all the necessary to let you build your application with the New Architecture.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)


target_link_libraries(
    ${PACKAGE_NAME}
    # ... other libs
    react-native-worklets-core::rnworklets
)