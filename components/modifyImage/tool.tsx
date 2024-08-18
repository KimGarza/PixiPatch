import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface Props {
    image: ImageSourcePropType;
    children?: React.ReactNode;
    editToolName: string; // this will represent a string for crop, mirror, filter, etc...
}

const Tool: React.FC<Props> = ({ image, children, editToolName }) => {

    const router = useRouter();

return (
    <TouchableOpacity
        onPress={() =>
            router.push({
                pathname: '/(screens)/modifyImage',
                params: {
                    image: JSON.stringify(image),
                    type: editToolName
                },
            })
        }>
            {children}
    </TouchableOpacity>
);
}

export default Tool;