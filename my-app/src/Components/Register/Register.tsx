import { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (!auth) {
        throw new Error('Auth context is not available');
      }

      if (Object.values(formData).some(value => !value)) {
        throw new Error('Please fill in all fields');
      }

      await auth.register(
        formData.firstname,
        formData.lastname,
        formData.email,
        formData.password
      );
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      return;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstname"
            label="First Name"
            autoFocus
            value={formData.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="new-email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
