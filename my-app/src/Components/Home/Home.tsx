import React from 'react';
import { Container, Typography, Paper, Grid, Box, Button } from '@mui/material';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Hero Section */}
            <Paper sx={{ p: 6, mb: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <BeachAccessIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h3" gutterBottom>
                    Welcome to Vacation Explorer
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Discover and track amazing vacation destinations around the world
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/vacations')}
                >
                    Explore Vacations
                </Button>
            </Paper>

            {/* Features Section */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <BeachAccessIcon color="primary" sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" gutterBottom align="center">
                            Browse Vacations
                        </Typography>
                        <Typography>
                            Explore a curated collection of vacation packages from around the world. 
                            Each destination comes with detailed information, pricing, and dates.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <ThumbUpIcon color="primary" sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" gutterBottom align="center">
                            Like & Follow
                        </Typography>
                        <Typography>
                            Found an interesting destination? Like it to keep track of your favorite 
                            vacation spots and help others discover great locations.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <NotificationsIcon color="primary" sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" gutterBottom align="center">
                            Stay Updated
                        </Typography>
                        <Typography>
                            Follow your favorite destinations and receive updates about price changes, 
                            availability, and new vacation packages.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Call to Action - Only show if not logged in */}
            {!auth?.user && (
                <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Ready to Start Your Journey?
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Join our community of travelers and start exploring amazing destinations today.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="large"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up Now
                    </Button>
                </Paper>
            )}
        </Container>
    );
};

export default Home;