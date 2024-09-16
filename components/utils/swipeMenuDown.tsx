import React, { useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import GlobalDimensions from '@/components/dimensions/globalDimensions';

const { width, height, headerHeight } = GlobalDimensions();
const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = width / aspectRatio;

type SwipeDownMenuProps = {
  children: React.ReactNode; // To pass in the actual menu content
  menuToggle: () => void;
};

const SwipeDownMenu = ({ children, menuToggle}: SwipeDownMenuProps) => {

  const animatedPosition = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Only update the position if swiping down (dy > 0)
          Animated.event([null, { dy: animatedPosition }], {
            useNativeDriver: false,
          })(_, gestureState);
        }
    },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // If swiped down far enough, close the menu
          Animated.timing(animatedPosition, {
            toValue: height, // Move the menu off-screen
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            menuToggle();
          });
        } else {
          // If not far enough, bounce the menu back to the original position
          Animated.spring(animatedPosition, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.menu,
        { transform: [{ translateY: animatedPosition }] },
      ]}
      
    >
      <View style={styles.chevronContainer} {...panResponder.panHandlers}>
        <Entypo name="chevron-thin-down" size={30} color="#b9a89e" />
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: 'flex', flexDirection: 'column',
    // borderWidth: .5, borderRadius: 0, borderColor: 'black',
    backgroundColor: '#fffaf8',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height - canvasHeight - headerHeight + 100,
    zIndex: 9999,
  },
  chevronContainer: {
    position: 'absolute',
    margin: 5,
    right: '30%', top: 0,
    zIndex: 99999999,
    width: '40%',
    alignItems: 'center',
  },
  content: {
    flex: 1, // Ensure content takes up available space
    width: '100%',
    display: 'flex', flexDirection: 'row',
    height: height - canvasHeight - headerHeight,
  },
});

export default SwipeDownMenu;
