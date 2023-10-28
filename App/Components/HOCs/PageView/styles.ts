import { ThemeColors } from 'App/Theme/Colors';
import { StyleSheet } from 'react-native';

const withColors = (theme: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
      flex: 1,
      flexGrow: 1,
    },
  });

export default withColors;
