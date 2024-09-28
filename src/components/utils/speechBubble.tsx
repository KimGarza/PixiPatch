import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children?: React.ReactNode;
}

// speech bubble can take children to display content within
const SpeechBubble = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        {children}
      </View>
      <View style={styles.tail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#c3c5c2',
    borderRadius: 10,
  },
  bubble: {
    backgroundColor: '#e4d3d2',
    borderRadius: 10,
    borderColor: '#795999', borderWidth: 1, borderStyle: 'dashed',
    padding: 5,
    margin: 2,
  },
  tail: {
    position: 'absolute',
    left: '35%',
    bottom: -10,
    width: 0, height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: '#c3c5c2',
  },
});

export default SpeechBubble;
