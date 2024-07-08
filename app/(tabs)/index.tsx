import { Text, StyleSheet, View, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
       <Image // later use screenOptions?
          source={require('../../assets/images/ElementalEditorBanner.png')}
        />
      <Text>Edit, collage, do it all!</Text>
      <Fontisto name='photograph'/>
      <Text>Start Creating! *arrow to icon* </Text>
      <Text>About</Text>
      <Text>Suport Me XOXO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '30%',
  },
});
