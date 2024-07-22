import React, { useState, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SliderSettings } from './../../types/galleryTypes';

const galleryImages = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
];

const GalleryWithThumbnails: React.FC = () => {
  const [mainIndex, setMainIndex] = useState(0);
  const mainSliderRef = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);

  const handleMainBeforeChange = useCallback((oldIndex: number, newIndex: number) => {
    setMainIndex(newIndex);
  }, []);

  const handleThumbClick = useCallback((index: number) => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
    }
  }, []);

  const mainSettings: SliderSettings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: handleMainBeforeChange,
  };

  const thumbnailSettings: SliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    swipeToSlide: true,
    infinite: false,
  };

  return (
    <Box sx={{ width: '500px', margin: '0 auto' }}>
      <Slider ref={mainSliderRef} {...mainSettings}>
        {galleryImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        ))}
      </Slider>
      <Box sx={{ mt: 2 }}>
        <Slider ref={thumbSliderRef} {...thumbnailSettings}>
          {galleryImages.map((image, index) => (
            <Box 
              key={index} 
              sx={{ 
                px: 1, 
                opacity: index === mainIndex ? 1 : 0.5,
                transition: 'opacity 0.3s ease'
              }}
              onClick={() => handleThumbClick(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: '100px', height: '100px', objectFit: 'contain', cursor: 'pointer' }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default GalleryWithThumbnails;