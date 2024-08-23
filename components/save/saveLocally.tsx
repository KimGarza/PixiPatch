import * as FileSystem from 'expo-file-system';

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }
  
  // used for image manipulator libraries which result in new uris after manipulations, these are cached uris that need to be stored locally
export const SaveLocally = async (incomingImage: ImageInfo) : Promise<string> => {
    // store the cached new uri to local storage
    const fileName = incomingImage.uri.split('/').pop(); // cropped / flipped
    const newLocalUri = `${FileSystem.documentDirectory}${fileName}`;

    console.log("cached size ", incomingImage.width, incomingImage.height)

    await FileSystem.copyAsync({
        from: incomingImage.uri,
        to: newLocalUri,
    });

    return newLocalUri;
}