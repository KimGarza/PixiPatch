import { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import GlobalDimensions from '@/src/components/global/globalDimensions';
import GlobalTheme from '@/src/components/global/GlobalTheme';
import Providers from '@/src/components/Providers';
// import { preloadStickerPacks } from '@/loadApp/StickerPacks/loadStickerPacks';
// import stickerAssets from '@/loadApp/StickerPacks/stickerAssets';

const { dimensions } = GlobalDimensions();
const { colors } = GlobalTheme();
// prevents the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// render comp to check auth and rener user auth, purchases in global ctx 
// let stickerPacks: string[] = ['basic'];

export default function RootLayout() {

  SplashScreen.hideAsync();
  const [loaded] = useFonts({});

  useEffect(() => {
    if (loaded) {
      // loadStickerPacks(stickerPacks); // load the stickers based on users purchased packs based on pruchase table dynamodb
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <View style={styles.headerNav}>
        <Image
          style={styles.headerImg}
          source={require('../../src/assets/images/ElementalEditorBanner.png')}
        />
      </View>
      <View style={styles.screenContainer}>
        <Stack screenOptions={{ headerShown: false }}/>
      </View>
    </Providers>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    borderWidth: 3, borderColor: 'blue',
    flex: 1,
    backgroundColor: colors.Musk,
  },
  headerNav: {
    borderWidth: 3, borderColor: 'red',
    width: dimensions.width,
    height: dimensions.headerHeight,
  },
  headerImg: {
    width: '100%',
    height: '100%'
  },
});
