import React from 'react';
import { Box, IconButton } from '@mui/joy';
import { Typography } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SchoolIcon from '@mui/icons-material/School';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const categories = [
  { icon: <LocalMoviesIcon sx={{ fontSize: 60 }} />, label: 'Film', value: '1' },
  { icon: <FastfoodIcon sx={{ fontSize: 60 }} />, label: 'Culinary', value: '2' },
  { icon: <SchoolIcon sx={{ fontSize: 60 }} />, label: 'Seminar', value: '3' },
  { icon: <MusicNoteIcon sx={{ fontSize: 60 }} />, label: 'Concert', value: '4' },
  { icon: <HolidayVillageIcon sx={{ fontSize: 60 }} />, label: 'Gathering', value: '5' },
  { icon: <VideogameAssetIcon sx={{ fontSize: 60 }} />, label: 'E-Sports', value: '6' },
  { icon: <SportsBasketballIcon sx={{ fontSize: 60 }} />, label: 'Sports', value: '7' },
];

const CategoryIcons: React.FC<{ selectedCategory: string, onChange: (value: string) => void }> = ({ selectedCategory, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={3} mb={3}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #228d96, #0a6169)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          '::after': {
            content: '""',
            position: 'absolute',
            width: '50%',
            height: '3px',
            backgroundColor: '#228d96',
            left: '25%',
            bottom: '-10px',
            borderRadius: '5px',
          },
        }}
      >
        Browse Events
      </Typography>
      <Box display="flex" justifyContent="center" gap={6} padding={2} flexWrap="wrap">
        {categories.map((category) => (
          <Box key={category.value} textAlign="center" sx={{ margin: '8px' }}>
            <IconButton
              size="lg"
              variant={selectedCategory === category.value ? 'solid' : 'outlined'}
              onClick={() => onChange(selectedCategory === category.value ? "" : category.value)}
              sx={{
                borderRadius: '50%',
                width: '140px',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedCategory === category.value ? 'rgb(98, 90, 159)' : 'rgba(0, 0, 255, 0.1)',
                color: selectedCategory === category.value ? 'white' : 'black',
                '&:hover': {
                  backgroundColor: selectedCategory === category.value ? 'rgb(106, 98, 167)' : 'transparent',
                  border: '8px solid'
                },
              }}
            >
              {category.icon}
            </IconButton>
            <Typography>{category.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryIcons;