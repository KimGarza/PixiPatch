import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { BackgroundProvider } from '@/src/components/features/background/BackgroundCtx';
import { DrawProvider } from '@/src/components/features/drawing/DrawCtx';
import { TextProvider } from '@/src/components/features/Text/useTextCtx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ItemProvider } from '@/src/hooks/contexts/useItemCtx';
// import { preloadStickerPacks } from '@/loadApp/StickerPacks/loadStickerPacks';
// import stickerAssets from '@/loadApp/StickerPacks/stickerAssets';

// prevents the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// render comp to check auth and rener user auth, purchases in global ctx 
// let stickerPacks: string[] = ['basic'];
export default function RootLayout() {

  SplashScreen.hideAsync();

  const colorScheme = useColorScheme();
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
    <BackgroundProvider>
    <TextProvider>
    <ItemProvider>
    <DrawProvider>
    <GestureHandlerRootView>
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}/>
    </ThemeProvider>
    </GestureHandlerRootView>
    </DrawProvider>
    </ItemProvider>
    </TextProvider>
    </BackgroundProvider>
  );
}
