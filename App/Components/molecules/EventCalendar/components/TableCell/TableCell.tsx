import { useColors } from '@Theme/index';
import {
  Group,
  LinearGradient,
  Paragraph,
  ParagraphProps,
  RoundedRect,
  RoundedRectProps,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';

export const TableCell: React.FC<{
  container: Exclude<RoundedRectProps, 'r'>;
  subtitle: ParagraphProps;
  title: ParagraphProps;
  index: number;
}> = ({ container, subtitle, title, index }) => {
  const colors = useColors();
  return (
    <Group key={index}>
      <RoundedRect {...container} r={18} color={colors.secondaryBackground}>
        <LinearGradient
          colors={[
            colors.secondaryBackground,
            colors.secondaryBackground,
            colors.secondaryBackground,
            colors.blur,
            colors.secondaryBackground,
            colors.secondaryBackground,
            colors.secondaryBackground,
          ]}
          start={vec(0, 0)}
          end={vec(7, 7)}
          mode={'mirror'}
        />
      </RoundedRect>
      <Paragraph {...title} />
      <Paragraph {...subtitle} />
    </Group>
  );
};
