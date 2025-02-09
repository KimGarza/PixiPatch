import { LayoutConfig, ImageItem } from "@/src/customTypes/itemTypes";
import GlobalDimensions from "../../global/globalDimensions";

const { dimensions } = GlobalDimensions();
export const layoutConfigs: Record<string, LayoutConfig> = {
    smartGrid: {
      name: "Smart Grid",
      thumbnail: "images",
      condition: (images: ImageItem[]) => images.length > 0, // Always available
      algorithm: (images: string[]) => {
        const total = images.length;
        let columns = Math.ceil(Math.sqrt(total)); // Start with square-like grid
        let rows = Math.ceil(total / columns); // Calculate rows to fit the columns

        // Step 2: Adjust to ensure the grid is balanced (columns should not be greater than rows)
        if (columns > rows) {
          // If columns > rows, swap the values to maintain balance
          [columns, rows] = [rows, columns];
        }

        // Step 3: Calculate grid cell size based on screen size and the calculated columns and rows
        const gridCellWidth = dimensions.width / columns; // Width per grid cell
        const gridCellHeight = dimensions.canvasHeight / rows; // Height per grid cell

        // Calculate the number of images that will be in the last row
        const lastRowImageCount = total % columns === 0 ? columns : total % columns;

        // Step 4: Generate grid positions for each image
        const gridPositions = images.map((image, index) => {
        const x = (index % columns) * gridCellWidth; // X position based on columns
        const y = Math.floor(index / columns) * gridCellHeight; // Y position based on rows

        return { uri: image, x, y };
      });

      // Handle last row images to ensure they are centered
      const lastRowImages = images.slice(total - lastRowImageCount);
      if (lastRowImages.length > 0) {
        // Add flex-style handling for last row images
        const lastRowX = (dimensions.width - lastRowImageCount * gridCellWidth) / 2; // Center the images
        lastRowImages.forEach((image, index) => {
          gridPositions[total - lastRowImageCount + index].x = lastRowX + index * gridCellWidth;
        });
      }

      return {
        gridPositions,
        columns,
        gridCellWidth,
        gridCellHeight,
        rows,
        lastRowImages,
      };
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
    // noLayout: {
    //   name: "No Layout",
    //   thumbnail: "images",
    //   condition: (images: ImageItem[]) => images.length > 0, // Always available
    //   algorithm: (images: string[]) => {
    //     const gridPositions = images.map((image, index) => ({
    //       uri: image,
    //       x: 0, // Align to left
    //       y: index * 120, // Vertical stacking
    //     }));

    //     return {
    //       gridPositions, // The mapped array (as expected by LayoutConfig)
    //       lastRowImages: [], // Since staggeredGrid may not have a "last row" handling
    //       columns: 3, // Fixed column count for staggered layout
    //     };
    //   },
    // },
  }
  