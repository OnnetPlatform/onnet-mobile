import { SectionListProps } from 'react-native';

export type SectionsListProps = Omit<SectionListProps<any>, 'sections' | 'ref'> & {
  scrollToDate?: Date;
};
