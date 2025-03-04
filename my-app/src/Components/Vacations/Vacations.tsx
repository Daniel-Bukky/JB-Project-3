import { deleteVacation } from "../../api/vacationApi";
import { useEffect, useState, useContext } from "react";
import { IVacation, ICountry, ILike } from "../../models/index";
import { Box, Card, CardContent, CardMedia, Container, Typography, Button, CardActions, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { fetchCountries } from "../../api/countryApi";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLikesbyUserId, unlikeVacation, likeVacation } from "../../api/likesApi";

export default function Vacations() {
    const [vacations, setVacations] = useState<IVacation[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [likedVacations, setLikedVacations] = useState<number[]>([]);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchVacationsData = async () => {
        try {
            const response = await fetch('http://localhost:5000/vacations');
            const data = await response.json();
            setVacations(data);
        } catch (error) {
            console.error('Error fetching vacations:', error);
        }
    };

    useEffect(() => {
        fetchVacationsData();
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            const data = await fetchCountries();
            setCountries(data);
        };
        getCountries();
    }, []);

    useEffect(() => {
        const initializeLikes = async () => {
            // Skip if there's no token or no user ID
            if (!auth?.user?.id) {
                console.log('No user ID available, skipping likes initialization');
                return;
            }

            try {
                console.log('Fetching likes for user:', auth.user.id);
                const likes = await getLikesbyUserId(auth.user.id);
                console.log('Received likes:', likes);
                const likedVacationIds = likes.map((like: ILike) => like.vacation_id);
                console.log('Mapped vacation IDs:', likedVacationIds);
                setLikedVacations(likedVacationIds);
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        initializeLikes();
    }, [auth?.user?.id]); // Only depend on user ID instead of the whole user object

    useEffect(() => {
        console.log('Auth user changed:', auth?.user);
    }, [auth?.user]);

    useEffect(() => {
        console.log('Liked vacations updated:', likedVacations);
    }, [likedVacations]);

    const getCountryName = (countryId: number) => {
        const country = countries.find(c => c.id === countryId);
        return country ? country.country_name : '';
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this vacation?')) {
            try {
                await deleteVacation(id);
                // Refresh the vacations list after deletion
                fetchVacationsData();
            } catch (err) {
                console.error('Failed to delete vacation:', err);
                alert('Failed to delete vacation');
            }
        }
    };

    const handleEdit = (vacation: IVacation) => {
        sessionStorage.setItem('editVacation', JSON.stringify(vacation));
        navigate('/create-vacation');
    };

    const handleLike = async (vacationId: number) => {
        // Skip getUserData call since we already have the user ID
        if (!auth?.user?.id) {
            console.error('No user ID available');
            return;
        }

        try {
            if (likedVacations.includes(vacationId)) {
                // Unlike
                console.log('unliked');
                await unlikeVacation(auth.user.id, vacationId);
                setLikedVacations(prev => prev.filter(id => id !== vacationId));
            } else {
                // Like
                console.log('liked');
                await likeVacation({ user_id: auth.user.id, vacation_id: vacationId });
                setLikedVacations(prev => [...prev, vacationId]);
            }
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: '100%',
            overflow: 'visible',
            padding: '0 !important'
        }}>
            <Container 
                maxWidth="xl" 
                disableGutters 
                sx={{ 
                    pb: 4,
                    pl: 4,
                    pr: 4
                }}
            >
                <Grid 
                    container 
                    spacing={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1,
                        width: '100%',
                        mb: 4
                    }}
                >
                    {vacations.map((vacation) => (
                        <Grid item
                            key={vacation.id} 
                            xs={12}
                            md={6}
                            lg={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Card sx={{ 
                                marginTop: '20px',
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                width: '100%',
                                maxWidth: '600px'
                            }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={vacation.image_url}
                                    alt="Vacation destination"
                                    sx={{
                                        objectFit: 'cover',
                                        bgcolor: 'background.paper',
                                        mt: 0,
                                        pt: 0
                                    }}
                                />
                                <CardContent sx={{ 
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 2,
                                        mb: 1 
                                    }}>
                                        <Typography variant="h6" color="text.primary">
                                            {getCountryName(vacation.country_id)}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2" sx={{ mb: 0 }}>
                                            ${vacation.price}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ mb: 'auto' }}>
                                        {vacation.description}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            From: {new Date(vacation.start_date).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            To: {new Date(vacation.end_date).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between'
                                }}>
                                    <Box>
                                        {auth?.user?.role === 1 && (
                                            <>
                                                <Button 
                                                    size="small" 
                                                    startIcon={<EditIcon />}
                                                    onClick={() => handleEdit(vacation)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    size="small" 
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDelete(vacation.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                    {auth?.user && (
                                        <IconButton 
                                            color={likedVacations.includes(vacation.id) ? "error" : "default"}
                                            onClick={() => handleLike(vacation.id)}
                                        >
                                            <FavoriteIcon />
                                        </IconButton>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}