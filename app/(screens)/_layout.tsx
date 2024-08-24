import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '../../hooks/useColorScheme'
import { ImageProvider } from '@/hooks/contexts/useImageCtx';
import { BackgroundProvider } from '@/components/background/BackgroundCtx';
import { StickerProvider } from '@/components/Stickers/StickersCtx';
import { DrawProvider } from '@/components/modification/drawing/DrawCtx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// prevents the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// acts as root component, theme management, provider wrapper!
export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BackgroundProvider>
    <ImageProvider>
    <StickerProvider>
    <DrawProvider>
    <GestureHandlerRootView>
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}/>
    </ThemeProvider>
    </GestureHandlerRootView>
    </DrawProvider>
    </StickerProvider>
    </ImageProvider>
    </BackgroundProvider>
  );
}
