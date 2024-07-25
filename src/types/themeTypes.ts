import { PaletteMode } from '@mui/material';

export interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}