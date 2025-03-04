import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <BeachAccessIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Oops! The page you're looking for seems to have drifted away...
                </Typography>
                <Box>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/')}
                        size="large"
                    >
                        Return Home
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default NotFound; 