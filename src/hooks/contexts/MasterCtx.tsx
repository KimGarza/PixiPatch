// import { useState } from "react";
// import { useImageCxt } from "./useImageCtx";
// import { useStickerCtx, StickerProvider } from "./useStickerCtx";

// interface Props {
//     children?: React.ReactNode;
// }

// const MasterProvider = ({ children }: Props) => {
  
//     // Function to update both contexts
//     const updateAllContexts = (newStateA, newStateB) => {
//       setStateA(newStateA);
//       setStateB(newStateB);
//     };
  
//     return (
//       <MasterContext.Provider value={{ stateA, stateB, updateAllContexts }}>
//         <useImageCxt.Provider value={{ stateA, setStateA }}>
//           <StickerProvider.Provider value={{ stateB, setStateB }}>
//             {children}
//           </StickerProvider.Provider>
//         </useImageCxt.Provider>
//       </MasterContext.Provider>
//     );
//   };
  