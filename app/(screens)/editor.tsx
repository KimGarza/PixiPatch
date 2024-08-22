import { ImageProvider } from '@/components/ImageSelection/ImageCtx';
import EditorContent from '@/components/EditorContent';
import { DrawProvider } from '@/components/modification/drawing/DrawCtx';
import { StickerProvider } from '@/components/Stickers/StickersCtx';
import { BackgroundProvider } from '@/components/background/BackgroundCtx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function EditorScreen() {

  return (
    // wrapping context providers around editor bc wrapping context providers around comps within EditorContent does not work
    <BackgroundProvider>
      <ImageProvider>
      <StickerProvider>
      <DrawProvider>
      <GestureHandlerRootView>
        <EditorContent/>
      </GestureHandlerRootView>
      </DrawProvider>
      </StickerProvider>
      </ImageProvider>
    </BackgroundProvider>
  );
}