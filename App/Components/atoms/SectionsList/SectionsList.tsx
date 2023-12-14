import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { SectionList } from 'react-native';

import { SectionsListProps } from './types';

export const SectionsList: React.FC<SectionsListProps> = ({
  data,
  scrollToDate,
  ...props
}) => {
  const ref = useRef<SectionList<any, any>>(null);

  useEffect(() => {
    if (scrollToDate && ref.current) {
      const index = data.findIndex(
        (date: any) =>
          date.title === moment(scrollToDate).format('dddd, MMMM Do')
      );
      if (index > -1) {
        ref.current.scrollToLocation({
          sectionIndex: index,
          animated: true,
          itemIndex: 0,
        });
      }
    }
  }, [scrollToDate]);

  return (
    <SectionList
      ref={ref}
      {...props}
      sections={data}
      // @ts-ignore
    />
  );
};
export default React.memo(
  SectionsList,
  (prev, next) =>
    prev.data.length === next.data.length &&
    prev.scrollToDate?.toString() === next.scrollToDate?.toString()
);
