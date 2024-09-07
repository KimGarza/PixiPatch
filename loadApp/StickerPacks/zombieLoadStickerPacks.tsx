import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import basic from './basic.json' // json is already considered a module so no need to export it

// whichever stickerpack names or (stickerpack purhcase ids) are wihtin array, save them locally to app if not already.
// may need to find a more dynamic way to load the sticker pack json files that user has access to or combine all sticker pack jsons into one file then import all and only pull dynamically by name?
export const preloadStickerPacks = async (stickerPacks: string[]) => {
  try {
    for (const name of stickerPacks) {

      // Check if the directory exists
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/stickerPacks/${name}/`);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/stickerPacks/${name}/`, { intermediates: true }) // similar to the -p option in the Unix mkdir command, which allows the creation of nested directories in a single command without throwing an error if some directories in the path already exist.
      }

      // check local filestorage of app to see if count of files in directory of specific sticker pack matches count of ones in json file 
      const stickerPackDir = `${FileSystem.documentDirectory}/stickerPacks/${name}/`; // where are the sticker pack stickers stored locally

      // read the directory to evaluate quantity of .pngs in that pack
      const files = await FileSystem.readDirectoryAsync(stickerPackDir);
      // filter for specific file types if necessary (e.g., only .png files)
      const imageFiles = files.filter(file => file.endsWith('.png'));
      
      if (imageFiles.length < basic.stickers.length) { // meaning they haven't been loaded or completed loading
        saveStickersLocally(name, basic.stickers) // pass in asset type, specific asset, target path 
      }
    }
  } catch (error) {
  }
}

const saveStickersLocally = async (packName: string, stickerNames: string[]) => {
  try {
    for (const fileName of stickerNames) { // for each sticker file name string in the stickers: of the json...

      const asset = Asset.fromModule(`./assets/stickerPacks/${packName}/${fileName}`);
      const encoded = encodeURI(asset.uri);

      // cache asset
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/cache/`);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/cache/`, { intermediates: true }) // similar to the -p option in the Unix mkdir command, which allows the creation of nested directories in a single command without throwing an error if some directories in the path already exist.
      }
      // await asset.downloadAsync()
      await FileSystem.downloadAsync( encoded, `${FileSystem.documentDirectory}/cache/${asset.name}`)
      // await asset.downloadAsync();
      // save locally to documentDirectory in app locally
      const newLocalUri = `${FileSystem.documentDirectory}/${packName}/${asset.name}`;
      await FileSystem.moveAsync({
        from: asset.uri,
        to: newLocalUri,
      });
    }
  } catch (error) {
    console.error('Error downloading the sticker:', error);
    return null;
  }
}
