export type SnackbarProps = {
  title?: string;
  subtitle?: string;
  variant?: 'SUCCESS' | 'WARRNING' | 'ERROR';
};

export type SnackbarRefType = { showSnackbar(props: SnackbarProps): void };
