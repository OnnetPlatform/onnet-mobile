import {
  Group,
  Paragraph,
  ParagraphProps,
  RoundedRect,
  RoundedRectProps,
} from '@shopify/react-native-skia';
import React from 'react';

export const TableCell: React.FC<{
  container: Exclude<RoundedRectProps, 'r'>;
  subtitle: ParagraphProps;
  title: ParagraphProps;
  index: number;
}> = ({ container, subtitle, title, index }) => {
  return (
    <Group key={index}>
      <RoundedRect {...container} r={18} />
      <Paragraph {...title} />
      <Paragraph {...subtitle} />
    </Group>
  );
};
