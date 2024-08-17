import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface Props {
    image: ImageSourcePropType;
    children?: React.ReactNode;
}

const CropTool: React.FC<Props> = ({ image, children }) => {

    const router = useRouter();

return (
    <TouchableOpacity
        onPress={() =>
            router.push({
                pathname: '/(screens)/modifyImage',
                params: {
                    image: JSON.stringify(image),
                    type: 'crop'
                },
            })
        }>
            {children}
    </TouchableOpacity>
);
}

export default CropTool;