import { View } from "react-native";
import MutableItem from "../mutableItem/MutableItem";
import { DrawingItem } from "@/src/customTypes/itemTypes";

  interface Props {
    drawings: DrawingItem[],
}

const ViewDrawings: React.FC<Props> = ({ drawings }) => {

    return (
        <View>
            {drawings.map((drawing) => (
                <MutableItem
                    key={drawing.id}
                    item={drawing}
                />
            ))}
        </View>
    );
}

export default ViewDrawings;