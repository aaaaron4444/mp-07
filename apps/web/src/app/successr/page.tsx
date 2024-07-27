'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SuccessRegister() {
    const router = useRouter();

    const handleGoToLoginpage = () => {
        router.push('/login');
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleGoToLoginpage();
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 4,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Typography
                component="h1"
                variant="h3"
                sx={{ mb: 2, fontWeight: 'bold', animation: 'fadeIn 1s ease-in-out' }}
            >
                Congratulations
            </Typography>
            <Typography
                component="h2"
                variant="h5"
                sx={{ mb: 4, animation: 'fadeIn 1.5s ease-in-out' }}
            >
                Successfully Registered
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoToLoginpage}
                sx={{
                    padding: '10px 20px',
                    fontSize: '1.1rem',
                    animation: 'fadeIn 2s ease-in-out',
                    backgroundColor: '#145ca4',
                    ':hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
            >
                login
            </Button>
        </Container>
    );
}

export default SuccessRegister;