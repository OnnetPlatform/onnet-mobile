export type AlertStateTypes = {
  onPress?(): void;
  visible?: boolean;
  title?: string;
  subtitle?: string;
};

export type AlertContextTypes =
  | (AlertStateTypes & {
      configureAlert(state: AlertStateTypes): void;
    })
  | undefined;
