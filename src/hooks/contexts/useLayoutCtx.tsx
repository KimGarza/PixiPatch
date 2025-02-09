import { LayoutConfig } from "@/src/customTypes/itemTypes";
import { createContext, Dispatch, SetStateAction, useState, useContext, useEffect } from "react"

// what is accessible from context
interface layoutCtxType {
    layout: LayoutConfig | null,
    setLayout: Dispatch<SetStateAction<LayoutConfig | null>>,
}

const LayoutCtx = createContext<layoutCtxType | undefined>(undefined);
export const useLayoutCtx = () => {
    const context = useContext(LayoutCtx);
    if (!context) {
        throw new Error("useuseLayoutCtx must be used within an LayoutProvider");
    }
    return context;
}

interface Props {
    children?: React.ReactNode;
}

// create provider to be a wrapper
export const LayoutProvider: React.FC<Props> = ({ children }) => {
    const [layout, setLayout] = useState<LayoutConfig | null>(null);

    return (
        <LayoutCtx.Provider value={{ layout, setLayout }}>
            {children}
        </LayoutCtx.Provider> 
    );
}