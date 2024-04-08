import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const useStyles = (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    },
    date_container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    start_button: {
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderColor: colors.blue,
      borderWidth: 1,
      backgroundColor: colors.background,
    },
    calendar_icon: {
      width: 24,
      height: 24,
    },
    organizer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    button_container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    summary_container: {
      padding: 16,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 16,
      marginBottom: 22,
    },
    list_content: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    joined_user: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reminder_button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mins_button: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cta: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: insets.bottom,
    },
  });
