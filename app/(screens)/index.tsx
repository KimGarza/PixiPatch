import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();

  const handleStartEditing = () => {
    console.log("navigate to editor")
  }

  return (
    <View style={styles.screenContainer}>

    <Image style={styles.headerImg}
      source={require('../../assets/images/ElementalEditorBanner.png')}
    />

      <View style={styles.pageContent}>

        {/* Start creating! */}
        <View style={styles.groupStart}>
          <Text>Edit, collage, do it all!</Text>

        <TouchableOpacity onPress={() => router.push('/editor')}>
          <Fontisto name='photograph' size={150}/>
        </TouchableOpacity>
          
          <Text>Start Creating! *arrow to icon* </Text>
        </View>
        {/* ------------- */}

        <View style={styles.groupLinks}>
          <Text style={styles.links}>Suport Me XOXO</Text>
          <Text style={styles.links}>Subsribe for more features!</Text>
          <Text style={styles.links}>About</Text>
          {/* <Text style={styles.links}>Girls in software development!</Text> */}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  headerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: '10%',
  },
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  groupStart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '20%',
    gap: 60,
  },
  groupLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  links: {
    borderWidth: 1,
    borderColor: '#311b03',
    backgroundColor: '#d3cfcb',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
  }
});
