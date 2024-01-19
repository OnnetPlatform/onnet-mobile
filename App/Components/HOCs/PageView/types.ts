import { ReactElement } from 'react';
import { SharedValue } from 'react-native-reanimated';
import { Edges } from 'react-native-safe-area-context';

export type PageViewProps = {
  title: string;
  children: ReactElement;
  loading?: boolean;
  isGradientEnabled?: boolean;
  edges?: Edges;
  hide?: SharedValue<number>;
};
