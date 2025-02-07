import React, { useRef, useEffect } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import GlobalDimensions from '../global/globalDimensions';
import GlobalTheme from '@/src/components/global/GlobalTheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { colors } = GlobalTheme();
const { dimensions } = GlobalDimensions();
const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = dimensions.width / aspectRatio;

type SwipeDownMenuProps = {
  children: React.ReactNode; // To pass in the actual menu content
  menuToggle: () => void;
  inTop: number;
};

const SwipeDownMenu = ({ inTop, children, menuToggle}: SwipeDownMenuProps) => {

  const animatedPosition = useRef(new Animated.Value(0)).current;
  const handAnimation = useRef(new Animated.Value(0)).current;

  // 🔹 Animate Hand Up and Down
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(handAnimation, {
          toValue: 10, // Move down
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(handAnimation, {
          toValue: 0, // Move back up
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      { iterations: 5 } // Runs for 5 cycles (~5 seconds)
    );

    animation.start();

    return () => animation.stop(); // Cleanup when unmounted
  }, []);

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
            toValue: dimensions.height, // Move the menu off-screen
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
    <Animated.View style={[styles.menu, { transform: [{ translateY: animatedPosition }] }]}>
      <View style={[styles.handContainer, {top: inTop}]} {...panResponder.panHandlers}>
        {/* 🔥 Animated Hand Icon */}
        <Animated.View style={{ transform: [{ translateY: handAnimation }] }}>
          <FontAwesome5 name="hand-point-down" size={55} color={colors.Oatmeal} />
        </Animated.View>
      </View>

      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1, 
    backgroundColor: colors.WhitePeach,
    width: '100%',
    zIndex: 9999,
  },
  handContainer: {
    position: 'absolute',
    alignSelf: 'center', alignItems: 'center', right: '15%',
    zIndex: 99999999,
  },
  content: {
    flex: 1, // Ensure content takes up available space
    width: '100%',
    display: 'flex', flexDirection: 'row',
    height: dimensions.height - canvasHeight - dimensions.headerHeight,
  },
});

export default SwipeDownMenu;
