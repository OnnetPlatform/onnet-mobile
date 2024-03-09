import Separator from '@Atoms/Separator';
import Button from '@Molecules/Button';
import { useColors } from '@Theme/index';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { View } from 'react-native';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { AuthCreators } from '@Khayat/Redux';

export const RegisterSection: React.FC = () => {
  const colors = useColors();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const onRegisterPressed = () => {
    dispatch(
      AuthCreators.register({
        last_name: lastName,
        first_name: firstName,
        email,
        password,
      })
    );
  };

  return (
    <View>
      <Separator size={'md'} />
      <View style={styles.row}>
        <BottomSheetTextInput
          placeholder="First name"
          style={[styles.input, styles.flex]}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Separator horizontal />
        <BottomSheetTextInput
          placeholder="Last name"
          style={[styles.input, styles.flex]}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Separator />
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
      <Button onPress={onRegisterPressed}>Register</Button>
      <Separator size={'md'} />
    </View>
  );
};

export default RegisterSection;
