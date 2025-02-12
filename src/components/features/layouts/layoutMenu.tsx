
import { View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import GlobalDimensions from '@/src/components/global/globalDimensions';
import SwipeDownMenu from '@/src/components/utils/swipeMenuDown';
import { useFonts } from 'expo-font';
import { useLayoutCtx } from '@/src/hooks/contexts/useLayoutCtx';
import { thumbnails } from './layoutThumbnails';
import GlobalTheme from '@/src/components/global/GlobalTheme';
import { layoutConfigs } from './layloutConfigs';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import { ImageItem, LayoutConfig } from '@/src/customTypes/itemTypes';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { colors } = GlobalTheme();
const { dimensions } = GlobalDimensions();

interface Props {
  menuToggle: () => void;
}

const LayoutMenu: React.FC<Props> = ({ menuToggle }) => {
  const { images, updatePendingChanges } = useItemCtx();
  const { setLayout, setTempScales } = useLayoutCtx();
  const [layoutOptions, setLayoutOptions] = useState<{ 
    id: string; 
    name: string; 
    source: ImageSourcePropType; 
    condition: (images: ImageItem[]) => boolean }[]>
  ([]);

  useEffect(() => {
    updatePendingChanges();
    // converting thumbnails object into an array for mapping
    const layoutsArray = Object.entries(layoutConfigs).map(([key, config]) => ({
      id: key,
      name: config.name,
      source: thumbnails[config.thumbnail]?.srcUri,
      condition: config.condition,
    }));

    setLayoutOptions(layoutsArray);
  }, []); 

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleLayoutSelect = (selectedLayout: { id: string; name: string; source: ImageSourcePropType; condition: (images: ImageItem[]) => boolean }) => {
    const layout: LayoutConfig | null = Object.values(layoutConfigs).find(layout => layout.name === selectedLayout.name) || null;
    if (layout?.name === "No Layout") {
      setLayout(null); // Set layout to null when "No Layout" is selected
    } else {
      setLayout(layout);
    }
  };

  const handleCloseMenu = () => {
    setLayout(null);
    setTempScales({});
    menuToggle();
  }

  const handleSubmitLayout = () => {
    updatePendingChanges();
    setTempScales({});
    setLayout(null);
  }

  return (
    <View style={styles.container}>

    <SwipeDownMenu menuToggle={handleCloseMenu} inTop={-35}>
      <View style={styles.container}>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => handleSubmitLayout()}>
            <Feather name={'thumbs-up'} size={35} color="#a3c4b4"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCloseMenu()}>
          <MaterialCommunityIcons name={'close-thick'} size={35} color="#a3968e"/>
        </TouchableOpacity>
      </View>

       <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          style={styles.scrollView}
        >
          <View style={styles.layouts}>
            {layoutOptions && layoutOptions
              .filter((layout) => layout.condition(images))
              .map((layout, index) => (
              <TouchableOpacity key={index} onPress={() => handleLayoutSelect(layout)}>
                <Image source={layout.source} style={styles.layout}/>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView> 

      </View>
    </SwipeDownMenu>
    </View>

  );
}

export default LayoutMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    position: 'absolute',
    margin: 5,
    right: 0, top: 0,
    zIndex: 99999999,
    gap: 20
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  scrollView: {
    width: '100%', height: '50%',  paddingTop: '5%',
    zIndex: 9999,
    paddingHorizontal: 10,
  },
  layouts: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 20,
    width: '100%', height: '100%',
    zIndex: 9999,
  },
  layout: {
    height: 55, width: 55,
    borderRadius: 15, borderWidth: 2, borderColor: colors.Mud,
  }
})