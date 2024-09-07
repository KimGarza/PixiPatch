import { View } from "react-native";
import { RefObject } from "react";
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

// captures view element (user's work within canvas) as image
// IF THIS RUNS SLOW GET RID OF RETURN AND TRY THIS Promise<void> =>
const SaveDrawing = async (viewRef: RefObject<View>) => { // view is at current
  try {
    console.log("save drawing")
    if (viewRef != null) {
      // capture the view
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
        width: 1000,
        height: 1000
      });

    if (uri) {
        const fileName = uri.split('/').pop();
        const newLocalUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.copyAsync({
            from: uri,
            to: newLocalUri,
        });

      return newLocalUri;
    }
    }
  } catch (error) {
    console.log("Error trying to save photo in captureAndSave.tsx: ", error)
    return null;
  }

  return null;

}
export default SaveDrawing;
