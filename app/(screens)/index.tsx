import { Text, StyleSheet, View, Image, TouchableOpacity, LayoutChangeEvent, ActivityIndicator  } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useFonts } from 'expo-font';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoginSignUpButton from '@/components/loginAndSignup/loginSignUpButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const aspectRatio = 9/12;
const canvasHeight = width / aspectRatio;
var headerHeight = 0;
const cinnamon = '#581800';

export default function HomeScreen() {

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // gets height of the entire header
  const handleLayout = (event: LayoutChangeEvent) => {
    headerHeight = event.nativeEvent.layout.height;
  }

  return (
    <View style={styles.screenContainer}>
        
      <View style={styles.headerNav} onLayout={handleLayout}>
        <Image
          style={styles.headerImg}
          source={require('../../assets/images/ElementalEditorBanner.png')}
        />
      </View>

      <View style={styles.login}>
        <LoginSignUpButton/>
      </View>

      <View style={styles.pageContent}>

        <View style={styles.appContent}>

          {/* Start creating! */}
          <View style={styles.startBlock} >
            <Text style={{ fontFamily: 'ToThePoint', fontSize: 28, color: cinnamon }}>EDIT, COLLAGE... DO IT ALL!</Text>

            <TouchableOpacity onPress={() => router.push('/editor')}>
              <Fontisto name='photograph' size={150} style={styles.photographIcon}/>
              {/* <Image
              source={require('../../assets/images/arrow.png')}
              /> */}
            </TouchableOpacity>
            
            <Text style={{ fontFamily: 'ToThePoint', fontSize: 28, color: cinnamon }}>START CREATING!</Text>


            <TouchableOpacity onPress={() => router.push('/editor')} style={styles.drafts}>
              <Text style={{color: cinnamon, fontSize: 32, fontFamily: 'ToThePoint'}}>Drafts</Text>
              <FontAwesome5 name={'drafting-compass'} size={20} color={cinnamon}/>
            </TouchableOpacity>
          {/* ------------- */}


          </View>
          {/* ------------- */}
          
          <View style={styles.links}>
            <Text style={styles.link}>Suport Me XOXO</Text>
            {/* <MaterialCommunityIcons size={20}/> */}
            <Text style={styles.link}>Subsribe for more features!</Text>
            <Text style={styles.link}>About</Text>
            {/* <Text style={styles.links}>Girls in software development!</Text> */}
          </View>
        </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Text style={{ fontFamily: 'ToThePoint', fontSize: 32, color: cinnamon }}>Ads from my supporters!</Text>
        <FontAwesome6 name={'hand-holding-heart'} size={20} color={cinnamon}/>
      </View> 
      <View style={styles.ads}>
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: width,
    height: '100%',
    backgroundColor: '#dfded8',
    overflow: 'hidden'
  },
  headerNav: {
    width: width,
    zIndex: 9999,
    position: 'relative',
    height: 50 // so headerImageHeight is logging as 100 but when using that for here it makes everthing go way up
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
    gap: 10,
    height: canvasHeight,
    width: width,
    position: 'relative',
    zIndex: 1
  },
  appContent: {
    top: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    height: canvasHeight,
    width: width,
    position: 'relative',
    zIndex: 1
  },
  startBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    borderRadius: 300,
    // borderWidth: 1, borderColor: cinnamon, backgroundColor: '#ffceb7', borderRadius: 30,
    padding: 10, paddingRight: 20, paddingLeft: 20
  },
  drafts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 32,
    fontFamily: 'ToThePoint',
    padding: 5,
    gap: 8
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  link: {
    borderWidth: .8,
    borderColor: cinnamon,
    backgroundColor: '#e3dfda',
    borderRadius: 8,
    padding: 5,
    fontSize: 32,
    color: cinnamon,
    fontFamily: 'ToThePoint',
  },
  ads: { // MAY HAVE TO CONDITIONALLY RENDER SO PAID VERSION DOESN'T HAVE AD PART
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: width,
    height: height - canvasHeight - headerHeight - 100, // WHY THE 100
    gap: 30,
    zIndex: 99999,
    padding: 15,
    borderTopWidth: .5, borderColor: '#581800',
  },
  photographIcon: {
    color: '#280b00',
    backgroundColor: '#ffceb7',
    borderRadius: 100,
  },
  login: {
    position: 'absolute',
    left: 20, top: '25%',
    transform: [{ rotate: '90deg' }],
    transformOrigin: 'left center',
    zIndex: 9999999
    // borderWidth: .8, borderColor: cinnamon, backgroundColor: '#ffece3', borderRadius: 8,
    // padding: 5
  }
});
