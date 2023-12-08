import { SolidButtonProps } from '@Molecules/SolidButton/types';
import { ReactElement } from 'react';

export type BottomSheetProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  cta?: SolidButtonProps;
  customView?: ReactElement;
};
