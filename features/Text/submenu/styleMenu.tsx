import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
  } from 'react-native';
  import { useTextCtx } from '../useTextCtx';
  
  const StyleMenu = () => {
    const { updateStyle } = useTextCtx();
  
  
    const styling = [
      'normal',
      'Italic',
    ];
  
    return (
      <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={true}
          >
            <View style={styles.fontStyle}>
              {styling.map((style, index) => (
                <TouchableOpacity key={index} onPress={() => updateStyle(style)}>
                  <Text style={[{ fontStyle: style == 'italic' ? 'italic' : 'normal' }, styles.text]}>
                    Elemental Editor
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    scrollViewContent: {
      alignItems: 'center', // centers items vertically in the scroll view
    },
    fontStyle: {
      flexDirection: 'row', // Horizontal layout
      alignItems: 'center', // Align items vertically in the row
      height: 50,
    },
    text: {
      //   borderWidth: 1,
      //   borderColor: 'gray',
      //   borderRadius: 8,
      fontSize: 26,
      paddingHorizontal: 10,
      padding: 5,
      marginHorizontal: 5, // Add spacing between each text element
    },

  });
  
  export default StyleMenu;
  