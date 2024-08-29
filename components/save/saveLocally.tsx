import * as FileSystem from 'expo-file-system';
import { ImageInfo } from '@../../../customTypes/itemTypes';
  
// Used for expo-image-manipulator libraries which result in new uris after manipulations, need to store these cached uris locally
export const SaveLocally = async (incomingImage: ImageInfo) : Promise<string> => {

    const fileName = incomingImage.uri.split('/').pop();
    const newLocalUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
        from: incomingImage.uri,
        to: newLocalUri,
    });

    return newLocalUri;
}