import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import PageView from '@HOCs/PageView';
import { UserCreators } from '@Khayat/Redux';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { ThemeColors } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import SnackbarRef from 'Provider/SnackbarProvider/SnackbarRef';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const EditProfileScreen: React.FC = () => {
  const { profile } = useSelector(UserSelector);
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [full_name, setFullName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const colors = useColors();
  const styles = useStyles(colors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setFullName(profile.full_name);
      setBio(profile.bio);
      setPhone(profile.phone);
      setTitle(profile.title);
      setCity(profile.city);
      setCountry(profile.country);
      setDepartment(profile.department);
    }
  }, [profile]);

  return (
    <PageView title="Edit Screen">
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text weight="bold" style={styles.shadow}>
            Basic Info
          </Text>
          <Separator size={'md'} />

          <View style={styles.row}>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              placeholderTextColor={colors.text}
              onChangeText={setFirstName}
              value={first_name}
            />
            <Separator horizontal />
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              value={last_name}
              placeholderTextColor={colors.text}
              onChangeText={setLastName}
            />
          </View>
          <Separator />
          <TextInput
            placeholder="Full Name"
            inputMode="text"
            value={full_name}
            placeholderTextColor={colors.text}
            style={styles.input}
            onChangeText={setFullName}
          />
          <Separator />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            inputMode="tel"
            placeholderTextColor={colors.text}
            style={styles.input}
            onChangeText={setPhone}
          />
          <Separator />

          <TextInput
            placeholder="About"
            placeholderTextColor={colors.text}
            style={[styles.input, { minHeight: 100, paddingTop: 16 }]}
            multiline={true}
            textAlignVertical="center"
            inputMode="text"
            value={bio}
            onChangeText={setBio}
          />
          <Separator size={'md'} />

          <View>
            <Text weight="bold" style={styles.shadow}>
              Work Info
            </Text>
            <Separator size={'md'} />
            <View style={styles.row}>
              <TextInput
                placeholder="Title"
                value={title}
                inputMode="text"
                autoCapitalize={'words'}
                style={styles.input}
                placeholderTextColor={colors.text}
                onChangeText={setTitle}
              />
              <Separator horizontal />
              <TextInput
                placeholder="Department"
                inputMode="text"
                autoCapitalize={'words'}
                style={[styles.input]}
                value={department}
                placeholderTextColor={colors.text}
                onChangeText={setDepartment}
              />
            </View>
          </View>
          <Separator size={'md'} />
          <Text weight="bold" style={styles.shadow}>
            Location
          </Text>
          <Separator size={'md'} />
          <View style={styles.row}>
            <TextInput
              placeholder="Country"
              style={[styles.input]}
              inputMode="text"
              autoCapitalize={'words'}
              value={country}
              placeholderTextColor={colors.text}
              onChangeText={setCountry}
            />
            <Separator horizontal />
            <TextInput
              placeholder="City"
              style={[styles.input]}
              inputMode="text"
              autoCapitalize={'words'}
              value={city}
              placeholderTextColor={colors.text}
              onChangeText={setCity}
            />
          </View>
        </ScrollView>
        <SolidButton
          onPress={() => {
            dispatch(
              UserCreators.updateProfile(
                {
                  first_name,
                  last_name,
                  full_name,
                  bio,
                  city,
                  country,
                  department,
                  phone,
                  title,
                  cover:
                    'https://images.unsplash.com/photo-1707423948446-95e2604d4f8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8',
                },
                () => {
                  SnackbarRef.current?.showSnackbar({
                    title: 'Success',
                    subtitle: 'Profile updated successfully',
                  });
                }
              )
            );
          }}>
          <Text fontSize={12} weight="bold">
            Save
          </Text>
        </SolidButton>
      </View>
    </PageView>
  );
};

const useStyles = (colors: ThemeColors) => {
  return useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        input: {
          flex: 1,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.secondaryBackground,
          borderRadius: 8,
          color: colors.text,
        },
        shadow: {
          fontSize: 18,
        },
      }),
    [colors]
  );
};

export default EditProfileScreen;
