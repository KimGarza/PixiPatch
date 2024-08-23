import { ImageProvider } from '@/components/ImageSelection/ImageCtx';
import ModifyImageContent from '@/components/ModifyImageContent';

export default function ModifyImageScreen() {

  return (
    // wrapping context providers around editor bc wrapping context providers around comps within EditorContent does not work
      <ImageProvider>
        <ModifyImageContent/>
      </ImageProvider>
  );
}