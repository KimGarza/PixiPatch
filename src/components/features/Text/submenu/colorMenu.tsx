import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import { useTextCtx } from '../../../../hooks/contexts/useTextCtx';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import GlobalTheme from '@/src/components/global/GlobalTheme';

  const { colors } = GlobalTheme();
  
  const ColorMenu = () => {
    const { updateColor } = useTextCtx();

    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple',
      'pink',
      'white',
      'black',
    ];
  
  
    return (
      <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={true}
          >
            <View style={styles.swatches}>
              {colors.map((color, index) => (
                <TouchableOpacity key={index} onPress={() => updateColor(color)}>
                  <AntDesign name="heart" size={40} color={color}/>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    colorLayout: {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      width: '100%',
      flexShrink: 1, // <3
      padding: 30,
      zIndex: 9999,
      borderWidth: 1, borderColor: 'blue',
    },
    colorPicker: {
      width: '100%',
      height: '100%',
      padding: 5,
      justifyContent: 'center',
      gap: 30,
      zIndex: 9999,
    },
    opacityPicker: {
      position: 'absolute',
      width: '70%',
      height: '100%',
      padding: 5,
      transform: [{ rotate: '90deg' }],
      right: 0,
      top: '5%',
    },
    swatches: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: 20,
      zIndex: 9999,
    },
    colorSwatch: {
      height: 45, width: 45,
      borderRadius: 15, borderWidth: 2, borderColor: colors.Mud,
    }
  });
  
  export default ColorMenu;
  