import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet from '@Molecules/BottomSheet';
import { BottomSheetProps } from '@Molecules/BottomSheet/types';
import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';

import { BottomSheetContext } from './BottomSheetContext';

export const BottomSheetProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const ref = useRef<BottomSheetMethods>(null);
  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>();

  const hideBottomSheet = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, [bottomSheetProps, ref]);

  const showBottomSheet = useCallback(
    (props: BottomSheetProps) => {
      setBottomSheetProps(props);
      if (ref.current) {
        ref.current.expand();
      }
    },
    [ref]
  );

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      <BottomSheet ref={ref} {...bottomSheetProps} />
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;
