import { Dimensions } from "react-native";

interface AllDimensions {
    width: number;
    height: number;
    aspectRatio: number;
    canvasHeight: number;
    headerHeight: number;
}

// Static values based on the device's screen dimensions
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const aspectRatio = 9 / 14.5;

const dimensions: AllDimensions = {
    width: width,
    height: height,
    aspectRatio: aspectRatio,
    canvasHeight: width / aspectRatio,
    headerHeight: .07 * height,
}

const GlobalDimensions = () => {

    return { dimensions };
};

export default GlobalDimensions;
