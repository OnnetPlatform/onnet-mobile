import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { useColors } from '@Theme/index';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetBody, BottomSheetIcon } from './components';
import withColors from './styles';
import { BottomSheetProps } from './types';

export const BottomSheet = React.forwardRef<
  BottomSheetMethods,
  BottomSheetProps
>((props, ref) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = withColors(colors, insets);
  const BackdropView = useCallback(
    (args: any) => <BottomSheetBackdrop {...args} />,
    []
  );

  const renderBottomsheetContent = useCallback(
    () => (
      <>
        <BottomSheetIcon {...props} />
        {props.title && (
          <Text fontSize={22} weight="bold">
            {props.title}
          </Text>
        )}
        {props.subtitle ? (
          <>
            <Text weight="light">{props.subtitle}</Text>
            <Separator size={'md'} />
          </>
        ) : null}
        <BottomSheetBody {...props} />
        {props.cta ? <SolidButton {...props.cta} /> : null}
      </>
    ),
    [props]
  );

  const handleComponent = useCallback(() => <View />, []);

  return (
    <GorhomBottomSheet
      ref={ref}
      index={-1}
      handleComponent={handleComponent}
      snapPoints={[1]}
      backdropComponent={BackdropView}
      enableDynamicSizing
      backgroundStyle={styles.background}
      style={styles.bottomSheet}
      enablePanDownToClose={true}>
      <BottomSheetView style={styles.container}>
        {renderBottomsheetContent()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
});

export default BottomSheet;
