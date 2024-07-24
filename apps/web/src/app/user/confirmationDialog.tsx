import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      PaperProps={{
        sx: {
          background:
            '#ede8f5',
          color: '#fff',
          borderRadius: '10px',
          maxWidth: '500px',
          minWidth: '300px',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: '#FFA000' }} />
          Confirm Changes
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#fff' }}>
          Save Changes ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose(false)}
          color="primary"
          sx={{
            color: '#FF6347',
            '&:hover': {
              color: '#FF7F50',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onClose(true)}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: '#FF7F50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FF6347',
            },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;