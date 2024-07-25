import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ColorModeContext } from '../contexts/colormodecontext';

import GalleryWithThumbnails from '../components/molecules/gallery';
import ModelCard from '../components/molecules/modelcard';

// const product: Product = {
//   number: '12345',
//   name: 'Product Name',
//   series: 'Series 1',
//   originalPrice: 99.99,
//   releaseDate: '2023-07-22',
//   description: 'This is a detailed description of the product. It explains the features, benefits, and any other relevant information that potential customers might find useful.',
// };

const Home: React.FC = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is the home page. The current theme is {mode === 'light' ? 'Light' : 'Dark'} mode.
      </Typography>
      <Button variant="contained" onClick={toggleColorMode}>
        Toggle Theme
      </Button>
      <Box sx={{ display: 'flex' }}>

          <GalleryWithThumbnails />


          {/* <ModelCard product={product} /> */}
 
      </Box>
    </Box>
  );
};

export default Home;
