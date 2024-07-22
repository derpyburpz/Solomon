import { PaletteMode } from '@mui/material';
import { ReactNode } from 'react';

export interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export interface ColorModeProviderProps {
  children: ReactNode;
}