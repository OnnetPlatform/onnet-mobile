import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../../Components/atoms';
import {useColors} from '@Theme';
import {Galaxy} from '../../SplashScreen/Galaxy';
import {AnimatedScene} from '../AnimatedScene/AnimatedScene';
import AppLogo from '../../../Components/Skia/AppLogo/AppLogo';
import {Polyrhythms} from '../../../Components/Skia/Polyrhythms/Polyrhythms';
import LogoLoading from '../../SplashScreen/LogoLoading/LogoLoading';
import {EventAnimation} from '../EventAnimation/EventAnimation';

export const SceneContainer: React.FC<{step: number; ready: boolean}> = ({
  step,
  ready,
}) => {
  const colors = useColors();
  const scene_1 = () => {
    return (
      <AnimatedScene>
        <Text color={colors.white} fontSize={65} weight="black">
          LOREM ,
        </Text>
        <Text color={colors.white}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          ultricies feugiat sapien, sed sodales tellus euismod commodo.
          Suspendisse tempor eros sed tellus luctus,
        </Text>
        <Galaxy />
      </AnimatedScene>
    );
  };
  if (step === 1 && ready) return scene_1();
  if (step === 2 && ready)
    return (
      <AnimatedScene>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {transform: [{scale: 0.3}]},
            {top: -600, right: -350},
          ]}>
          <Polyrhythms />
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text
            color={colors.white}
            style={{marginTop: 16}}
            fontSize={48}
            weight="black">
            Events
          </Text>
          <View style={{width: '100%'}}>
            <EventAnimation />
          </View>

          <View />
        </View>
      </AnimatedScene>
    );
  if (step === 3 && ready) return <LogoLoading />;
  if (step === 0) return <AppLogo />;
  return <View />;
};
