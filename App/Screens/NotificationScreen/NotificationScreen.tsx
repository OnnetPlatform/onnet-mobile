import React from 'react';
import { SafeAreaView, SectionList } from 'react-native';
import data, { Notification as NotificationType, formatList } from './data';
import { Blur, Icon, Text } from '../../Components/atoms';
import { SectionListRenderItem } from 'react-native';
import Notification from './Notification/Notification';
import { useColors } from '../../Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles, { withColors, withInsets } from './NotificationScreen.styles';

export const NotificationScreen: React.FC = () => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const coloredStyles = withColors(colors);
  const insetedStyles = withInsets(insets);
  const sections = formatList(data);

  const renderItem: SectionListRenderItem<
    NotificationType,
    { title: string; data: NotificationType[] }
  > = ({ item, index }) => <Notification {...{ notification: item, index }} />;

  return (
    <>
      <Blur style={insetedStyles.header}>
        <Icon name={'bell-outline'} />
        <Text fontSize={18} weight="bold" style={styles.titleLeft}>
          Notifications
        </Text>
      </Blur>

      <SafeAreaView style={styles.screen}>
        <SectionList
          sections={sections}
          renderSectionHeader={({ section }) => (
            <Text style={coloredStyles.sectionHeader} weight="bold">
              {section.title}
            </Text>
          )}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
};
export default NotificationScreen;
