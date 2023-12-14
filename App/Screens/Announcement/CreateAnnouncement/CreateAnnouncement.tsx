import Icon from '@Atoms/Icon';
import RadioButton from '@Atoms/RadioButton';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { PageView } from '@HOCs';
import BottomSheet from '@Molecules/BottomSheet';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { useColors } from '@Theme/index';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';

import withColors from './CreateAnnouncement.styles';

export const CreateAnnouncement: React.FC = () => {
  const colors = useColors();
  const styles = withColors(colors);
  const insets = useSafeAreaInsets();
  const [record, setRecord] = useState<boolean>(false);
  const ref = useRef<BottomSheetMethods>(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraDevice, setCamera] = useState<CameraDevice>();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (frame.pixelFormat === 'rgb') {
      const data = frame.toArrayBuffer();
      console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`);
    }
  }, []);

  const onRadioPressed = useCallback(() => {
    setRecord((value) => !value);
  }, [ref]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then((result) => {
        if (result) {
          setCamera(device);
        }
      });
    }
  }, [hasPermission, device]);

  return (
    <>
      <PageView title={'Bulletin'} isGradientEnabled>
        <>
          {cameraDevice ? (
            <Camera
              frameProcessor={frameProcessor}
              device={cameraDevice}
              isActive={true}
            />
          ) : null}
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
                <Pressable
                  onPress={() => {
                    ref.current?.expand();
                  }}>
                  <Text fontSize={14}>Know more about Bulletins</Text>
                </Pressable>
              </View>

              <Separator />
            </View>
          </KeyboardAvoidingView>
        </>
      </PageView>
      <BottomSheet
        icon={'radio-outline'}
        title={'Welcome to bulletin'}
        subtitle="Where live audio conversations"
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec lacus malesuada, porta neque vitae, luctus erat. Phasellus rhoncus, urna in congue facilisis, lectus est tristique arcu, eu varius nisl ipsum at massa. Aenean dictum non nibh vel tristique. Aliquam in augue ut ante efficitur aliquam. In consectetur egestas neque a ultricies. Nunc vehicula tellus quis ante molestie, quis mollis libero cursus. Duis feugiat, nulla eget posuere euismod, ante leo porttitor nunc, ut varius arcu lorem eu magna. Etiam iaculis molestie magna, vitae porttitor arcu egestas id. Vivamus sit amet eros sit amet purus vehicula sollicitudin sed in odio.'
        }
        cta={{
          title: 'Got it',
          color: colors.turquoise,
          textColor: colors.black,
        }}
        ref={ref}
      />
    </>
  );
};

export default CreateAnnouncement;
