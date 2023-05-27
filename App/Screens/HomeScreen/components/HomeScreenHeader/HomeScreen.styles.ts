import { Dimensions, StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../../../Theme/Colors';
const { width } = Dimensions.get('window');
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 11,
    padding: 22,
  },
  headerTitle: {
    textTransform: 'uppercase',
  },
  listContainer: {
    paddingBottom: 22,
  },
  spacer: {
    width: 16,
    backgroundColor: 'red',
  },
  day: {
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    slotContainer: {
      width: width / 7,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 11,
    },
    dateSlot: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export const withInsets = (insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      paddingTop: insets.top,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      overflow: 'hidden',
    },
  });
