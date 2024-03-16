import Icon from '@Atoms/Icon';
import RadioButton from '@Atoms/RadioButton';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useBottomSheet } from '@Context/BottomSheet';
import { PageView } from '@HOCs';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme/index';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

import withColors from './CreateAnnouncement.styles';

export const CreateAnnouncement: React.FC = () => {
  const colors = useColors();
  const styles = withColors(colors);
  const insets = useSafeAreaInsets();
  const [record, setRecord] = useState<boolean>(false);
  const { requestPermission } = useCameraPermission();
  const { requestPermission: requestMicPermission } = useMicrophonePermission();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const navigation = useNavigation();
  const onRadioPressed = useCallback(() => {
    showBottomSheet({
      icon: 'mic-outline',
      title: 'Welcome to bulletin',
      subtitle: 'Where live audio conversations',
      body: 'Lorem ipsum dolor sit asmet, consectetur adipiscing elit. Vivamus neclacus malesuada, porta neque vitae, luctus erat. Phasellus rhoncus,urna in congue facilisis, lectus est tristique arcu, eu varius nislipsum at massa. Aenean dictum non nibh vel tristique. Aliquam inaugue ut ante efficitur aliquam. In consectetur egestas neque aultricies. Nunc vehicula tellus quis ante molestie, quis mollislibero cursus. Duis feugiat, nulla eget posuere euismod, ante leoporttitor nunc, ut varius arcu lorem eu magna. Etiam iaculismolestie magna, vitae porttitor arcu egestas id. Vivamus sit ameteros sit amet purus vehicula sollicitudin sed in odio.',
      cta: {
        title: 'Got it',
        color: colors.turquoise,
        textColor: colors.black,
        variant: 'OUTLINED',
      },
    });
    setRecord((value) => !value);
  }, [record]);

  useEffect(() => {
    if (record) {
      requestPermission().then(requestMicPermission);
    }
  }, [record]);

  const onInfoPressed = useCallback(() => {
    showBottomSheet({
      icon: 'radio-outline',
      title: 'Welcome to bulletin',
      subtitle: 'Where live audio conversations',
      body: 'Lorem ipsum dolor sit asmet, consectetur adipiscing elit. Vivamus neclacus malesuada, porta neque vitae, luctus erat. Phasellus rhoncus,urna in congue facilisis, lectus est tristique arcu, eu varius nislipsum at massa. Aenean dictum non nibh vel tristique. Aliquam inaugue ut ante efficitur aliquam. In consectetur egestas neque aultricies. Nunc vehicula tellus quis ante molestie, quis mollislibero cursus. Duis feugiat, nulla eget posuere euismod, ante leoporttitor nunc, ut varius arcu lorem eu magna. Etiam iaculismolestie magna, vitae porttitor arcu egestas id. Vivamus sit ameteros sit amet purus vehicula sollicitudin sed in odio.',
      cta: {
        title: 'Got it',
        color: colors.turquoise,
        textColor: colors.black,
        onPress: () => {
          hideBottomSheet();
        },
      },
    });
  }, []);

  return (
    <>
      <PageView title={'Bulletin'} isGradientEnabled>
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.screen}
            keyboardVerticalOffset={insets.bottom + insets.top + 30}>
            <View style={styles.screen}>
              <TextInput
                placeholder="What's your bulletin about?"
                style={styles.input}
              />
              <Separator size={'md'} />
              <RadioButton
                title="Record"
                active={record}
                onPress={onRadioPressed}
              />
            </View>
            <View>
              <View style={styles.rowCenter}>
                <SolidButton
                  color={colors.turquoise}
                  title={'Start now'}
                  style={styles.flex}
                  textColor={colors.background}
                  // @ts-ignore
                  onPress={() => navigation.navigate('MediaRecorder')}
                />
                <Separator horizontal />

                <SolidButton variant="OUTLINED" title={''} color={''}>
                  <Icon name={'mic-outline'} />
                </SolidButton>
              </View>
              <Separator />
              <View style={styles.info}>
                <Icon name={'alert-circle-outline'} style={styles.infoIcon} />
                <Separator horizontal />
                <Pressable onPress={onInfoPressed}>
                  <Text fontSize={14}>Know more about Bulletins</Text>
                </Pressable>
              </View>

              <Separator />
            </View>
          </KeyboardAvoidingView>
        </>
      </PageView>
    </>
  );
};

export default CreateAnnouncement;
