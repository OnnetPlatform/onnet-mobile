import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { UserCreators } from '@Khayat/Redux';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { GradientCard } from '@Skia/GradientCard/GradientCard';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import BottomSheetInput from '@Molecules/BottomSheetInput';
import useStyles from './styles';
import Icon from '@Atoms/Icon';
import { WorkspacesLists } from './components/WrokspacesList';

export const UserJoinedWorkspaces: React.FC = () => {
  const { workspaces } = useSelector(UserSelector);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const createSheet = useRef<BottomSheet>(null);
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screen}>
      <GradientCard />
      <View style={styles.body}>
        <Text weight="bold" fontSize={24} textAlign="center">
          Workspaces
        </Text>
        <Text textAlign="center" style={styles.subtitle}>
          {workspaces.length > 0
            ? 'We found some workspaces associated with this account'
            : "We didn't find any workspaces associated with this account"}
        </Text>
      </View>
      <WorkspacesLists />
      <Separator size={'md'} />
      <SolidButton
        onPress={() => {
          createSheet.current?.expand();
        }}>
        <Text weight="bold">Create workspace</Text>
      </SolidButton>
      <BottomSheet
        enableDynamicSizing={true}
        index={-1}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        ref={createSheet}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        keyboardBlurBehavior="restore"
        backgroundStyle={styles.bottom_sheet_background}>
        <BottomSheetView style={styles.bottom_sheet_view}>
          <View style={styles.bottom_sheet_footer}>
            <View style={{ width: 24 }} />
            <Text fontSize={24} weight="bold">
              Create Workspace
            </Text>
            <Pressable
              hitSlop={16}
              onPress={() => createSheet.current?.close()}>
              <Icon name={'close-outline'} />
            </Pressable>
          </View>
          <Separator size={'md'} />
          <BottomSheetInput
            onChangeText={setName}
            placeholder="Workspace Name"
            textAlign="center"
          />
          <Separator size={'md'} />
          <View>
            <SolidButton
              onPress={() => {
                dispatch(UserCreators.createWorkspace(name));
              }}>
              <Text weight="bold">Create & Join</Text>
            </SolidButton>
            <Separator size={'md'} />
            <Text weight="light" fontSize={12} textAlign="center">
              By continuing, you’re agreeing to our main services agreement,
              user terms of service and Onnet supplemental Terms. Additional
              disclosures are available in our privacy policy and terms policy.
            </Text>
          </View>
          <Separator size={'md'} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default UserJoinedWorkspaces;
