import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { Filter } from 'lucide-react';

const LoadingOverlay = ({ isVisible, message = "Applying filters..." }) => {
  return (
    <Fade in={isVisible} timeout={200}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 3,
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CircularProgress 
              size={40} 
              thickness={4}
              sx={{ 
                color: '#7367f0',
                animationDuration: '1.2s',
              }} 
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Filter size={16} color="#7367f0" />
            </Box>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#424242',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default LoadingOverlay;
