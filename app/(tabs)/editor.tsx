import { Text, StyleSheet, View, Image } from 'react-native';

import PhotoPicker from '@/components/PhotoPicker';

import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import StyledIconContainer from '@/components/styledIconContainer';


export default function EditorScreen() {

  return (
    <View style={styles.screenContainer}>
       
       <Image // later use screenOptions?
          source={require('../../assets/images/ElementalEditorBanner.png')}
        />

      <Text>Editor</Text>
      <Text>Upload</Text>

      <View style={styles.editorTools}>
        <StyledIconContainer>

          <PhotoPicker>
            <Fontisto name='photograph' size={10}/>
          </PhotoPicker>

          <Ionicons name='image-outline' size={10}/>
          <SimpleLineIcons name='pencil' size={10}/>
          <Feather name='layout' size={10}/>
          <Octicons name='smiley' size={10}/>
        </StyledIconContainer>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editorTools: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 50,
    top: '30%',
  },
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '30%',
  },
});
