import React, { useCallback, useMemo } from 'react';

import { FlashList, FlashListProps, ListRenderItem } from '@shopify/flash-list';

export type CustomSectionList = {
  SectionListHeaderComponent: React.FunctionComponent<{ title: string }>;
  SectionListItemComponent: React.FunctionComponent<{ item: any }>;
};

export type SectionListProps = CustomSectionList &
  Omit<FlashListProps<any>, 'renderItem'>;

export const SectionsList = React.forwardRef<FlashList<any>, SectionListProps>(
  (props, ref) => {
    const { data, SectionListHeaderComponent, SectionListItemComponent } =
      props;

    const stickyHeaderIndices = data
      ? useMemo(
          () =>
            data
              .map((item, index) => {
                if (typeof item === 'string') {
                  return index;
                } else {
                  return null;
                }
              })
              .filter((item) => item !== null) as number[],
          [data]
        )
      : [];

    const itemType = useCallback((item: string | any) => {
      return typeof item === 'string' ? 'sectionHeader' : 'row';
    }, []);

    const renderItem: ListRenderItem<string | any> = useCallback(
      ({ item, index }) => {
        if (typeof item === 'string') {
          return <SectionListHeaderComponent title={item} key={item} />;
        } else {
          return <SectionListItemComponent item={item} key={index} />;
        }
      },
      []
    );

    return (
      <FlashList
        {...props}
        stickyHeaderIndices={stickyHeaderIndices}
        getItemType={itemType}
        estimatedItemSize={100}
        data={data}
        renderItem={renderItem}
        ref={ref}
      />
    );
  }
);

export default SectionsList;
