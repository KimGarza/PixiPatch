import { View, Alert } from "react-native";
import { RefObject } from "react";
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';

// captures view element (user's work within canvas) as image
const CaptureAndSave = async (viewRef: RefObject<View>, width: number, height: number, draft: boolean): Promise<void> => { // view is at current

  try {
    if (viewRef != null) {
      // capture the view
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile', // ??
        width: width, // NEED TO MAKE 9:11 NOT 9:16 OR 16:9 OR MAKE 1080 BUT WILL HAVE BLACK AROUND IT NOT PREFERABLE
        height: height
      });

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Media library access is required to save images.');
          return;
        }

        // create an asset from the captured image
        const asset = await MediaLibrary.createAssetAsync(uri);

        const album = await MediaLibrary.getAlbumAsync('Elemental Editor'); // looks for this album name
        if (album == null) {
          // if the album does not exist, create it
          await MediaLibrary.createAlbumAsync('My App Photos', asset, false);
        } else {
          // if the album exists, add the asset to it
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

    } else {
      Alert.alert("Error within captureAndSave.tsx: ", "View ref is not set or the view is not mounted.");
      return;
    }
  } catch (error) {
    console.log("Error trying to save photo in captureAndSave.tsx: ", error)
  }
}
export default CaptureAndSave;
