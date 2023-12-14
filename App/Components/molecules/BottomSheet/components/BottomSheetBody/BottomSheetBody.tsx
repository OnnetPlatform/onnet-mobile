import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { BottomSheetProps } from '@Molecules/BottomSheet/types';
import React from 'react';

export const BottomSheetBody: React.FC<BottomSheetProps> = (props) => {
  const { body } = props;

  if (!body) {
    return null;
  }

  return (
    <>
      {typeof body === 'string' ? (
        <Text textAlign={'center'}>{body}</Text>
      ) : (
        body()
      )}
      <Separator size={'md'} />
    </>
  );
};

export default BottomSheetBody;
