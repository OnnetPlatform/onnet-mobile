import { Text } from '@Atoms';
import { BlurView } from '@react-native-community/blur';
import { useColors } from '@Theme';
import moment from 'moment';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import { withColors } from '../EventsList/EventsList.styles';

export const SectionHeader: React.FC<{ section: any }> = ({ section }) => {
  const colors = useColors();
  const isDark = useColorScheme() === 'dark';
  const colorStyles = withColors(colors);

  return (
    <BlurView
      blurAmount={1}
      blurType={isDark ? 'thinMaterialDark' : 'light'}
      style={colorStyles.header}>
      <View
        style={{
          width: 6,
          height: 6,
          backgroundColor: colors.text,
          borderRadius: 12,
        }}
      />
      <Text
        style={{ marginLeft: 8, textTransform: 'uppercase' }}
        weight="semibold"
        fontSize={12}>
        {moment(new Date(+section.title)).format('dddd, MMMM Do')}
      </Text>
    </BlurView>
  );
};

export default React.memo(
  SectionHeader,
  (prev, next) => prev.section.title === next.section.title
);
