import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, MenuItem, ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fetchCountries } from '../../api/countryApi';
import { ICountry } from '../../models';
import { createVacation, updateVacation } from '../../api/vacationApi';

export default function CreateVacation() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [vacationId, setVacationId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        description: '',
        price: '',
        image_url: '',
        start_date: null as Date | null,
        end_date: null as Date | null,
        country_id: '',
    });

    const [availableImages] = useState([
        'australiapic.jpg',
        'francepic.jpg',
        'gbpic.jpg',
        'icelandpic.jpg',
        'israelpic.jpg',
        'italypic.jpg',
        'japanpic.jpg',
        'newzealandpic.jpg',
        'portugalpic.jpg',
        'spainpic.jpg',
        'thailandpic.jpg',
        'usapic.jpg',
        'canadapic.jpg'
    ]);

    useEffect(() => {
        const editData = sessionStorage.getItem('editVacation');
        if (editData) {
            const vacation = JSON.parse(editData);
            console.log('Vacation data:', vacation);
            sessionStorage.removeItem('editVacation');
            setIsEditMode(true);
            setVacationId(vacation.id);

            const country_id = vacation.country_id?.toString() || '';
            console.log('Setting country_id to:', country_id);

            setFormData({
                description: vacation.description,
                price: vacation.price,
                image_url: vacation.image_url,
                start_date: new Date(vacation.start_date),
                end_date: new Date(vacation.end_date),
                country_id: country_id
            });
        }
    }, []);

    const title = isEditMode ? 'Edit Vacation' : 'Create New Vacation';
    const buttonText = isEditMode ? 'Update Vacation' : 'Create Vacation';

    useEffect(() => {
        const getCountries = async () => {
            try {
                const data = await fetchCountries();
                console.log('Available countries:', data);
                setCountries(data);
            } catch (err) {
                console.error('Failed to fetch countries:', err);
                setError('Failed to load countries');
            }
        };
        getCountries();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            if (!formData.description || !formData.price || !formData.image_url || 
                !formData.start_date || !formData.end_date || !formData.country_id) {
                throw new Error('Please fill in all fields');
            }

            const vacationData = {
                description: formData.description,
                price: Number(formData.price),
                image_url: formData.image_url,
                start_date: new Date(formData.start_date.setHours(12, 0, 0, 0)),
                end_date: new Date(formData.end_date.setHours(12, 0, 0, 0)),
                country_id: Number(formData.country_id)
            };

            if (isEditMode && vacationId) {
                await updateVacation(vacationId, vacationData);
            } else {
                await createVacation(vacationData);
            }

            navigate('/vacations');
        } catch (err: any) {
            setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} vacation`);
        }
    };

    useEffect(() => {
        console.log('Current formData:', formData);
    }, [formData]);

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        mb: 2 
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={formData.start_date}
                                onChange={(newValue) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        start_date: newValue
                                    }));
                                }}
                                sx={{ flex: 1 }}
                            />

                            <DatePicker
                                label="End Date"
                                value={formData.end_date}
                                onChange={(newValue) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        end_date: newValue
                                    }));
                                }}
                                sx={{ flex: 1 }}
                            />
                        </LocalizationProvider>
                    </Box>

                    <TextField
                        select
                        margin="normal"
                        required
                        fullWidth
                        name="country_id"
                        label="Country"
                        value={formData.country_id}
                        onChange={(e) => {
                            console.log('Selected country_id:', e.target.value);
                            setFormData(prev => ({
                                ...prev,
                                country_id: e.target.value
                            }));
                        }}
                        helperText="Please select a country"
                    >
                        <MenuItem value="">
                            <em>Select a country</em>
                        </MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id.toString()}>
                                {country.country_name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="price"
                        label="Price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                        Select an Image
                    </Typography>
                    
                    <ImageList sx={{ width: '100%', height: 250, border: '1px solid #eee', borderRadius: 1 }} cols={2} rowHeight={120}>
                        {availableImages.map((img) => (
                            <ImageListItem 
                                key={img}
                                sx={{
                                    cursor: 'pointer',
                                    padding: 1,
                                    border: formData.image_url === img ? '2px solid #1976d2' : 'none',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                                onClick={() => setFormData(prev => ({
                                    ...prev,
                                    image_url: img
                                }))}
                            >
                                <img
                                    src={img}
                                    alt="Vacation destination"
                                    loading="lazy"
                                    style={{ 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        borderRadius: 4
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
} 