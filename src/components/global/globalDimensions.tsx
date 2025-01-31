import { Dimensions } from "react-native";

interface AllDimensions {
    width: number;
    height: number;
    canvasAspectRatio: number;
    homeAspectRatio: number;
    canvasHeight: number;
    homeHeight: number;
    headerHeight: number;
    smallToolbar: number;
    largeToolbar: number;
}

// Static values based on the device's screen dimensions
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const largeAspectRatio = 9 / 14.5;
const smallAspectRatio = 9 / 12;


const dimensions: AllDimensions = {
    width: width,
    height: height,
    canvasAspectRatio: largeAspectRatio,
    homeAspectRatio: smallAspectRatio,
    canvasHeight: width / largeAspectRatio,
    homeHeight: width / smallAspectRatio,
    smallToolbar: height - (width / largeAspectRatio),
    largeToolbar: height - (width / smallAspectRatio),
    headerHeight: .07 * height,
}

const GlobalDimensions = () => {

    return { dimensions };
};

export default GlobalDimensions;
