import { View, Text } from "react-native";
import { StickerCtx } from "./StickersCtx";
import { useContext } from "react";

const AddStickerUtil = () => {

  const { setStickers } = useContext(StickerCtx);

  // select the sticker logic, so the photo library pulls up and happens natively automatically, here we will have to create our own thing to pull up in place of the editor options unless
  // x is selected or all pho
  // so sticker menu pulls up in place of bottom editor toolbar, upon selecing each sticker, it pops up on the screen
  // to close the window click the fun cute ALL DONE WITH STICKIES <3 BUTTON

  return (
    <View>
      <Text>HI</Text>
    </View>
  )
}

export default AddStickerUtil;