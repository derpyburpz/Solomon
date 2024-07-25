import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Divider, CircularProgress } from '@mui/material';

import { ColorModeContext } from '../../contexts/colormodecontext';
import { ModelCardProps } from '../../types/modelTypes';
import { RG_Model } from '../../types/modelTypes';
import { MG_Model } from '../../types/modelTypes';
import { supabase } from '../../supabaseClient';

const ModelCard: React.FC<ModelCardProps> = ({ id, source }) => {
  const { mode } = useContext(ColorModeContext);
  const [model, setModel] = useState<RG_Model | MG_Model | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchmodel = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(source)
          .select('*')
          .eq('ID', id)
          .single();

        if (error) throw error;

        setModel(data);
      } catch (error) {
        console.error('Error fetching model:', error);
        setError('Failed to fetch model data');
      } finally {
        setLoading(false);
      }
    };

    fetchmodel();
  }, [id, source]);

  const styles = {
    card: {
      maxWidth: 400,
      margin: '0 auto',
      padding: 3,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: mode === 'light' ? '#f9f9f9' : '#303030'
    },
    title: {
      fontWeight: 'bold',
      color: mode === 'light' ? '#333' : '#fff'
    },
    textPrimary: {
      color: mode === 'light' ? '#333' : '#fff'
    },
    textSecondary: {
      color: mode === 'light' ? '#555' : '#ccc'
    },
    price: {
      color: '#B12704',
      fontWeight: 'bold'
    },
    divider: {
      backgroundColor: mode === 'light' ? '#e0e0e0' : '#444'
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !model) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Typography color="error">{error || 'No data available'}</Typography>
      </Box>
    );
  }

  const modelNum = source === 'Real_Grades' ? (model as RG_Model).RG_Num : (model as MG_Model).MG_Num;

  return (
    <Card variant="outlined" sx={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={styles.title}>
          <strong>Model:</strong> {model.Model}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, ...styles.textSecondary }}>
            <strong>Model Number:</strong> {modelNum}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, ...styles.textSecondary }}>
            <strong>Series:</strong> {model.Series}
          </Typography>

          <Typography variant="h6" sx={styles.price}>
            <strong>Original Price:</strong> {model.Price}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, ...styles.textSecondary }}>
            <strong>Release Date: </strong> {model.Release_Date}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2, ...styles.divider }} />

        <Typography variant="body1" sx={styles.textPrimary}>
          <strong>Notes: </strong> {model.Notes}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ModelCard;