import Icon from '@Atoms/Icon';
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
        {props.icon && (
          <>
            <Icon
              style={styles.mainIcon}
              fill={colors.turquoise}
              name={props.icon || 'info-outline'}
            />
            <Separator size={'md'} />
          </>
        )}
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

        {props.description && (
          <>
            <Text style={styles.description}>{props.description}</Text>
            <Separator size={'md'} />
          </>
        )}

        {props.cta ? <SolidButton {...props.cta} /> : null}
      </>
    ),
    [props]
  );
  return (
    <GorhomBottomSheet
      ref={ref}
      index={-1}
      handleComponent={() => <View />}
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
