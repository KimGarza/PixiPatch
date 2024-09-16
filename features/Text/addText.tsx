import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { TextInput, StyleSheet, View, Keyboard } from 'react-native';
import { useTextCtx } from './useTextCtx';

interface Props {
  setIsTyping: Dispatch<SetStateAction<boolean>>;
}

const AddText: React.FC<Props> = ({ setIsTyping }: Props) => {
  const { setActiveText, activeText } = useTextCtx();
  const [keyboardVisible, setKeyBoardVisible] = React.useState<boolean>(false);

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
        value={activeText}
        onFocus={handleOnFocus}
        onChangeText={setActiveText}
        placeholder="Type here..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    zIndex: 999999999999999,
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
