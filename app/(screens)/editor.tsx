import { ImageProvider } from '@/components/ImageSelection/ImageCtx';
import EditorContent from '@/components/EditorContent';
import { DrawProvider } from '@/components/drawing/DrawCtx';
import { StickerProvider } from '@/components/Stickers/StickersCtx';
import { BackgroundProvider } from '@/components/background/BackgroundCtx';

export default function EditorScreen() {

  return (
    // wrapping context providers around editor bc wrapping context providers around comps within EditorContent does not work
    <BackgroundProvider>
      <ImageProvider>
      <StickerProvider>
      <DrawProvider>
        <EditorContent/>
      </DrawProvider>
      </StickerProvider>
      </ImageProvider>
    </BackgroundProvider>
  );
}