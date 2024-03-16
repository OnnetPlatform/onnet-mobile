import { useColors } from '@Theme/index';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const colors = useColors();
  return StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
      padding: 22,
      justifyContent: 'space-between',
      paddingBottom: 0,
    },
    body: {
      alignItems: 'center',
    },
    subtitle: {
      width: '80%',
    },
    workspace_item_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    workspace_item_body: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    workspace_item_avatar: {
      width: 40,
      height: 40,
      borderRadius: 8,
    },
    bottom_sheet_view: {
      paddingHorizontal: 22,
      minHeight: 50,
      paddingBottom: 22,
    },
    bottom_sheet_background: {
      backgroundColor: colors.background,
    },
    bottom_sheet_footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};
export default useStyles;
