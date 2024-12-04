import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserInfo} from './store/userInfo/user-info-slice';
import { Menu } from './Components/Menu/Menu';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './App.css';

export function App() {
  const [filters, setFilters] = useState({ categorie: '', minPrix: '', maxPrix: '' });
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilter = (categorie, minPrix, maxPrix) => {
    setFilters({ categorie, minPrix, maxPrix });
  };

  useEffect(() => {
    // Affiche une notification après 55 minutes
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 55 * 60 * 1000); // 55 minutes

    // déconnecte l'utilisateur après 1 heure
    const expirationTimer = setTimeout(() => {
      dispatch(clearUserInfo()); // Réinitialise les infos utilisateur
      navigate('/login'); // Redirige vers la page de connexion
    }, 60 * 60 * 1000); // 1 heure

    return () => {
      clearTimeout(notificationTimer);
      clearTimeout(expirationTimer);
    };
  }, [dispatch, navigate]);

  // Gérer la fermeture de la notification
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      <Menu />
      <Outlet context={{ filters, handleFilter }} />

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Votre session va expirer. Veuillez vous reconnecter.
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
