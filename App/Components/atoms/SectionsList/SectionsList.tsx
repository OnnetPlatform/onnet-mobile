import React, { useEffect, useMemo, useRef } from 'react';
import { SectionList } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import _ from 'lodash';
import moment from 'moment';
import { SectionsListProps } from './types';

export const SectionsList: React.FC<SectionsListProps> = ({ data, scrollToDate, ...props }) => {
  const ref = useRef<SectionList<any, any>>(null);
  const sort = (a: (typeof data)[0], b: (typeof data)[0]) => (a.date > b.date ? 1 : -1);
  const dObj = (data: any, title: string) => ({ data: data.sort(sort), title });

  const sortedData = useMemo(
    () =>
      _(data)
        .sort(sort)
        .groupBy((n) => moment(n.date).format('dddd, MMMM Do'))
        .map(dObj)
        .value(),
    []
  );

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 50,
    getSeparatorHeight: () => 16,
    getSectionHeaderHeight: () => 30,
    getSectionFooterHeight: () => 0,
  });

  useEffect(() => {
    if (scrollToDate && ref.current) {
      const index = sortedData.findIndex(
        (date) => date.title === moment(scrollToDate).format('dddd, MMMM Do')
      );
      if (index > -1)
        ref.current.scrollToLocation({ sectionIndex: index, animated: true, itemIndex: 0 });
    }
  }, [scrollToDate, ref, ref.current]);

  return (
    <SectionList
      ref={ref}
      {...props}
      sections={sortedData}
      // @ts-ignore
      getItemLayout={getItemLayout}
    />
  );
};
export default SectionsList;
