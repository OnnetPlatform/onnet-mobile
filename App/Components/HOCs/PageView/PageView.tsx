import { Header, HeaderLoader } from '@Atoms';
import { useColors } from '@Theme';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientLayout } from '..';
import withColors from './styles';
import { PageViewProps } from './types';

export const PageView: React.FC<PageViewProps> = ({
  title,
  children,
  loading,
  isGradientEnabled,
}) => {
  const colors = useColors();
  const styles = withColors(colors);
  const background = useMemo(
    () => ({
      backgroundColor: isGradientEnabled ? 'transparent' : colors.background,
    }),
    []
  );
  const Page = () => (
    <SafeAreaView
      style={[styles.screen, background]}
      edges={['bottom', 'left', 'right']}>
      <Header title={title} />
      {loading ? <HeaderLoader /> : null}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );

  if (isGradientEnabled) {
    return (
      <GradientLayout>
        <Page />
      </GradientLayout>
    );
  }
  return <Page />;
};

export default PageView;
