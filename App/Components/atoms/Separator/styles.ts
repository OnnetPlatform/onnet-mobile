import { StyleSheet } from 'react-native';
import { SeparatorTypes } from './types';
import { factors } from '@Metrics';

export default ({ size = 'sm', ...props }: SeparatorTypes) =>
  StyleSheet.create({
    sparator: {
      width: props.horizontal ? factors[size] : 0,
      height: props.horizontal ? 0 : factors[size],
    },
  });
