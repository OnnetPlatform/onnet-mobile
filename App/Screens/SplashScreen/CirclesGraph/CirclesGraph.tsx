import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {useColors} from '@Theme';
const array = Array.from({length: 10}, (_, i) =>
  Array.from({length: 30}, (__, ind) => ind),
);
export const CirclesGraph: React.FC<{scale?: number}> = ({scale = 0.5}) => {
  const {width} = useWindowDimensions();
  const colors = useColors();
  return (
    <View
      style={[
        {
          transform: [{scale}],
          justifyContent: 'center',
          alignItems: 'center',
          width: width * scale,
          height: 100,
          alignSelf: 'center',
        },
      ]}>
      {array.map((item, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          {item.map(item => {
            const random = Math.trunc(Math.random() * 10) % 2 === 0;
            return (
              <View
                key={item}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: random ? colors.yellow : colors.blur,
                  margin: 4,
                  borderRadius: 9,
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};
