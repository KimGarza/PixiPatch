import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

// PUT ALL THIS IN A CONTEXT PROVIDER FOR EDITOR CONTENT
  // obtaining screen width and height dimensions dynamically using a specified aspect ratio to contrain canvas size.
  const screenWidth = Dimensions.get('screen').width; // or 'window'
  const screenHeight = Dimensions.get('screen').height; // or 'window' // for some reason this is 22 larger with get window and 50 too large with screen! And using useDimensions from react same result. Using 100% in styling as opposed to this works not sure why
  const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
  const canvasHeight = screenWidth / aspectRatio;
  var headerImageHeight = 0;
  var toolbarHeight = 0;
  if (headerImageHeight) { toolbarHeight = screenHeight - canvasHeight - headerImageHeight;}

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.screenContainer}>
      

      <Image style={styles.headerImg}
        source={require('../../assets/images/ElementalEditorBanner.png')}
      />

      <View style={styles.pageContent}>

        {/* Start creating! */}
        <View style={styles.startBlock}>
          <Text>Edit, collage, do it all!</Text>

          <TouchableOpacity onPress={() => router.push('/editor')}>
            <Fontisto name='photograph' size={150}/>
          </TouchableOpacity>
          
          <Text>Start Creating! *arrow to icon* </Text>
        </View>
        {/* ------------- */}

        <View style={styles.links}>
          <Text style={styles.link}>Suport Me XOXO</Text>
          <Text style={styles.link}>Subsribe for more features!</Text>
          <Text style={styles.link}>About</Text>
          {/* <Text style={styles.links}>Girls in software development!</Text> */}
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    width: screenWidth,
    height: '100%',
  },
  headerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '5%',
    gap: 70,
  },
  startBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
  },
  link: {
    borderWidth: 1,
    borderColor: '#311b03',
    backgroundColor: '#d3cfcb',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
  }
});
