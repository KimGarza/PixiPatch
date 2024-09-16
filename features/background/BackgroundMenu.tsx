
import { View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { BackgroundCtx } from './BackgroundCtx';
import { backgroundAssets } from './backgroundAssets';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwipeDownMenu from '@/components/utils/swipeMenuDown';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

const cinnamon = '#581800';
const { width, height, headerHeight } = GlobalDimensions();
const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = width / aspectRatio;

interface BackgroundMenuProps {
  menuToggle: () => void;
}

const BackgroundMenu: React.FC<BackgroundMenuProps> = ({ menuToggle }) => {

  // background context for adding backgrounds based on user selection
  const { setBackground } = useContext(BackgroundCtx); // updata context to have error hnandling

  const [viewBackgrounds, setViewBackgrounds] = useState<{id: string, source: ImageSourcePropType}[]>([]);
  const [selectedPack, setSelectedPack] = useState<string>('basic');
  const [packNames, setPackNames] = useState<string[]>(Object.keys(backgroundAssets));

  let backgrounds = backgroundAssets[selectedPack];

  useEffect(() => {
    
    const bgList = Object.keys(backgrounds).map((key) => ({
      id: key,
      source: backgrounds[key].srcUri,
    }));
    setViewBackgrounds(bgList);

  }, [selectedPack]) // anytime new tab is selected

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // on select/press background, convert Background to have a position (backgroundData) and add it to the backgrounds state array in backgroundCtx 
  const handleBackgroundSelect = (background: ImageSourcePropType) => {
    setBackground(background); // update old to new background or set initial one
  }

  const handleChangeTab = (newPack: string) => {
    setSelectedPack(newPack);
  }

  const handleCloseMenu = () => {
    menuToggle();
  }

  return (
    <SwipeDownMenu menuToggle={handleCloseMenu}>
      <View style={styles.container}>

        <View style={styles.close}>
          <TouchableOpacity onPress={() => handleCloseMenu()}>
            <EvilIcons name={'close'} size={35} color="#a3968e"/>
          </TouchableOpacity>
        </View>
        
        <View style={styles.titleTabs}>

          <View style={styles.tabs}>
              {packNames.map((name, index) => (
              <TouchableOpacity key={index} onPress={() => handleChangeTab(name)}>
                <Text style={[styles.tab, {fontFamily: 'ToThePoint', fontSize: 30, color: cinnamon, textAlign: 'center'}]}>{name}</Text>
              </TouchableOpacity>
                
              ))}
          </View>

          <View style={styles.title}>
            <Text style={{fontFamily: 'ToThePoint', fontSize: 45, color: cinnamon, textAlign: 'center'}}>Backgrounds <Ionicons name="sparkles-outline" size={20} color={cinnamon}/></Text>
          </View>

        </View>
      
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          style={styles.scrollView}
        >
          <View style={styles.backgrounds}>
            {viewBackgrounds.map((bg, index) => (
              <TouchableOpacity key={index} onPress={() => handleBackgroundSelect(bg.source)}>
                <Image source={bg.source} style={styles.background}/>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SwipeDownMenu>
  );
}

export default BackgroundMenu;

const styles = StyleSheet.create({
  container: {
    display: 'flex', flexDirection: 'row',
    width: width,
    height: height - canvasHeight - headerHeight,
  },
  close: {
    position: 'absolute',
    margin: 5,
    right: 0, top: 0,
    zIndex: 99999999,
  },
  titleTabs: {
    flexDirection: 'column',
    position: 'absolute',
    top: -90,
    zIndex: 9,
    width: '101%',
    padding: 2,
  },
  title: {
    borderWidth: 1, borderBottomWidth: 0, 
    backgroundColor: '#e2d9d4',
    height: 50
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
  },
  tab: {
    borderWidth: 1, borderBottomWidth: 0, borderColor: cinnamon,
    borderTopRightRadius: 100,
    padding: 10,
    alignContent: 'center',
    backgroundColor: '#d7c8bf',
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  scrollView: {
    top: '35%',
    width: '100%', height: '50%',
    zIndex: 9999,
    paddingHorizontal: 10,
  },
  backgrounds: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%', height: '100%',
    zIndex: 9999,
  },
  background: {
    height: 45, width: 45,
    borderRadius: 15, borderWidth: 2, borderColor: '#c9bdb9',
  }
})