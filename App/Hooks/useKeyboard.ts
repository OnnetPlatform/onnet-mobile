import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', () => {
      setOpen(false);
    });
    Keyboard.addListener('keyboardWillShow', () => {
      setOpen(true);
    });
  }, []);
  return { isOpen };
};
