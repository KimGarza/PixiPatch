import { ImageProvider } from '@/components/ImageSelection/ImageCtx';
import EditorContent from '@/components/EditorContent';
import { DrawProvider } from '@/components/Drawing/DrawCtx';
import { StickerProvider } from '@/components/Stickers/StickersCtx';

export default function EditorScreen() {

  return (
    // wrapping context providers around editor content bc it actually needs to be a level above (here) where the comp is wrapped not the comp's return content
    <ImageProvider>
    <StickerProvider>
      <DrawProvider>
        <EditorContent/> 
      </DrawProvider>
    </StickerProvider>
    </ImageProvider>
  );
}
