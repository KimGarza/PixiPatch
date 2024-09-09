// import React, { useState, useEffect } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
// import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
// import { useItemCtx } from '@/hooks/contexts/useItemCtx';
// import { DrawingItem, ImageItem, StickerItem } from '@/customTypes/itemTypes';
// import useDragPanResponder from './useDragPanResponder';
// import Feather from '@expo/vector-icons/Feather';
// import ViewModifyImageToolbox from '../views/viewModifyImageToolbox';
// interface Props {
//     item: ImageItem | StickerItem | DrawingItem;
// }

// const MutableItem = ({ item }: Props) => {

//     console.log("item in mutable ",)
//     const { setActiveItemCtx, activeItemCtx, deleteItems, addPendingChanges, bringToFront, frontItem, setFrontItem } = useItemCtx();
//     const [ tapCount, setTappedCount ] = useState<number>(0);
//     const [tapCoordinates, setTapCoordinates] = useState<{x: number, y: number}>({x: 0, y: 0});

//     // related to saving state scaling, rotating and relocating
//     const { panHandlers, newPositionX, newPositionY } = useDragPanResponder({initialX: item.left, initialY: item.top});
//     const positionX = useSharedValue(newPositionX);
//     const positionY = useSharedValue(newPositionY);
//     const scale = useSharedValue(1);
//     const savedScale = useSharedValue(1);
//     const rotation = useSharedValue(item.rotation);
//     const savedRotation = useSharedValue(item.rotation);
//     const [transformState, setTransformState] = useState({
//         positionX: positionX.value,
//         positionY: positionY.value,
//         rotation: rotation.value,
//         scale: scale.value,
//       });
//      // Function to update the local state
//     const updateTransformState = () => {
//         setTransformState({
//         positionX: positionX.value,
//         positionY: positionY.value,
//         rotation: rotation.value,
//         scale: scale.value,
//         });
//     };
//     // Sync the transform state with context when the state changes
//     useEffect(() => {
//         console.log('useEffect 1');
//         addPendingChanges(
//         item.id,
//         {positionX: transformState.positionX.value,
//         positionY: transformState.positionY.value,
//         rotation: transformState.rotation,
//         scale: transformState.scale}
//         );
//     }, [transformState]);

//       useEffect(() => {
//         console.log('useEffect 2');
//         addPendingChanges(
//             item.id,
//             {
//                 positionX: transformState.positionX.value,
//                 positionY: transformState.positionY.value,
//                 rotation: transformState.rotation,
//                 scale: transformState.scale
//             }
//         );
//       }, [transformState]);
    
//     // this value will update after switch statement checks which itemType and will be THAT item type
//     let activeItemCast: ImageItem | StickerItem | DrawingItem | undefined = activeItemCtx;
//     let frontItemCast: ImageItem | StickerItem | DrawingItem | undefined = frontItem;
//     let itemCast: ImageItem | StickerItem | DrawingItem = item;

//     // if there is a frontItem set, and it is not THIS current item, then reset the tapCounter so that it doesn't store the memory of how many even though another item has been brought to front
//     useEffect(() => {
//         if (frontItem != undefined) {
//             if ( frontItem.id != item.id ) {
//                 setTappedCount(0);
//             }
//         }
//     }, [activeItemCtx, frontItem]) // has to keep checking if frontItem has been set, and active image for updating styling

//     // sets the casted versions of item coming in and items in ctx as their respective item types
//     switch (item.type) {
//         case 'image':
//             itemCast = item as ImageItem;
//             if (frontItem) {
//                 frontItemCast = frontItem as ImageItem;
//             }
//             if (activeItemCtx) {
//                 activeItemCast = activeItemCtx as ImageItem;
//             }
//             break;
//         case 'sticker':
//             itemCast = item as StickerItem;
//             if (frontItem) {
//                 frontItemCast = frontItem as StickerItem;
//             }
//             if (activeItemCtx) {
//                 activeItemCast = activeItemCtx as StickerItem;
//             }
//             break;
//         case 'drawing':
//             itemCast = item as DrawingItem;
//             if (frontItem) {
//                 frontItemCast = frontItem as DrawingItem;
//             }
//             if (activeItemCtx) {
//                 activeItemCast = activeItemCtx as DrawingItem;
//             }
//             break;
//     }


//     const pinchGesture = Gesture.Pinch()
//         .onUpdate((event) => {
//             scale.value = savedScale.value * event.scale;
//         })
//         .onEnd(() => {
//             savedScale.value = scale.value;
//             runOnJS(updateTransformState)();
//         });

//     const rotationGesture = Gesture.Rotation()
//         .onUpdate((event) => {
//             rotation.value = savedRotation.value + event.rotation;
//         })
//         .onEnd(() => {
//             savedRotation.value = rotation.value;
//             runOnJS(updateTransformState)();
//         });

//         const animatedStyle = useAnimatedStyle(() => {
//             return {
//                 transform: [
//                     { translateX: newPositionX.value },
//                     { translateY: newPositionY.value },
//                     { rotateZ: `${rotation.value}rad` },
//                     { scale: scale.value }
//                 ],
//             };
//         });

//         const trashIconAnimated = useAnimatedStyle(() => {
//             return {
//                 transform: [
//                     { rotateZ: `${-rotation.value}rad` },  // Invert the rotation
//                     { scale: 1 / scale.value }  // Invert the scale
//                 ],
//             };
//         });

    
//     const handleTap = (event: GestureResponderEvent) => {

//         if (tapCount == 0 && frontItem == undefined) { // if this item is already in the foreground but user clicks it again, they want to activate it
//             setActiveItemCtx(item);
//         }
//         if (tapCount == 0) { // frontItem is set within bringToFront which should tell each MutableItem to update itself and check that it is not currently frontItem anymore // CHECK THAT ACTIVE IMAGE IS ALSO CONSIDERED IN BRINGTOFRONT

//             setTappedCount(1);
//             bringToFront(item.id, item.type);

//         } else if (tapCount == 1) { // now item is in foreground and user wishes to activate

//             setTappedCount(2);
//             const { locationX, locationY } = event.nativeEvent;
//             setTapCoordinates({x: locationX, y: locationY}); // whereever the user tapped, assign the toolbox to show up here IF IMAGE
//             setActiveItemCtx(item);

//         } else if (tapCount == 2) { // the user is deactivating, or selecting it but not selecting another image // CONSIDER THIS TO OCCUR WHEN USER CLICKS OFF OF THE IAMGE ANYWHERE AS WELL?

//             setTapCoordinates({x: 0, y: 0});
//             setActiveItemCtx(undefined);
//             setFrontItem(undefined);
//             setTappedCount(0);
//         }
//     }



//     return (
//         <GestureDetector gesture={Gesture.Simultaneous(rotationGesture, pinchGesture)}>
//             <Animated.View
//                 style={[styles.itemContainer, { 
//                     width: item.width, 
//                     height: item.height, 
//                     top: item.top, 
//                     left: item.left, 
//                     zIndex: item.zIndex }, 
//                     animatedStyle]}
//                     {...panHandlers} // Apply PanResponder only when the image is not active
//                 >
//                 {/* Close icon / remove item */}
//                 {activeItemCtx && activeItemCtx.id == item.id && // if there is an active image currently and the current item's id matches the activeItem's id
//                 <View >
//                     <View style={[styles.trash, {left: - 15 + item.width, bottom: item.height * -1 - 10}]}>
//                         <TouchableOpacity onPress={() => {deleteItems(item.id, 'image')}}>
//                         <Animated.View style={trashIconAnimated}>
//                             <Feather name={'trash'} size={30} color={'#ff0847'} style={styles.editingIcon}/>
//                         </Animated.View>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 }
//                         {/* '#dcd6ce' */}

//                 {/* <View >
//                     <View style={{position: 'absolute', top: -10, left: -15 + item.width, zIndex: 9}} {...panHandlers}>
//                         <FontAwesome6 name={'diamond'} size={25} color={'#ff0847'} style={styles.editingIcon}/>
//                     </View>
//                 </View> */}

//                 {/* Tapping item */}
//                 <TouchableOpacity onPress={handleTap} activeOpacity={.9} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{zIndex: item.zIndex}}>
//                     <Image
//                         source={{ uri: item.imageInfo.uri }}
//                         style={[{
//                             width: item.width,
//                             height: item.height,
//                             zIndex: item.zIndex,
//                         }, activeItemCast?.imageInfo.uri == item.imageInfo.uri && styles.itemSelected,]} // checking the casted ImageItem which is active in ctx against the current image
//                     />
//                 </TouchableOpacity>

//                 {/* little popup toolbox for editing options on a specific image only appears for images */}
//                 {/* {item.type == 'image' && activeItemCtx && activeItemCtx.imageInfo.uri == item.imageInfo.uri ? (
//                     item && tapCoordinates.x > 0 && tapCoordinates.y > 0 && <ViewModifyImageToolbox/>
//                 ) : (<></>)} */}
//             </Animated.View>
//         </GestureDetector>
//     );
// };

// export default MutableItem;

// const styles = StyleSheet.create({
//     itemContainer: {
//       position: 'absolute',
//     },
//     closeContainer: {
//         position: 'absolute',
//         zIndex: 5,
//     },
//     editingIcon: {
//         // backgroundColor: 'white',
//         backgroundColor: 'white',
//         borderRadius: 30,
//         overflow: 'hidden',
//     },
//     image: {
//         position: 'absolute',
//         flexDirection: 'column',
//     },
//     itemSelected: {
//         // borderWidth: 2, borderColor: '#c0b9ac',
//         borderWidth: 2, borderColor: '#ff0847',
//         zIndex: 999,
//     },
//     trash: {
//         position: 'absolute',
//         zIndex: 9,
       
//     }
//   });



//   import { useSharedValue } from 'react-native-reanimated';
// import { useRef } from 'react';
// import { PanResponder } from 'react-native';

// const useDragPanResponder = (initialPosition: {initialX: number, initialY: number}) => {
//     // Use shared values instead of useState
//     const newPositionX = useSharedValue(initialPosition.initialX);
//     const newPositionY = useSharedValue(initialPosition.initialY);
    
//     const lastPosition = useRef({ x: initialPosition.initialX, y: initialPosition.initialY });

//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => false, 
//             onMoveShouldSetPanResponder: (evt, gestureState) => {
//                 return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
//             },
//             onPanResponderGrant: () => {},
//             onPanResponderMove: (evt, gestureState) => {

//                 // Update the shared values directly
//                 newPositionX.value = lastPosition.current.x + gestureState.dx;
//                 newPositionY.value = lastPosition.current.y + gestureState.dy;
//             },
//             onPanResponderRelease: (evt, gestureState) => {

//                 lastPosition.current = {
//                     x: lastPosition.current.x + gestureState.dx,
//                     y: lastPosition.current.y + gestureState.dy,
//                 };
//             },
//         })
//     ).current;

//     return { panHandlers: panResponder.panHandlers, newPositionX, newPositionY };
// };

// export default useDragPanResponder;
