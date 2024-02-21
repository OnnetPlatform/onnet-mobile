import { BOTTOM_BAR_HEIGHT } from '@Theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabbar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT,
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
  },
  badge: {
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 12,
    top: -5,
    left: 50,
    zIndex: 100,
    minWidth: 18,
    minHeight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
});
