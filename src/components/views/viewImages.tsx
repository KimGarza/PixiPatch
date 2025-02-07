import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import MutableItem from "../mutableItem/MutableItem";
import { ImageItem, LayoutConfig } from '@/src/customTypes/itemTypes';
import GlobalDimensions from "../global/globalDimensions";

const { dimensions } = GlobalDimensions();
interface ViewImagesProps {
    images: ImageItem[],
    layout: LayoutConfig | null,
}

// images are selected by user, stored in context which provider is wrapped around editorContent. Props value of those images sent to viewImages.
const ViewImages: React.FC<ViewImagesProps> = ({images, layout}) => {
    // If a layout exists, apply its algorithm
    const computedLayout = layout ? layout.algorithm(images.map(img => img.imageInfo.uri)) : null;
    const gridCellWidth = computedLayout ? dimensions.width / computedLayout.columns : dimensions.width;
    const gridCellHeight = gridCellWidth * (9 / 14.5);
    useEffect(() => {
        console.log("images in view", images)
        // console.log("layout in view: ", layout)
    }, [layout]);

    return (
        <View style={{ height: '100%' }}>
            {computedLayout ? (
                computedLayout.gridPositions.map((item, index) => {
                const image = images.find(img => img.imageInfo.uri === item.uri);
                if (!image) return null; // Safety check
                return (
                    <View
                        key={image.id}
                        style={{
                            position: "absolute",
                            zIndex: 999999999999,
                            left: item.x,
                            top: item.y,
                            width: '100%',
                            height: '100%',
                            borderWidth: 3, borderColor: "blue",
                            justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <MutableItem item={image} />
                    </View>
                ); })
            ) : (
            // ✅ If no layout, render in a default flex-wrap style
            <View>
                {images.map((image) => (
                    <MutableItem
                        key={image.id}
                        item={image}
                    />
                ))}
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    toolIcons: {
    },
})

export default ViewImages;