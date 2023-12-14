import { factors } from '@Metrics';
import { StyleSheet } from 'react-native';

import { SeparatorTypes } from './types';

export default ({ size = 'sm', ...props }: SeparatorTypes) =>
  StyleSheet.create({
    sparator: {
      width: props.horizontal ? factors[size] : 0,
      height: props.horizontal ? 0 : factors[size],
    },
  });
