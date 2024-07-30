import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import EventCard from './eventCard';
import CategoryIcons from './categoryIcons';
import { Grid, TextField, Box, CircularProgress, MenuItem, Select, InputLabel, FormControl, Typography, SelectChangeEvent } from '@mui/material';
import CustomPagination from './customPage';
import debounce from 'lodash/debounce';
import { locations } from '../../../lib/constant';

interface Event {
    event_id: number;
    event_name: string;
    event_description: string;
    original_price: number;
    location_id: number;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);

    const fetchEvents = useCallback((page: number, textInput: string, location: string, category: string, isInitialLoad: boolean) => {
        if (isInitialLoad) {
            setInitialLoading(true);
        } else {
            setPageLoading(true);
        }

        axios.get('http://localhost:8000/api/events', {
            params: { page, textInput, location: location ? Number(location) : null, category: category ? Number(category) : null }
        })
            .then(response => {
                if (response.data.data && response.data.total_count !== undefined) {
                    setEvents(response.data.data);
                    setTotalPages(Math.ceil(response.data.total_count / pageSize));
                } else {
                    console.error('Unexpected response structure', response.data);
                }
                setInitialLoading(false);
                setPageLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setInitialLoading(false);
                setPageLoading(false);
            });
    }, [pageSize]);

    const debouncedFetchEvents = useCallback(
        debounce((page, searchTerm, loc, cat) => {
            fetchEvents(page, searchTerm, loc, cat, true);
        }, 500),
        [fetchEvents]
    );

    useEffect(() => {
        if (!initialLoading) {
            fetchEvents(currentPage, searchText, location, category, false);
        }
    }, [currentPage, fetchEvents, searchText, location, category, initialLoading]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        debouncedFetchEvents(1, e.target.value, location, category);
    };

    const handleLocationChange = (e: SelectChangeEvent<string>) => {
        setLocation(e.target.value);
        debouncedFetchEvents(1, searchText, e.target.value, category);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        debouncedFetchEvents(1, searchText, location, value);
    };

    const handleBuyTicket = (event_id: number) => {
        if (router && typeof window !== 'undefined') {
            router.push(`/transaction?event_id=${event_id}`);
        }
    };

    const getCityName = (locationId: number) => {
        const location = locations.find(loc => loc.value === locationId.toString());
        return location ? location.label : 'Unknown Location';
    };

    return (
        <Box sx={{ mb: 18 }}>
            <CategoryIcons selectedCategory={category} onChange={handleCategoryChange} />
            <TextField
                label="Search Events"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchText}
                onChange={handleSearch}
                sx={{
                    borderRadius: '25px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '25px',
                    },
                }}
            />
            <Box display="flex" justifyContent="space-between" marginBottom="16px">
                <FormControl variant="outlined" margin="normal" fullWidth sx={{ marginRight: 1 }}>
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                        labelId="location-label"
                        value={location}
                        onChange={handleLocationChange}
                        label="Location"
                        sx={{
                            borderRadius: '25px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '25px',
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {locations.map((loc) => (
                            <MenuItem key={loc.value} value={loc.value}>
                                {loc.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    width: {
                        xs: '100%vw', 
                        sm: '100%vw', 
                        md: '100%vw', 
                        lg: '1150px', 
                    },
                    height: {
                        xs: '100%vw', 
                        sm: '100%vw', 
                        md: '100%vw', 
                        lg: '500px', 
                    },
                    mx: '3px',
                    my: '3px'
                }}
            >
                {initialLoading ? (
                    <Box width="100%" display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box
                            width="100%"
                            sx={{
                                minHeight: '700px', 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Grid container spacing={2} justifyContent="space-between" flexGrow={1}>
                                {
                                    events.map(event => (
                                        <Grid item xs={12} sm={6} md={4} key={event.event_id}>
                                            <Box width="100%" height="100%">
                                                <EventCard
                                                    event_name={event.event_name}
                                                    event_description={event.event_description}
                                                    event_id={event.event_id}
                                                    original_price={event.original_price}
                                                    event_location={getCityName(event.location_id)}
                                                    onBuyTicket={handleBuyTicket}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                                {events.length > 0 && events.length < 6 && Array.from(Array(6 - events.length).keys()).map((_, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={`placeholder-${index}`}>
                                    </Grid>
                                ))}
                            </Grid>
                            {totalPages > 1 && (
                                <Box mt={1} display="flex" justifyContent="center">
                                    <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                </Box>
                            )}
                        </Box>
                        {pageLoading && (
                            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default EventList;