import { ReactElement } from 'react';

export type AlertStateTypes = {
  onPress?(): void;
  visible?: boolean;
  title?: string;
  subtitle?: string;
  customView?(): ReactElement;
};

export type AlertContextTypes =
  | (AlertStateTypes & {
      configureAlert(state: AlertStateTypes): void;
    })
  | undefined;
