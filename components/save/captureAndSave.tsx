import { View, Alert } from "react-native";
import { RefObject } from "react";
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

// captures view element (user's work within canvas) as image
const CaptureAndSave = async (viewRef: RefObject<View>): Promise<void> => { // view is at current

  console.log("viewRef.current IN CAPTURE AND SAVE BEFORE TRY", viewRef.current);
 
  try {
    console.log("viewRef.current within the capture and save", viewRef.current);

    if (viewRef != null) {
      // capture the view
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile', // ??
        width: 978.75, // NEED TO MAKE 9:11 NOT 9:16 OR 16:9 OR MAKE 1080 BUT WILL HAVE BLACK AROUND IT NOT PREFERABLE
        height: 1740
      });

      // request media library permissions
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

      console.log('Image saved to photo library!');
    } else {
      Alert.alert("Error within captureAndSave.tsx: ", "View ref is not set or the view is not mounted.");
      return;
    }
  } catch (error) {
    console.log("Error trying to save photo in captureAndSave.tsx: ", error)
  }
}
export default CaptureAndSave;
