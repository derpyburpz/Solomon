import { PaletteMode } from '@mui/material';
import amber from '@mui/material/colors/amber';
import deepOrange from '@mui/material/colors/deepOrange';
import grey from '@mui/material/colors/grey';
import lightBlue from '@mui/material/colors/lightBlue';
import blue from '@mui/material/colors/blue';


export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // light mode config
            primary: amber,
            divider: amber[200],
            background: {
              default: grey[100],
              paper: grey[100],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // dark mode config
            primary: blue,
            divider: grey[100],
            background: {
              default: grey[800],
              paper: grey[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[200],
            },
          }),
    },
    typography: {
      fontFamily: 'Inter, Arial, sans-serif',
      h4: {
        fontFamily: 'Inter, Arial, sans-serif',
      },
      body1: {
        fontFamily: 'Inter, Arial, sans-serif',
      },
    },
  });
  