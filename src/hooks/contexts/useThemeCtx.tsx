import { createContext, useContext } from "react";

interface ThemeCtxType {
    colors: {
        Rust: string;
        DarkRust: string;
        Peach: string;
        DarkPeach: string;
        Mud: string;
        MudLight: string;
        SageGrey: string
        SageGreyWarm: string
    }
}

const theme: ThemeCtxType = {
    colors: {
        Rust: '#581800',
        DarkRust: '#581800',
        Peach: '#581800',
        DarkPeach: '#581800',
        Mud: '#581800',
        MudLight: '#581800',
        SageGrey: '#dfded8',
        SageGreyWarm: '#e5dfd8',
    }
}

export const ThemeCtx = createContext<ThemeCtxType>(theme);

export const useThemeCtx = () => {
    const context = useContext(ThemeCtx);
    if (!context) throw new Error("useThemeCtx must be used within ThemeProvider")
    return context;
}

export const ThemeProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}