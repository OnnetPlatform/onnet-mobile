import { BottomSheetProps } from '@Molecules/BottomSheet/types';

export type BottomSheetContextType = Optional<{
  hideBottomSheet: () => void;
  showBottomSheet: (props: BottomSheetProps) => void;
}>;
