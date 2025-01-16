import { Box, Typography } from '@mui/material';

export default function Home() {
    return (
        <Box sx={{ 
            width: '100%',
            height: '100%',
            p: 2
        }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Vacation Manager
            </Typography>
            <Typography variant="body1">
                Browse our selection of amazing vacation packages.
            </Typography>
        </Box>
    );
}