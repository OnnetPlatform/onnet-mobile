import Separator from '@Atoms/Separator';
import Button from '@Molecules/Button';
import { useColors } from '@Theme/index';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { View } from 'react-native';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { AuthCreators } from '@Khayat/Redux';

export const LoginSection: React.FC = () => {
  const colors = useColors();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onLoginPressed = () => {
    dispatch(AuthCreators.login({ email, password }));
  };
  return (
    <View>
      <BottomSheetTextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Separator />
      <BottomSheetTextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Separator size={'md'} />
      <Button onPress={onLoginPressed}>Login</Button>
      <Separator size={'md'} />
    </View>
  );
};

export default LoginSection;
