import { Header, HeaderLoader } from '@Atoms';
import { useColors } from '@Theme';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import withColors from './styles';
import { PageViewProps } from './types';

export const PageView: React.FC<PageViewProps> = ({
  title,
  children,
  loading,
}) => {
  const colors = useColors();
  const styles = withColors(colors);

  return (
    <SafeAreaView style={styles.screen} edges={['bottom', 'left', 'right']}>
      <Header title={title} />
      {loading ? <HeaderLoader /> : null}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

export default PageView;
