import { createContext, Dispatch, SetStateAction, useState, useContext, useEffect } from "react"

interface interactiveLayoutCtx {
   firstSelected: string | null
   setFirstSelected: Dispatch<SetStateAction<string | null>>
   secondSelected: string | null
   setSecondSelected: Dispatch<SetStateAction<string | null>>
}

const InteractiveLayoutCtx = createContext<interactiveLayoutCtx | undefined>(undefined);
export const useInteractiveLayoutCtx = () => {
    const context = useContext(InteractiveLayoutCtx);
    if (!context) {
        throw new Error("useuseLayoutCtx must be used within an LayoutProvider");
    }
    return context;
}

interface Props {
    children?: React.ReactNode;
}

// create provider to be a wrapper
export const InteractiveLayoutProvider: React.FC<Props> = ({ children }) => {
    const [firstSelected, setFirstSelected] = useState<string | null>(null);
    const [secondSelected, setSecondSelected] = useState<string | null>(null);

    return (
        <InteractiveLayoutCtx.Provider value={{ firstSelected, setFirstSelected, secondSelected, setSecondSelected }}>
            {children}
        </InteractiveLayoutCtx.Provider> 
    );
}

// if (firstSelected === null) {
//     setFirstSelected(item.id);
//     console.log("First set to:", item.id);
//   } else if (firstSelected === item.id) {
//     setFirstSelected(null);
//     console.log("First cleared:", firstSelected);
//   } else if (firstSelected !== item.id) { // Corrected this line
//     setSecondSelected(item.id);
//     console.log("Second set to:", item.id);
//   }