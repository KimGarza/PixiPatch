import { Text, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

import { Fontisto } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import LoginSignUpButton from '@/components/loginAndSignup/loginSignUpButton';
import GlobalDimensions from '../../components/dimensions/globalDimensions';

const { width } = GlobalDimensions();
const aspectRatio = 9/12 // need to change aspect ratio for index since global dimensions uses 9:14.5
const canvasHeight = width / aspectRatio;

const cinnamon = '#581800';

export default function HomeScreen() {

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.screenContainer}>
        
      <View style={styles.headerNav}>
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
            <Text style={styles.link}>Subsribe for more features!</Text>
            <Text style={styles.link}>About</Text>
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
    width: width,
    backgroundColor: '#dfded8',
    height: '100%',
    alignItems: 'center',
    // display: 'flex',
    // alignItems: 'center',
    // position: 'relative',
  },
  headerNav: {
    width: width,
    zIndex: 9999999,
    // width: width,
    // position: 'relative',
  },
  headerImg: {
    width: '100%',
  },
  pageContent: {
    height: canvasHeight,
    width: width,
    // position: 'relative',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // gap: 10,
    // zIndex: 1
  },
  appContent: {
    top: '5%',
    gap: 15,
    // alignItems: 'center',
    // height: canvasHeight,
    // width: width,
    // position: 'relative',
    // zIndex: 1
  },
  startBlock: {
    alignItems: 'center',
    gap: 10,
    padding: 10, paddingRight: 20, paddingLeft: 20
    // display: 'flex',
    // flexDirection: 'column',
    // borderWidth: 1, borderColor: cinnamon, backgroundColor: '#ffceb7', borderRadius: 30,
  },
  drafts: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'ToThePoint', fontSize: 32,
    padding: 5,
    gap: 8,
    // display: 'flex',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  link: {
    borderWidth: .8, borderColor: cinnamon, borderRadius: 8,
    backgroundColor: '#e3dfda',
    fontFamily: 'ToThePoint', fontSize: 32, color: cinnamon,
    padding: 5,
  },
  ads: { // NEED TO CONDITIONALLY RENDER
    borderTopWidth: .5, borderColor: '#581800',
    width: '100%',
    zIndex: 9999999,
    padding: 10,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
  },
  photographIcon: {
    color: '#280b00',
    backgroundColor: '#ffceb7', borderRadius: 100,
  },
  login: {
    position: 'absolute',
    left: 20, top: '25%',
    transform: [{ rotate: '90deg' }],
    transformOrigin: 'left center',
    zIndex: 9999999
  }
});
