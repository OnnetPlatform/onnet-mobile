import { useEventContext } from '@Context/EventContext/EventContext';
import { EventData } from '@Context/EventContext/types';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

type useSaveTypes = {
  key: keyof EventData;
  value: any;
};

export const useSave = ({ key, value }: useSaveTypes) => {
  const { event, setEventData } = useEventContext();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const onSavePressed = () => {
    setEventData({ ...event, [key]: value });
    goBack();
  };

  const onBackPressed = () => {
    console.log(event[key], value);
    if (event[key] !== value) {
      Alert.alert(
        'Are you sure?',
        'you have unsaved data and will be dismissed after going back',
        [
          {
            text: 'Continue Editing',
            style: 'cancel',
          },
          {
            text: 'Go back',
            onPress: goBack,
            style: 'destructive',
          },
        ]
      );
    } else {
      goBack();
    }
  };
  return { onSavePressed, onBackPressed };
};

export default useSave;
