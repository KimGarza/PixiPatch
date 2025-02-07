import { thumbnails } from "./layoutThumbnails";
import { LayoutConfig, ImageItem } from "@/src/customTypes/itemTypes";


export const layoutConfigs: Record<string, LayoutConfig> = {
    smartGrid: {
      name: "Smart Grid",
      thumbnail: "images",
      condition: (images: ImageItem[]) => images.length > 0, // Always available
      algorithm: (images: string[]) => {
        const total = images.length;
        let columns = 1; // Start with 1 column for a single image
  
        // Dynamically adjust columns based on total images
        if (total === 1) columns = 1; // Single image takes full width
        else if (total <= 4) columns = 2; // 2x2 for 2-4 images
        else if (total <= 9) columns = 3; // 3x3 for 5-9 images
        else if (total <= 16) columns = 4; // 4x4 for 10-16 images
        else columns = 5; // Max at 5 columns for 17+
  
        // Ensure that the grid has more rows than columns or is equal
        let rows = Math.ceil(total / columns);
        while (columns > rows && columns > 1) { // just a check/maintaining that rows will be > columns and if not, adjust the setup a bit
          columns--;
          rows = Math.ceil(total / columns);
        }
  
        const remainder = total % columns; // Extra images in last row
  
        // Generate grid positions
        const gridPositions = images.map((image, index) => {
          let x = (index % columns) * 100; // we take the index of image in array, find how many times it goes into the column count and somehow allows it to align correctly to each column with math and reaminders
          let y = Math.floor(index / columns) * 100;
  
          return { uri: image, x, y };
        });
  
        // Detect if last row is incomplete (not full)
        if (remainder > 0) {
          return {
            gridPositions: gridPositions.slice(0, rows * columns), // Regular grid
            lastRowImages: images.slice(rows * columns), // Separate last row images
            columns, // Columns used
          };
        }
  
        return { gridPositions, lastRowImages: [], columns };
      },
    },
    // staggeredGrid: {
    //   name: "Staggered Grid",
    //   thumbnail: "images_copy",
    //   condition: (images: ImageItem[]) => images.length > 1, // Available if >1 image
    //   algorithm: (images: string[]) => {
    //     const gridPositions = images.map((image, index) => ({
    //       uri: image,
    //       x: (index % 3) * 110, // 3 columns staggered
    //       y: Math.floor(index / 3) * 100 + (index % 2 === 0 ? 10 : 0), // Offset every other row
    //     }));
    
    //     return {
    //       gridPositions, // The mapped array (as expected by LayoutConfig)
    //       lastRowImages: [], // Since staggeredGrid may not have a "last row" handling
    //       columns: 3, // Fixed column count for staggered layout
    //     };
    //   },
    // },
    // singleColumn: {
    //   name: "Single Column",
    //   thumbnail: "images_copy_sec",
    //   condition: (images: ImageItem[]) => images.length > 0, // Always available
    //   algorithm: (images: string[]) => {
    //     const gridPositions = images.map((image, index) => ({
    //       uri: image,
    //       x: 0, // Align to left
    //       y: index * 120, // Vertical stacking
    //     }))

    //      return {
    //       gridPositions, // The mapped array (as expected by LayoutConfig)
    //       lastRowImages: [], // Since staggeredGrid may not have a "last row" handling
    //       columns: 3, // Fixed column count for staggered layout
    //     };
    //   },
    // },
    noLayout: {
      name: "No Layout",
      thumbnail: "images",
      condition: (images: ImageItem[]) => images.length > 0, // Always available
      algorithm: (images: string[]) => {
        const gridPositions = images.map((image, index) => ({
          uri: image,
          x: 0, // Align to left
          y: index * 120, // Vertical stacking
        }));

        return {
          gridPositions, // The mapped array (as expected by LayoutConfig)
          lastRowImages: [], // Since staggeredGrid may not have a "last row" handling
          columns: 3, // Fixed column count for staggered layout
        };
      },
    },
  }
  