import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Polyrhythms } from '../../Components/Skia/Polyrhythms/Polyrhythms';
import Texture from '@Skia/Texture/Texture';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { useAppNavigation } from '@Hooks/useAppNavigation';

export const SplashScreen: React.FC = () => {
  const { access_token } = useSelector(AuthSelector);
  const { current_workspace } = useSelector(UserSelector);
  const isFocused = useIsFocused();
  const navigation = useAppNavigation();

  useEffect(() => {
    setTimeout(() => {
      try {
        if (isFocused) {
          if (access_token && !current_workspace.workspace_access_token) {
            navigation.navigate('UserJoinedWorkspaces');
          } else if (access_token && current_workspace.workspace_access_token) {
            navigation.navigate('MainNavigation');
          } else {
            navigation.navigate('AuthenticationScreen');
          }
        }
      } catch (error) {}
    }, 2000);
  }, [isFocused, access_token]);

  return (
    <SafeAreaView style={styles.screen}>
      <Texture />
      <Polyrhythms />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
  },
});

export default SplashScreen;
