import React, { Dispatch, SetStateAction, useEffect, useState, useRef} from 'react';
import { TextInput, StyleSheet, View, Keyboard, Text } from 'react-native';
import { useTextCtx } from './useTextCtx';
import GlobalDimensions from '@/src/components/dimensions/globalDimensions';

const {width} = GlobalDimensions();
interface Props {
  setIsTypingCallback: Dispatch<SetStateAction<boolean>>;
}

const AddText: React.FC<Props> = ({ setIsTypingCallback }: Props) => {
  const { setTyping, typing, saveActiveText, activeText } = useTextCtx();
  const [keyboardVisible, setKeyBoardVisible] = React.useState<boolean>(false);
  let currentText = useRef<string>(typing);

  const [inputWidth, setInputWidth] = useState(200); // Initial width
  const [fontSize, setFontSize] = useState(16);
  const maxWidth = width * 0.9;
  const minFontSize = 12; // Minimum font size to prevent text from becoming too small
  const maxFontSize = 42;

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
        setIsTypingCallback(false);
        saveActiveText(currentText.current);
      },
    );

    // clean up the listeners on unmount
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
        value={typing} // stright from text ctx
        onFocus={handleOnFocus}
        onChangeText={setTyping} // sets typing stright to text ctx
        placeholder="Type here..."
      />


      {/* Hidden Text component for measuring text width */}
      <Text
        style={[
          styles.hiddenText,
          {
            fontSize: fontSize,
          },
        ]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        const padding = 20; // Additional padding for better UX
        let newWidth = width + padding;
        
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          // Decrease font size if needed
          if (fontSize > minFontSize) {
            setFontSize((prev) => prev - 1);
          }
        } else {
          // Optionally, increase font size if below maxFontSize
          if (fontSize < maxFontSize) {
            setFontSize((prev) => prev + 1);
          }
        }
        console.log("new width", newWidth)
        setInputWidth(newWidth);
      }}
      >
        {typing || 'Type here...'}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  hiddenText: {
    position: 'absolute',
    top: -1000, // Move off-screen
    left: -1000,
    opacity: 0,
    // Ensure it doesn't interfere with layout
  },
  container: {
    justifyContent: 'center',
    marginTop: 55,
    zIndex: 9999999,
  },
  typing: {
    top: -200,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
});

export default AddText;
