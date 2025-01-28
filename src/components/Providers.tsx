import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../hooks/contexts/useThemeCtx';
import { BackgroundProvider } from '../hooks/contexts/BackgroundCtx';
import { TextProvider } from '../hooks/contexts/useTextCtx';
import { ItemProvider } from '../hooks/contexts/useItemCtx';
import { DrawProvider } from '../hooks/contexts/useDrawCtx'

interface Props {
    children?: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <TextProvider>
          <ItemProvider>
            <DrawProvider>
              <GestureHandlerRootView>
                  {children}
              </GestureHandlerRootView>
            </DrawProvider>
          </ItemProvider>
        </TextProvider>
      </BackgroundProvider>
    </ThemeProvider>
  );
};

export default Providers;
