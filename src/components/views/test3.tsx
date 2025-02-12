import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import MutableItem from "../mutableItem/MutableItem";
import { ImageItem, LayoutConfig } from "@/src/customTypes/itemTypes";
import { useLayoutCtx } from "@/src/hooks/contexts/useLayoutCtx"; // Import LayoutCtx

interface ViewImagesProps {
    images: ImageItem[];
    layout: LayoutConfig | null;
}

const ViewImages: React.FC<ViewImagesProps> = ({ images, layout }) => {
    const { tempScales, setTempScales } = useLayoutCtx(); // Get tempScales & setter

    // If a layout exists, apply its algorithm
    const computedLayout = layout ? layout.algorithm(images.map(img => img.imageInfo.uri)) : null;

    useEffect(() => {
        if (computedLayout) {
            const newScales: { [id: string]: number } = {};

            images.forEach((image, index) => {
                const gridPos = computedLayout.gridPositions[index];
                if (gridPos) {
                    const gridWidth = computedLayout.gridCellWidth;
                    const gridHeight = computedLayout.gridCellHeight;

                    const imageAspectRatio = image.width / image.height;
                    const gridAspectRatio = gridWidth / gridHeight;

                    let scale;
                    if (imageAspectRatio > gridAspectRatio) {
                        scale = gridHeight / image.height;
                    } else {
                        scale = gridWidth / image.width;
                    }

                    newScales[image.id] = scale;
                }
            });

            // 🔥 Compare previous & new scales - Only update if different
            if (JSON.stringify(newScales) !== JSON.stringify(tempScales)) {
                setTempScales(newScales);
            }
        }
    }, [layout, computedLayout, images, tempScales]); // Add `tempScales` to avoid unnecessary loops

    return (
        <View style={{ height: "100%" }}>
            {computedLayout
                ? computedLayout.gridPositions.map((item, index) => {
                      const image = images.find((img) => img.imageInfo.uri === item.uri);
                      if (!image) return null; // Safety check

                      return (
                          <View
                              key={image.id}
                              style={{
                                  position: "absolute",
                                  overflow: "hidden",
                                  zIndex: 999999999999,
                                  left: item.x,
                                  top: item.y,
                                  width: computedLayout.gridCellWidth,
                                  height: computedLayout.gridCellHeight,
                                  borderWidth: 2,
                                  borderColor: "orange",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }}
                          >
                              <MutableItem item={image} />
                          </View>
                      );
                  })
                : images.map((image) => <MutableItem key={image.id} item={image} />)}
        </View>
    );
};

export default ViewImages;
