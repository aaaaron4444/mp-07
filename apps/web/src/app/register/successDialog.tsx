import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Box, Avatar, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuccessDialogProps {
    open: boolean;
    onClose: () => void;
    successMessage: string | null;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, successMessage }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '.MuiPaper-root': {
                    background: '#ede8f5',
                    color: '#fff',
                    borderRadius: '10px',
                    maxWidth: '600px',
                    minWidth: '400px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                }}
            >
                <CheckCircleIcon sx={{ color: '#00c853', fontSize: 40 }} />
                {'Success!'}
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: '#00c853', width: 60, height: 60 }}>
                        <CheckCircleIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {successMessage}
                    </DialogContentText>
                </Box>
            </DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: '#ede8f5',
                        color: '#fff',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#FF6347',
                        },
                    }}
                >
                    Login
                </Button>
            </Box>
        </Dialog>
    );
};

export default SuccessDialog;