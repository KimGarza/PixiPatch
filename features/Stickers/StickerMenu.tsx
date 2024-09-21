import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType, ScrollView, Text, ActivityIndicator } from 'react-native';
import { StickerItem } from '@/customTypes/itemTypes';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { stickerAssets } from './stickerAssets';
import { Asset } from 'expo-asset';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwipeDownMenu from '@/components/utils/swipeMenuDown';
import { useFonts } from 'expo-font';

const cinnamon = '#581800';
const { width, height, headerHeight } = GlobalDimensions();
const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = width / aspectRatio;

interface StickerMenuProps {
  menuToggle: () => void;
}

const StickerMenu: React.FC<StickerMenuProps> = ({ menuToggle }) => {

  const { createItems } = useItemCtx();

  const [viewStickers, setViewStickers] = useState<{id: string, source: ImageSourcePropType}[]>([]);
  const [selectedPack, setSelectedPack] = useState<string>('basic');
  const [packNames, setPackNames] = useState<string[]>(Object.keys(stickerAssets));
  
  let stickers = stickerAssets[selectedPack];

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  useEffect(() => {
    // convert the current tab of stickerAssets into an array of sticker objs
    const stickerList = Object.keys(stickers).map((key) => ({ // object.keys (keys) is each name in stickers object
      id: key, // so flower is now id and key
      source: stickers[key].srcUri, // find flower from stickers
    }));
    setViewStickers(stickerList);

  }, [selectedPack]) // anytime new sticker tab is selected

  const handleChangeTab = (newPack: string) => {
    setSelectedPack(newPack);
  }

  const handleCloseMenu = () => {
    menuToggle();
  }

  // when sticker from menu is selected...
  const handleStickerSelect = async (sticker: ImageSourcePropType) => {
    // save sticker to local app storage
    const newLocalUri = await saveStickerLocally(sticker);
    // convert to StickerItem type
    const stickerItem = convertToStickerItem(newLocalUri);
    // add to useItemCtx
    createItems({itemType: 'sticker', properties: [stickerItem]});
  }

  // ImageSourceProp value is passed in but then it's a number which represents the reference I believe in memory to the ImageSourceProp
  const saveStickerLocally = async (stickerUri: number | string | ImageSourcePropType) => {
    let assetUri: string = ''; // created then used within 2 different scopes
    try {
      // generate file name
      const fileName = `sticker_${Date.now()}.png`; // use date for a dynamic name

      // if stickerUri is a number, it's a require() result reference
      if (typeof stickerUri === 'number') {

        const asset = Asset.fromModule(stickerUri);
         // download to cache!
        await asset.downloadAsync();

        if (asset.localUri) {
          assetUri = asset.localUri;
        }
        // Check if the sticker pack directory exists
        const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/stickerPacks/${selectedPack}/`);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/stickerPacks/${selectedPack}/`, { intermediates: true });
        }
        // Move the file to the new location
        const newLocalUri = `${FileSystem.documentDirectory}/stickerPacks/${selectedPack}/${fileName}`;
        await FileSystem.copyAsync({
          from: assetUri,
          to: newLocalUri,
        });
        
        return newLocalUri;
      } else {
        throw new Error('Invalid sticker URI', );
      }
    } catch (error) {
      console.error('Error downloading the sticker:', error);
      return '';
    }
  };

  // take uri of the sticker and convert to StickerItem
  const convertToStickerItem = (newUri: string) => {

    const x = Math.floor(Math.random() * (width * 0.5)) + (width * 0.25);
    const y = Math.floor(Math.random() * (width * 0.5)) + (width * 0.25);

    const converted: StickerItem = { // returns image regardless of if wxh adjustment fails
      id: '', type: 'sticker', zIndex: 2,
      imageInfo: {
        uri: newUri,
        width: 1000,
        height: 1000,
      },
      height: 80, width: 80,
      translateX: x,
      translateY: y,
      rotation: 0,
      pendingChanges: {rotation: 0, positionX: x, positionY: y, scale: 1},
    }

    return converted;
  }

  return (
    <View style={styles.moreControl}>
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
            <Text style={{fontFamily: 'ToThePoint', fontSize: 45, color: cinnamon, textAlign: 'center'}}>Stickers <AntDesign name="smileo" size={20} color={cinnamon}/></Text>
          </View>

        </View>

        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          style={styles.scrollView}
        >
          <View style={styles.stickers}>
            {viewStickers.map((sticker, index) => (
              <TouchableOpacity key={index} onPress={() => handleStickerSelect(sticker.source)}>
                <Image source={sticker.source} style={styles.sticker}/>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
          
      </View>
    </SwipeDownMenu>
    </View>
  );
}

export default StickerMenu;

const styles = StyleSheet.create({
  moreControl: {
    top: '-10%',
    width: width,
    height: (height - canvasHeight - headerHeight) * 1.7, // if top starts 10% higher, why isn't it * 1.1?
    backgroundColor: '#fffaf8',
  },
  container: {
    display: 'flex', flexDirection: 'row',
    width: width,
    height: '100%'
  },
  close: {
    position: 'absolute',
    margin: 5,
    right: 0, top: 0,
    zIndex: 99999999,
  },
  titleTabs: {
    position: 'absolute',
    top: -90,
    zIndex: 9,
    width: '101%',
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
    justifyContent: 'center',
  },
  scrollView: {
    zIndex: 9999,
  },
  stickers: { // this already fits within bounds of bottomTooblar styles
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 20,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    gap: 20,
    width: '100%', height: '100%',
    zIndex: 9999,
  },
  sticker: {
    height: 50,
    width: 50,
  }
})