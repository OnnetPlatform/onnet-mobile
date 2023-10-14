import React from 'react';
import { SafeAreaView } from 'react-native';
import { CirclesLoading } from './Components/CirclesLoading';

export const AnimationScreen: React.FC = () => (
  <SafeAreaView style={{ flex: 1, flexGrow: 1, backgroundColor: 'red' }}>
    <CirclesLoading />
  </SafeAreaView>
);
export default AnimationScreen;
