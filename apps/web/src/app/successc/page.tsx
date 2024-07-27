'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SuccessCreateEvent() {
  const router = useRouter();

  const handleGoToHomepageEOPage = () => {
    router.push('/');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGoToHomepageEOPage();
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
        Congratulations !
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        sx={{ mb: 4, animation: 'fadeIn 1.5s ease-in-out' }}
      >
        Create event successful
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToHomepageEOPage}
        sx={{
          padding: '10px 20px',
          fontSize: '1.1rem',
          animation: 'fadeIn 2s ease-in-out',
          backgroundColor: '#1976d2',
          ':hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        Homepage
      </Button>
    </Container>
  );
}

export default SuccessCreateEvent;