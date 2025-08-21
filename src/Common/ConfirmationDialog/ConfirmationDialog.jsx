import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Divider } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, confirmLabel, cancelLabel, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className='DRM'
    >
      <DialogTitle id="alert-dialog-title" className='alert-TitleCl'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className='alert-titleContent'>
          {content}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button className='for_DialogBtn' variant='outlined' size='md' onClick={onClose}>
          {cancelLabel ?? "Cancel"}
        </Button>
        <Button autoFocus  className='for_DialogBtn' variant='contained' size='md' onClick={onConfirm} >
          {confirmLabel ?? "Remove"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmationDialog);
