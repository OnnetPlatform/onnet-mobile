import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@Theme';
import { Header } from '@Atoms';
import { PageViewProps } from './types';
import withColors from './styles';
import { View } from 'react-native';

export const PageView: React.FC<PageViewProps> = ({ title, children }) => {
  const colors = useColors();
  const styles = withColors(colors);

  return (
    <SafeAreaView style={styles.screen} edges={['bottom', 'left', 'right']}>
      <Header title={title} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

export default PageView;
