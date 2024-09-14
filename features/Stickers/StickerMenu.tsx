import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StickerItem } from '@/customTypes/itemTypes';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { stickerAssets } from './stickerAssets';
import { Asset } from 'expo-asset';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { Fontisto } from '@expo/vector-icons';

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
  
  let stickers = stickerAssets[selectedPack];

  useEffect(() => {
    // convert the current tab of stickerAssets into an array of sticker objs
    const stickerList = Object.keys(stickers).map((key) => ({ // object.keys (keys) is each name in stickers object
      id: key, // so flower is now id and key
      source: stickers[key].srcUri, // find flower from stickers
    }));
    setViewStickers(stickerList);

  }, [selectedPack]) // anytime new sticker tab is selected

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
    const converted: StickerItem = {
      id: '', type: 'sticker', zIndex: 2,
      imageInfo: {
        uri: newUri,
        width: 1000,
        height: 1000,
      },
      height: 80, width: 80,
      translateX: Math.floor(Math.random() * (width * 0.5)) + (width * 0.25),
      translateY: Math.floor(Math.random() * (width * 0.5)) + (width * 0.25),
      rotation: 0, 
      pendingChanges: {scale: 1, rotation: 0, positionX: 0, positionY: 0}
    }
    return converted;
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuLayout}>

        <View style={styles.close}>
          <TouchableOpacity onPress={() => handleCloseMenu()}>
          <Fontisto name={'close'} size={25}/>
          </TouchableOpacity>
        </View>

        <View style={styles.stickers}>
            {viewStickers.map((sticker, index) => (
            <TouchableOpacity key={index} onPress={() => handleStickerSelect(sticker.source)}>
              <Image source={sticker.source} style={styles.sticker}/>
            </TouchableOpacity>
          ))}
        </View>
        
      </View>
    </View>
  );
}

export default StickerMenu;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    width: width,
    height: height - canvasHeight - headerHeight + 220, // THIS HARDCODED VALUE NEEDS FIXED
    top: '-50%',
    zIndex: 99999,
    padding: 10,
    gap: 10,
    borderWidth: .5,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#fffaf8'
  },
  stickers: { // this already fits within bounds of bottomTooblar styles
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 35,
    rowGap: 15,
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  menuLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 15,
  },
  close: {
    position: 'absolute',
    right: '-1%',
    top: '-1%',
    zIndex: 99999 
  },
  sticker: {
    height: 50,
    width: 50
  }
})