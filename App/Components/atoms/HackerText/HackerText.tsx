import React, { useEffect, useRef, useState } from 'react';
import Text from '../Text';
import { TextProps } from '../Text/types';

export const HackerText: React.FC<TextProps> = ({ children, ...props }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [placeholder, setPlaceholder] = useState<string>(children);
  const [sorted, setSorted] = useState<string>('');
  let intervalCount = 0;
  const randomizeText = () => {
    const interval: any = setInterval(() => {
      setSorted(children.slice(0, intervalCount));
      if (intervalCount > children.length) return clearInterval(interval);

      if (typeof children === 'string') {
        const placeholder = children
          .split('')
          .map((letter, index) => {
            if (index < intervalCount) return children[index];
            if (letter !== ' ' && letter !== '\n')
              return letters[Math.floor(Math.random() * letters.length)];
            return letter;
          })
          .join('');
        setPlaceholder(placeholder);
        intervalCount += 1 / 3;
      }
    }, 30);
  };
  useEffect(() => {
    setTimeout(randomizeText, 1000);
  }, [children]);
  return (
    <Text style={{ textTransform: 'uppercase' }} {...props}>
      <Text {...props}>{sorted}</Text>
      <Text {...props} style={{ opacity: 0.3 }}>
        {placeholder.split(sorted)[1]}
      </Text>
    </Text>
  );
};

export default HackerText;
