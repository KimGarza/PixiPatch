import { View } from "react-native";
import MutableItem from "../mutableItem/MutableItem";
import { DrawingItem } from "@/src/customTypes/itemTypes";

  interface Props {
    drawings: DrawingItem[],
}

const ViewDrawings: React.FC<Props> = ({ drawings }) => {

    return (
        <View>
            {drawings.map((drawing, index) => (
                <MutableItem
                    key={index}
                    item={drawing}
                />
            ))}
        </View>
    );
}

export default ViewDrawings;