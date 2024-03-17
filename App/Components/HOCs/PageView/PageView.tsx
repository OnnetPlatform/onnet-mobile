import { Header, HeaderLoader } from '@Atoms';
import { useColors } from '@Theme';
import React, { useCallback, useMemo } from 'react';
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
  edges = ['bottom', 'left', 'right'],
  hide,
}) => {
  const colors = useColors();
  const styles = withColors(colors);
  const background = useMemo(
    () => ({
      backgroundColor: isGradientEnabled ? 'transparent' : colors.background,
    }),
    [isGradientEnabled, colors]
  );

  const Page = useCallback(
    () => (
      <SafeAreaView style={[styles.screen, background]} edges={edges}>
        <Header hide={hide} title={title} />
        {loading ? <HeaderLoader /> : null}
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    ),
    [loading, edges, hide]
  );
  const renderWithGradient = useCallback(
    () => <GradientLayout>{Page()}</GradientLayout>,

    [isGradientEnabled, loading, edges, hide]
  );

  if (isGradientEnabled) {
    return renderWithGradient();
  }
  return Page();
};

export default React.memo(
  PageView,
  (prev, next) =>
    prev.children === next.children &&
    prev.hide === next.hide &&
    prev.isGradientEnabled === next.isGradientEnabled &&
    prev.loading === next.loading &&
    prev.title === next.title
);
