import { useContext, useEffect } from 'react';
import { ImageCtx } from '@/components/ImageCtx';
import { ImageProvider } from '@/components/ImageCtx';
import EditorContent from '@/components/EditorContent';


export default function EditorScreen() {

  const { imagesData } = useContext(ImageCtx);

  useEffect(() => {
    console.log("use effect re rendered by images ctx")
    console.log("imagesCtx:", imagesData)
  }, [imagesData])

  return (
    // putting imageProvider wrap around editor return content with all the actual content here doesn't work bc
    // it actually needs to be wrapped around a little level above that where the comp is wrapped not the comp's return content
    // cause we use useContext outside of the realm of the return
    // wrapping imageProvider so that it gets the useContext of imagesCtx available to pull the images stored in it
    <ImageProvider>
      <EditorContent/> 
    </ImageProvider>
  );
}
