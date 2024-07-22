import React, { createContext, useMemo, useState, ReactNode } from 'react';
import { PaletteMode } from '@mui/material';

import { ColorModeContextType, ColorModeProviderProps } from '../types/themeTypes';

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'dark',
  toggleColorMode: () => {}
});

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const colorMode = useMemo(() => ({ toggleColorMode, mode }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};
