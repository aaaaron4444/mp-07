import React from 'react';
import { Box, Button, Typography } from '@mui/joy';
import Link from 'next/link';

const CreateEventBanner: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 5,
        p: 2,
        borderRadius: 6,
        background:
          'orange',
        color: '#fff',
      }}
    >
      <Typography
        level="h2"
        sx={{
          fontSize: { xs: '38px', sm: '52px', md: '64px' },
          fontWeight: 800,
          background:
            'white',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Post Event
      </Typography>
      <Link href="/create-event" passHref>
        <Button
          variant="solid"
          size="lg"
          sx={{
            mt: 2,
            width: { xs: '40%', sm: '35%', md: '25%' },
            backgroundColor: '#FF7F50',
            color: '#fff',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#FF6347',
              transform: 'scale(1.05)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 2s ease-in-out',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Create event
        </Button>
      </Link>
    </Box>
  );
};

export default CreateEventBanner;