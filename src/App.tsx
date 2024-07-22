import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import AppRoutes from './routes';
import NavBar from './components/organisms/navbar';
import { ColorModeProvider, ColorModeContext } from './contexts/colormodecontext';
import { getDesignTokens } from './utils/getDesignTokens';

const App: React.FC = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar toggleColorMode={toggleColorMode} mode={mode} />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

const ThemedApp: React.FC = () => (
  <ColorModeProvider>
    <App />
  </ColorModeProvider>
);

export default ThemedApp;
