import { useColors } from '@Theme';
import React from 'react';
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItem,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Blur, Icon, Separator, Text } from '@Atoms';
import data, { formatList, Notification as NotificationType } from './data';
import Notification from './Notification/Notification';
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
        <View style={styles.row}>
          <Icon name={'bell-outline'} />
          <Separator size={'md'} horizontal />
          <Text fontSize={18} weight="bold">
            Notifications
          </Text>
        </View>
        <Icon name={'settings-outline'} />
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
