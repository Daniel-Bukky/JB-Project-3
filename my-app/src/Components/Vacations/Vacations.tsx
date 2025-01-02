import { fetchVacations } from "../../api/vacationApi";
import { useEffect, useState, useContext } from "react";
import { IVacation } from "../../models/index";
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography, Button, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

export function Vacations() {
    const [vacations, setVacations] = useState<IVacation[]>([]);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllVacations() {
            let data = await fetchVacations()
            setVacations(data)
        }
        getAllVacations()
    }, [])

    const handleEdit = (vacation: IVacation) => {
        sessionStorage.setItem('editVacation', JSON.stringify(vacation));
        navigate('/create-vacation');
    };

    return (
        <Container maxWidth={false} sx={{ py: 4, px: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {vacations.map((vacation) => (
                    <Grid item 
                        key={vacation.id} 
                        xs={12}      // 1 card per row on extra small screens
                        md={6}       // 2 cards per row on medium and up screens
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            width: '100%',
                            maxWidth: '600px'  // Limit card width
                        }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={vacation.image_url}
                                alt="Vacation destination"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    ${vacation.price}
                                </Typography>
                                <Typography>
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
                            <CardActions>
                                {auth?.user?.role === 1 && (
                                    <>
                                        <Button 
                                            size="small" 
                                            startIcon={<EditIcon />}
                                            color="primary"
                                            onClick={() => handleEdit(vacation)}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            size="small" 
                                            startIcon={<DeleteIcon />}
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}