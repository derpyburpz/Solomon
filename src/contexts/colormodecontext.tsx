import React, { createContext, useMemo, useState, ReactNode } from 'react';
import { PaletteMode } from '@mui/material';

import { ColorModeContextType } from '../types/themeTypes';

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'dark',
  toggleColorMode: () => {}
});

export const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  // Accepts prop type ReactNode: Anything that can be rendered in React 
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const colorMode = useMemo(() => ({ toggleColorMode, mode }), [mode]); // [mode] is the dependency array

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};
