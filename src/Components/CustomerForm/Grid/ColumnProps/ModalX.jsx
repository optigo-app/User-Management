import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const WelcomeModal = ({ open, onClose, onAccept }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="welcome-modal-title"
      aria-describedby="welcome-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography id="welcome-modal-title" variant="h6" component="h2" gutterBottom>
          Welcome!
        </Typography>
        <Typography id="welcome-modal-description" sx={{ mb: 3 }}>
          We're glad to have you here. Click "Accept" to continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAccept}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Accept
        </Button>
      </Box>
    </Modal>
  );
};

export default WelcomeModal;
