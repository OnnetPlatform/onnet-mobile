import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Text } from '@Atoms';
import { useColors } from '@Theme';

export const EmptyState: React.FC = () => {
  const colors = useColors();
  const withColors = styles(colors);

  return (
    <View style={withColors.wrapper}>
      <View style={withColors.container}>
        <Text weight="bold" style={withColors.title}>
          Don't worry they will be around
        </Text>
        <Text style={withColors.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit bibendum
          efficitur.
        </Text>
      </View>
    </View>
  );
};

export default EmptyState;
