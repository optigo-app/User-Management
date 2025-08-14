import React from 'react';
import { Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Delete = ({ onOpen }) => {
  return (
    <Chip
      icon={<DeleteIcon />}
      label="Delete"
      onDelete={() => onOpen(true)}
      color="error"
      variant="outlined"
      size='small'
      sx={{
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'error.main',
          color: 'white',
          borderColor: 'error.main',
          '& .MuiChip-icon': {
            color: 'white',
          },
        },
        '& .MuiChip-icon': {
          color: 'error.main',
        },
      }}
    />
  );
};

export default Delete;
