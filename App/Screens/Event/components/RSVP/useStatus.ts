import { useMemo } from 'react';

export default () =>
  useMemo(
    () => [
      { title: 'Accept', color: 'green', key: 'ACCEPTED' },
      { title: 'Tentative', color: 'yellow', key: 'TENTATIVE' },
      { title: 'Decline', color: 'red', key: 'DECLINED' },
      { title: 'No Response', color: 'gray', key: 'INVITED' },
    ],
    []
  );
