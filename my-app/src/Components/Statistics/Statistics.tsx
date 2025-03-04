import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

interface CountryStats {
    destination: string;
    likes: number;
}

interface Stats {
    totalLikes?: number;
    totalUsers?: number;
    countryStats?: {
        destinations: CountryStats[];
        vacation_stats: {
            total: number;
            past: number;
            ongoing: number;
            future: number;
        };
    };
}

const Statistics: React.FC = () => {
    const [stats, setStats] = useState<Stats>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        // Redirect if not logged in
        if (!auth?.user) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const [likesRes, usersRes, countriesRes] = await Promise.all([
                    fetch('http://localhost:5000/like/statistics'),
                    fetch('http://localhost:5000/user/statistics'),
                    fetch('http://localhost:5000/country/statistics')
                ]);

                const [likesData, usersData, countriesData] = await Promise.all([
                    likesRes.json(),
                    usersRes.json(),
                    countriesRes.json()
                ]);

                setStats({
                    totalLikes: likesData.likes,
                    totalUsers: usersData.total_users,
                    countryStats: countriesData
                });
            } catch (err) {
                setError('Failed to fetch statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [auth, navigate]);

    if (loading) return <Typography>Loading statistics...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Vacation Statistics
            </Typography>
            
            <Grid container spacing={3}>
                {/* Total Users Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Users
                            </Typography>
                            <Typography variant="h3">
                                {stats.totalUsers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Likes Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Likes
                            </Typography>
                            <Typography variant="h3">
                                {stats.totalLikes}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Vacation Statistics Card */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Vacation Statistics
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Total</Typography>
                                    <Typography variant="h4">{stats.countryStats?.vacation_stats?.total || 0}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Past</Typography>
                                    <Typography variant="h4">{stats.countryStats?.vacation_stats?.past || 0}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Ongoing</Typography>
                                    <Typography variant="h4">{stats.countryStats?.vacation_stats?.ongoing || 0}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Future</Typography>
                                    <Typography variant="h4">{stats.countryStats?.vacation_stats?.future || 0}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Popular Destinations */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Popular Destinations
                            </Typography>
                            <Box>
                                {stats.countryStats?.destinations?.map((stat, index) => (
                                    <Box 
                                        key={stat.destination} 
                                        sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            mb: 1,
                                            p: 1,
                                            bgcolor: index % 2 === 0 ? 'background.default' : 'background.paper'
                                        }}
                                    >
                                        <Typography>{stat.destination}</Typography>
                                        <Typography>{stat.likes} likes</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Statistics; 