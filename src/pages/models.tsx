import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ColorModeContext } from '../contexts/colormodecontext';

const Models: React.FC = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Producto Pago
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is the Producto page. The current theme is {mode === 'light' ? 'Light' : 'Dark'} mode.
      </Typography>
      <Button variant="contained" onClick={toggleColorMode}>
        Toggle Theme
      </Button>
    </Box>
  );
};

export default Models;
