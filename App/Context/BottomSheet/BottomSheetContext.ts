import React, { useContext } from 'react';

import { BottomSheetContextType } from './types';

export const BottomSheetContext =
  React.createContext<BottomSheetContextType>(undefined);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      'Bottom Sheet context must be used in within BottomSheetProvider'
    );
  }
  return context;
};
export default BottomSheetContext;
