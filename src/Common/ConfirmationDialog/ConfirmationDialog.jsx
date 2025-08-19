import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { Button } from '../../Components/Ui';

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
        <Button className='for_DialogBtn' variant='outline' size='md' onClick={onClose} autoFocus fullWidth>
          {cancelLabel ?? "Cancel"}
        </Button>
        <Button className='for_DialogBtn' variant='primary' size='md' onClick={onConfirm} autoFocus fullWidth>
          {confirmLabel ?? "Remove"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmationDialog);
