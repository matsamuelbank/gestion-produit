import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { addUserInfo } from '../../store/userInfo/user-info-slice';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await api.post('api/authentificate', { login, password });

      // const token = response.data.token;
      dispatch(addUserInfo(response.data));
      navigate('/accueil');
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur de connexion, veuillez vérifier vos identifiants.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="bg-white p-6 rounded-lg shadow-md w-full border border-gray-300">
        <Typography component="h1" variant="h5" className="text-center font-bold text-gray-800 mb-6">
          Se connecter
        </Typography>
        
        <form noValidate autoComplete="off" className="space-y-4">
          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="mb-4"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#5c6bc0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />

          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#5c6bc0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }}
          >
            Se connecter
          </Button>
        </form>
      </Box>
    </Container>
  );
}
