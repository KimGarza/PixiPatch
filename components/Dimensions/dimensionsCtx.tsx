import { Dimensions, Image } from "react-native";
import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const aspectRatio = 9 / 14.5; // 9:16 is typical
const canvasHeight = width / aspectRatio;

interface DimensionsCtxType {
    width: number;
    height: number;
    canvasHeight: number;
    headerHeight: number;
    setHeaderHeight: Dispatch<SetStateAction<number>>;
}

const defaultValue: DimensionsCtxType = {
    width: width,
    height: height,
    canvasHeight: canvasHeight,
    headerHeight: 0,
    setHeaderHeight: () => {},
}

export const DimensionsCtx = createContext<DimensionsCtxType>(defaultValue);

interface DimensionsProviderProps {
    children?: React.ReactNode;
}

export const DimensionsProvider: React.FC<DimensionsProviderProps> = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useEffect(() => {
        const imageSource = require('../../assets/images/ElementalEditorBanner.png');
        const source = Image.resolveAssetSource(imageSource);

        Image.getSize(
            source.uri,
            (width, height) => {
                setHeaderHeight(height);  // Set headerHeight to the height of the image
            },
            (error) => {
                console.error('Failed to get image dimensions', error);
            }
        );
    }, []);

    return (
        <DimensionsCtx.Provider
            value={{
                width,
                height,
                canvasHeight,
                headerHeight,
                setHeaderHeight,
            }}
        >
            {children}
        </DimensionsCtx.Provider>
    );
};