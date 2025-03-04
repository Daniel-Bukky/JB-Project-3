import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Credits: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Credits
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Developed By
                    </Typography>
                    <Typography>Daniel Bukky</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Technologies Used
                    </Typography>
                    <Typography>
                        Frontend: React, TypeScript, Material-UI<br />
                        Backend: Python, Flask<br />
                        Database: PostgreSQL
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        © 2024 Vacation Project
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Credits; 