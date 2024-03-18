import { SharedValue } from 'react-native-reanimated';
import { Edges } from 'react-native-safe-area-context';

export type PageViewProps = {
  title: string;
  loading?: boolean;
  isGradientEnabled?: boolean;
  edges?: Edges;
  hide?: SharedValue<number>;
  rightIcon?: string;
  onRightIconPressed?(): void;
};
