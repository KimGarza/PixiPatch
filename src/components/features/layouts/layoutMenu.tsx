
import { View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import GlobalDimensions from '@/src/components/global/globalDimensions';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwipeDownMenu from '@/src/components/utils/swipeMenuDown';
import { useFonts } from 'expo-font';
import { useLayoutCtx } from '@/src/hooks/contexts/useLayoutCtx';
import { thumbnails } from './layoutThumbnails';
import GlobalTheme from '@/src/components/global/GlobalTheme';

const { colors } = GlobalTheme();
const { dimensions } = GlobalDimensions();

interface Props {
  menuToggle: () => void;
}

const LayoutMenu: React.FC<Props> = ({ menuToggle }) => {
  const { setLayout } = useLayoutCtx();
  const [viewLayouts, setViewLayouts] = useState<{ id: string; source: ImageSourcePropType }[]>([]);

  useEffect(() => {
    // converting thumbnails object into an array for mapping
    const layoutsArray = Object.keys(thumbnails).map((key) => ({
      id: key,
      source: thumbnails[key].srcUri,
    }));

    setViewLayouts(layoutsArray);
  }, []); 

  const [fontsLoaded] = useFonts({
    'ToThePoint': require('../../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleLayoutSelect = (layout: ImageSourcePropType) => {
    setLayout(layout); // update old to new layout or set initial one
  }

  const handleCloseMenu = () => {
    menuToggle();
  }

  return (
    <View style={styles.container}>

    <SwipeDownMenu menuToggle={handleCloseMenu} inTop={-35}>
      <View style={styles.container}>

      <View style={styles.close}>
          <TouchableOpacity onPress={() => handleCloseMenu()}>
            <EvilIcons name={'close'} size={35} color="#a3968e"/>
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
            {viewLayouts.map((layout, index) => (
              <TouchableOpacity key={index} onPress={() => handleLayoutSelect(layout.source)}>
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
  close: {
    position: 'absolute',
    margin: 5,
    right: 0, top: 0,
    zIndex: 99999999,
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