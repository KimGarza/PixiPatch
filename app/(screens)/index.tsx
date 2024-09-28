import { Text, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

import { Fontisto } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import LoginSignUpButton from '@/src/components/loginAndSignup/loginSignUpButton';
import GlobalDimensions from '@/src/components/dimensions/globalDimensions';

const { width, headerHeight } = GlobalDimensions();
const aspectRatio = 9/12 // need to change aspect ratio for index since global dimensions uses 9:14.5
const canvasHeight = width / aspectRatio;

const cinnamon = '#581800';

export default function HomeScreen() {

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../src/assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.screenContainer}>
        
      <View style={styles.headerNav}>
        <Image
          style={styles.headerImg}
          source={require('../../src/assets/images/ElementalEditorBanner.png')}
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

            <TouchableOpacity onPress={() => router.push('/(screens)/editor')}>
              <Fontisto name='photograph' size={150} style={styles.photographIcon}/>
              {/* <Image
              source={require('../../src/assets/images/arrow.png')}
              /> */}
            </TouchableOpacity>
            
            <Text style={{ fontFamily: 'ToThePoint', fontSize: 28, color: cinnamon }}>START CREATING!</Text>


            <TouchableOpacity onPress={() => router.push('/(screens)/editor')} style={styles.drafts}>
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
  },
  headerNav: {
    width: width,
    zIndex: 9999999,
    height: headerHeight
  },
  headerImg: {
    width: '100%',
  },
  pageContent: {
    height: canvasHeight,
    width: width,
  },
  appContent: {
    top: '5%',
    gap: 15,
  },
  startBlock: {
    alignItems: 'center',
    gap: 10,
    padding: 10, paddingRight: 20, paddingLeft: 20
  },
  drafts: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'ToThePoint', fontSize: 32,
    padding: 5,
    gap: 8,
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
