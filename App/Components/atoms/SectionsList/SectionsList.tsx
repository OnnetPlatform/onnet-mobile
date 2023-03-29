import React, { useMemo } from 'react';
import { SectionList, View } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import _ from 'lodash';
import moment from 'moment';
import { SectionsListProps } from './types';
import styles from './SectionsList.styles';

export const SectionsList: React.FC<SectionsListProps> = ({ data, ...props }) => {
  const sort = (a: (typeof data)[0], b: (typeof data)[0]) => {
    return a.date.getDate() > b.date.getDate() ? 1 : -1;
  };

  const dObj = (data: any, title: string) => ({
    data: data.sort(sort),
    title,
  });

  const sortedData = useMemo(
    () =>
      _(data)
        .sort((a, b) => (a.date.getMonth() > b.date.getMonth() ? 1 : -1))
        .groupBy((n) => moment(n.date).format('MMMM'))
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

  return (
    <SectionList
      {...props}
      sections={sortedData}
      // @ts-ignore
      getItemLayout={getItemLayout}
      SectionSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};
export default SectionsList;
