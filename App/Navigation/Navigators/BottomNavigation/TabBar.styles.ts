import {StyleSheet} from 'react-native';
import {BOTTOM_BAR_HEIGHT} from '@Theme';

export default StyleSheet.create({
  tabbar: {
    paddingVertical: 8,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT,
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
  badge: {
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 12,
    top: 0,
    left: 45,
    zIndex: 100,
    minWidth: 18,
    minHeight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
});
