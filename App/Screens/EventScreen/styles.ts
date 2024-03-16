import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export const useStyles = (colors: ThemeColors) =>
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
      backgroundColor: colors.secondaryBackground,
      padding: 2,
      height: 20,
      borderRadius: 4,
      paddingHorizontal: 4,
    },
    calendar_icon: {
      width: 16,
      marginRight: 2,
    },
    organizer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 44,
    },
    button_container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 44,
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
  });
