import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { PaletteMode } from '@mui/material';

import ModelCard from "../molecules/modelcard";
import GalleryWithThumbnails from "../molecules/gallery";
import { ModelCardProps } from '../../types/modelTypes';

const Model: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { source } = location.state as { source: 'Real_Grades' | 'Master_Grades' };

    let errorMessages: string[] = [];

    if (!id) {
        errorMessages.push('Missing id');
    }

    if (!source) {
        errorMessages.push('Missing source');
    }

    if (errorMessages.length > 0) {
        return (
            <div>
                Error: {errorMessages.join(', ')}
            </div>
        );
    }

    const modelCardProps: ModelCardProps = {
        id: id!,
        source: source
    };

    return (
        <Box>
            {/* <GalleryWithThumbnails /> */}
            <ModelCard {...modelCardProps} />;
        </Box>
    );
}

export default Model;