import { ReactElement } from 'react';

export type PageViewProps = {
  title: string;
  children: ReactElement;
  loading?: boolean;
  isGradientEnabled?: boolean;
};
