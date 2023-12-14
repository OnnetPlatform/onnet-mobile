import { SolidButtonProps } from '@Molecules/SolidButton/types';
import { ReactElement } from 'react';

export type BottomSheetProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
  body?: (() => ReactElement) | string;
  cta?: SolidButtonProps;
  customView?: ReactElement;
};
