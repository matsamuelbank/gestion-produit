import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function AddCategorie() {
  const [nom, setNom] = useState('');
  const [openModal, setOpenModal] = useState(false); // Etat pour ouvrir/fermer la modale
  const token = useSelector((state) => state.USERINFO.userInfo.token);
  const navigate = useNavigate();

  // Fonction pour afficher la modale de confirmation
  const handleOpenModal = () => {
    if (!nom.trim()) {
      alert('Veuillez entrer un nom de catégorie.');
      return;
    }
    setOpenModal(true); // Ouvrir la modale si le nom est valide
  };

  // Fonction pour fermer la modale sans rien faire
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Fonction pour valider l'ajout de la catégorie après confirmation dans la modale
  const handleConfirmAdd = async () => {
    try {
      await api.post('/api/categories', { nom }, {
        headers: {
          'Content-type': "application/ld+json",
          'Authorization': `Bearer ${token}`,
        }
      });
      alert('Catégorie ajoutée avec succès.');
      setNom(''); // Réinitialiser le champ après succès
      setOpenModal(false); // Fermer la modale
      navigate("/accueil"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'ajout de la catégorie.");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 3,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" textAlign="center" marginBottom={3}>
          Ajouter une nouvelle catégorie
        </Typography>
        <TextField
          label="Nom de la catégorie"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal} // Afficher la modale au clic
          fullWidth
        >
          Ajouter
        </Button>
      </Box>

      {/* Modale de confirmation */}
      <Dialog
        open={openModal} // Contrôle de l'ouverture de la modale
        onClose={handleCloseModal} // Fermer la modale si on clique à l'extérieur
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir ajouter cette catégorie ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Annuler</Button>
          <Button onClick={handleConfirmAdd} color="primary">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
