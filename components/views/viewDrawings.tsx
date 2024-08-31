import { View, StyleSheet, Image } from "react-native";
import MutableImage from "../image/MutableImage";
import { DrawingItem } from '@/customTypes/itemTypes';


  interface Props {
    drawings: DrawingItem[],
}

// images are selected by user, stored in context which provider is wrapped around editorContent. Props value of those images sent to viewImages.
const ViewDrawings: React.FC<Props> = ({ drawings }) => {

    console.log("view drawings ", drawings)

    return (
        <View>
        {drawings.map((drawing, index) => (
            <View 
            style={styles.drawing}
            key={ index }>
                <Image
                source={ drawing.uri }
                style={{
                    width: 100, height: 100, 
                    flexDirection: 'column',
                    position: 'absolute',
                    top: drawing.top, 
                    left: drawing.left,
                }} 
                />
            </View>
        ))}
        </View>
    );
}

export default ViewDrawings;

const styles = StyleSheet.create({
    drawing: {
        zIndex: 999999, // too high and can no longer select images
      },
})