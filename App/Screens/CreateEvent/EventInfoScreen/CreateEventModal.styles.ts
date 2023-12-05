import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    titleIputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondaryBackground,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      paddingHorizontal: 22,
      backgroundColor: colors.secondaryBackground,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    body: {
      padding: 22,
    },
    input: {
      backgroundColor: colors.secondaryBackground,
      borderRadius: 8,
      fontSize: 16,
      color: colors.text,
      flex: 1,
      padding: 16,
    },
    item: {
      padding: 16,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemWrapper: {
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: colors.secondaryBackground,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopColor: colors.background,
      borderTopWidth: 1,
    },
    rightSection: {
      flex: 1,
      borderLeftColor: colors.background,
      borderLeftWidth: 1,
      height: '100%',
      padding: 16,
    },
    flex: {
      flex: 1,
      padding: 16,
    },
    hoursRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    icon: {
      width: 16,
      height: 16,
    },
  });
