import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../../../Theme/Colors';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 22,
    justifyContent: 'space-between',
    paddingHorizontal: 54,
    paddingBottom: 11,
  },
  headerTitle: {
    textTransform: 'uppercase',
  },
  listContainer: {
    paddingBottom: 22,
    paddingHorizontal: 54,
  },
  spacer: {
    width: 16,
    backgroundColor: 'red',
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    dateSlot: {
      width: 48,
      height: 48,
      borderRadius: 32,
      backgroundColor: colors.yellow,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.black,
      marginRight: 8,
    },
  });

export const withInsets = (insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      marginHorizontal: -32,
      paddingTop: insets.top,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      overflow: 'hidden',
    },
  });
