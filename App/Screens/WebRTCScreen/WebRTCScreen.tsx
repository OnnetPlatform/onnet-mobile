import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export const WebRTCScreen: React.FC = () => {
  return <SafeAreaView style={styles.screen} />;
};

const styles = StyleSheet.create({
  screen: { flex: 1, flexGrow: 1 },
  localStream: {
    width: 150,
    height: 200,
    position: 'absolute',
    bottom: 44,
    right: 22,
    borderRadius: 22,
    overflow: 'hidden',
  },
});
