import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabbar: {
    paddingVertical: 8,
    overflow: 'hidden',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
  },
});
