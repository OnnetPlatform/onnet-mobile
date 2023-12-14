cmake_minimum_required(VERSION 3.13)

find_package(react-native-worklets-core REQUIRED CONFIG)

target_link_libraries(
    ${PACKAGE_NAME}
    # ... other libs
    react-native-worklets-core::rnworklets
)