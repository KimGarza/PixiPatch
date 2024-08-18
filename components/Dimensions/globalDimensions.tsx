import { Dimensions, Image } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, PixelRatio } from 'react-native';

// Static values based on the device's screen dimensions
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const aspectRatio = 9 / 14.5; // Example aspect ratio
const canvasHeight = width / aspectRatio;
const headerHeight = .07 * height; // upon calculating the header banner takes about 6.65% of the full window height

// Function to update headerHeight if necessary (called within your screens)
const GlobalDimensions = () => {

    return { width, height, canvasHeight, headerHeight };
};

export default GlobalDimensions;
