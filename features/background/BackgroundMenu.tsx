import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BackgroundCtx } from './BackgroundCtx';
import { useContext } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useState, useEffect } from 'react';
import { backgroundAssets } from './backgroundAssets';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const { width, height, headerHeight } = GlobalDimensions();
const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = width / aspectRatio;

interface BackgroundMenuProps {
  menuToggle: () => void;
}

const BackgroundMenu: React.FC<BackgroundMenuProps> = ({ menuToggle }) => {

  const [viewBackgrounds, setViewBackgrounds] = useState<{id: string, source: ImageSourcePropType}[]>([]);
  const [selectedPack, setSelectedPack] = useState<string>('basic');
  let backgrounds = backgroundAssets[selectedPack];

  useEffect(() => {
    
    const bgList = Object.keys(backgrounds).map((key) => ({
      id: key,
      source: backgrounds[key].srcUri,
    }));
    setViewBackgrounds(bgList);

  }, [selectedPack]) // anytime new tab is selected

  // background context for adding backgrounds based on user selection
  const { setBackground } = useContext(BackgroundCtx); // updata context to have error hnandling

  // on select/press background, convert Background to have a position (backgroundData) and add it to the backgrounds state array in backgroundCtx 
  const handleBackgroundSelect = (background: ImageSourcePropType) => {
    setBackground(background); // update old to new background or set initial one
  }

  const handleCloseMenu = () => {
    menuToggle();
  }

  return (
    <View style={styles.container}>

      <View style={styles.close}>
        <TouchableOpacity onPress={() => handleCloseMenu()}>
          <EvilIcons name={'close'} size={35}/>
        </TouchableOpacity>
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
  );
}

export default BackgroundMenu;

const styles = StyleSheet.create({
  container: {
    display: 'flex', flexDirection: 'row',
    width: width,
    height: height - canvasHeight - headerHeight,
    borderWidth: .5, borderRadius: 15, borderColor: 'black',
    backgroundColor: '#fffaf8'
  },
  close: {
    position: 'absolute',
    margin: 5,
    right: 0, top: 0,
    zIndex: 99999999,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  scrollView: {
    top: '35%',
    width: '100%', height: '60%',
    zIndex: 9999,
    paddingHorizontal: 10,
  },
  backgrounds: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%', height: '50%',
    zIndex: 9999,
  },
  background: {
    height: 45, width: 45,
    borderRadius: 100, borderWidth: 2, borderColor: '#c9bdb9',
  }
})