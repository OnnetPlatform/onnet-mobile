import { BlurView } from '@react-native-community/blur';
import { useColors } from '../../../../Theme';
import { View, useColorScheme } from 'react-native';
import { withColors } from '../EventsList/EventsList.styles';
import { Text } from '../../../../Components/atoms';
import React from 'react';

export const SectionHeader: React.FC<{ section: any }> = ({ section }) => {
  const colors = useColors();
  const isDark = useColorScheme() === 'dark';
  const colorStyles = withColors(colors);

  return (
    <BlurView
      blurAmount={1}
      blurType={isDark ? 'thinMaterialDark' : 'light'}
      style={colorStyles.header}>
      <View style={{ width: 6, height: 6, backgroundColor: colors.text, borderRadius: 12 }} />
      <Text style={{ marginLeft: 8, textTransform: 'uppercase' }} weight="semibold" fontSize={12}>
        {section.title}
      </Text>
    </BlurView>
  );
};

export default React.memo(SectionHeader, (prev, next) => prev.section.title === next.section.title);
