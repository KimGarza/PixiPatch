import { Text, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

import { Fontisto } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import LoginSignUpButton from '@/src/components/loginAndSignup/loginSignUpButton';
import GlobalDimensions from '@/src/components/dimensions/globalDimensions';

import { SupportMeModal } from '@/src/components/Modals/supportMeModal';
import { useState } from 'react';
import GlobalTheme from '@/src/hooks/contexts/GlobalTheme';

const { colors } = GlobalTheme();

const { width, headerHeight } = GlobalDimensions();
const aspectRatio = 9/12 // need to change aspect ratio for index since global dimensions uses 9:14.5
const canvasHeight = width / aspectRatio;

export default function HomeScreen() {

  const [viewSupportModal, setViewSupportModal] = useState<boolean>(false);
  const [viewExploreModal, setViewExploreModal] = useState<boolean>(false);
  const [viewAboutModal, setViewAboutModal] = useState<boolean>(false);

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

          {/* ------------- */}
          {/* Start creating! */}
          <View style={styles.startBlock} >
            <Text style={{ fontFamily: 'ToThePoint', fontSize: 28, color: colors.DarkRust }}>EDIT, COLLAGE... DO IT ALL!</Text>

            <TouchableOpacity onPress={() => router.push('/(screens)/editor')}>
              <Fontisto name='photograph' size={150} style={styles.photographIcon}/>
            </TouchableOpacity>
            
            <Text style={{ fontFamily: 'ToThePoint', fontSize: 28, color: colors.DarkRust }}>START CREATING!</Text>

            <TouchableOpacity onPress={() => router.push('/(screens)/editor')} style={styles.drafts}>
              <Text style={{color: colors.DarkRust, fontSize: 32, fontFamily: 'ToThePoint'}}>Drafts</Text>
              <FontAwesome5 name={'drafting-compass'} size={20} color={colors.DarkRust}/>
            </TouchableOpacity>
          </View>
          {/* ------------- */}
          
          <View style={styles.links}>
            <Pressable onPress={() => {setViewSupportModal(true)}}>
              <Text style={styles.link}>Suport Me XOXO</Text>
            </Pressable>

            <Pressable onPress={() => {setViewExploreModal(true)}}>
              <Text style={styles.link}>Explore Features !</Text>
            </Pressable>

            <Pressable onPress={() => {setViewAboutModal(true)}}>
              <Text style={styles.link}>About</Text>
            </Pressable>

          </View>

          <View style={styles.modal}>
            {viewSupportModal && <SupportMeModal/>}
          </View>

        </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Text style={{ fontFamily: 'ToThePoint', fontSize: 32, color: colors.DarkRust }}>Ads from my supporters!</Text>
        <FontAwesome6 name={'hand-holding-heart'} size={20} color={colors.DarkRust}/>
      </View> 
      <View style={styles.ads}>
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
    backgroundColor: colors.Musk,
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
    gap: 15,
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
    gap: 20,
  },
  link: {
    borderWidth: .8, borderColor: colors.DarkRust, borderRadius: 8,
    fontFamily: 'ToThePoint', fontSize: 32, color: colors.DarkRust,
    padding: 5,
  },
  ads: {
    borderTopWidth: .5, borderColor: colors.DarkRust,
    width: '100%',
    zIndex: 9999999,
    padding: 10,
  },
  photographIcon: {
    color: colors.DarkCoffee,
    backgroundColor: colors.LightPeach, borderRadius: 100,
  },
  login: {
    position: 'absolute',
    left: 20, top: '25%',
    transform: [{ rotate: '90deg' }],
    transformOrigin: 'left center',
    zIndex: 9999999
  },
  modal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
});
