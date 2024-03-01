import { BottomSheetProps } from '@Molecules/BottomSheet/types';

export type BottomSheetContextType =
  | {
      hideBottomSheet: () => void;
      showBottomSheet: (props: BottomSheetProps) => void;
    }
  | undefined;
