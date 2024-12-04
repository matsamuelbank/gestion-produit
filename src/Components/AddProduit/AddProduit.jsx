import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { getListCategorie } from '../../store/categorie/categorie-list-slice';
import { useSelector, useDispatch } from 'react-redux';

export function AddProduit() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // État pour ouvrir/fermer la modale
  const token = useSelector((state) => state.USERINFO.userInfo.token);
  const dispatch = useDispatch();
  const listeCategorie = useSelector((state) => state.CATEGORIE_LIST.categories);
  const navigate = useNavigate();

  useEffect(() => {
    if (!listeCategorie || listeCategorie.length === 0) {
      dispatch(getListCategorie());
    }
  }, [dispatch, listeCategorie]);

  const handleSubmit = async () => {
    if (!nom || !description || !prix || !categorie || !dateCreation) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await api.post('/api/produits',
        {
          nom,
          description,
          prix: parseFloat(prix),
          categorie: `/api/categories/${categorie}`,
          dateCreation,
        },
        {
          headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setOpenDialog(true); // Ouvre la modale après l'ajout
      setNom('');
      setDescription('');
      setPrix('');
      setCategorie('');
      setDateCreation('');
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'ajout du produit.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Ferme la modale
    navigate('/'); // Redirige vers la page d'accueil
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
          Ajouter un nouveau produit
        </Typography>
        <TextField
          label="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Prix"
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {/* Sélecteur de catégorie */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="categorie-select-label">Catégorie</InputLabel>
          <Select
            labelId="categorie-select-label"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            label="Catégorie"
          >
            {listeCategorie?.member?.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date de création"
          type="date"
          value={dateCreation}
          onChange={(e) => setDateCreation(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Ajouter
        </Button>
      </Box>

      {/* Modale de confirmation */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Produit ajouté</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Le produit a été ajouté avec succès.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
