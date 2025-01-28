import React, { Dispatch, SetStateAction, useEffect, useState, useRef} from 'react';
import { TextInput, StyleSheet, View, Keyboard } from 'react-native';
import { useTextCtx } from '../../../hooks/contexts/useTextCtx';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';

interface Props {
  setIsTyping: Dispatch<SetStateAction<boolean>>;
}

const AddText: React.FC<Props> = ({ setIsTyping }: Props) => {

  const { createItems } = useItemCtx();
  const { setTyping, typing, saveActiveText } = useTextCtx();
  const [keyboardVisible, setKeyBoardVisible] = React.useState<boolean>(false);
  let currentText = useRef<string>(typing);

   // upon detection of change in typing, updates useRef since useState is NOT working in ctx to setTexts without it
   useEffect(() => {
    currentText.current = typing;

  }, [typing])

  useEffect(() => {

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyBoardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(

      'keyboardDidHide',
      () => {
        setKeyBoardVisible(false);
        setIsTyping(false);
        saveActiveText(currentText.current);
      },
    );

    // Clean up the listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOnFocus = () => {
    setKeyBoardVisible(true);
  };

  return (
    <View
      style={[
        styles.container,
        keyboardVisible ? styles.typing : styles.container,
      ]}
    >
      <TextInput
        style={styles.input}
        value={typing}
        onFocus={handleOnFocus}
        onChangeText={setTyping}
        placeholder="Type here..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    zIndex: 9999999,
  },
  typing: {
    top: -200,
  },
  input: {
    height: 40, // Thin height for the text box
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10, // Space around text
    width: '100%', // Adjust width as per your need
    borderRadius: 5, // Rounded corners (optional)
  },
});

export default AddText;
