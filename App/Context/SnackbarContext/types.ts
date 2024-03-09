import { SnackbarProps } from '@Molecules/Snackbar/types';

export type SnackbarContextType = {
  showSnackbar(props: SnackbarProps | undefined): void;
};
