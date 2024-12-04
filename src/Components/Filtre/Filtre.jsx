import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

export function Filtre({ categories, onFilter }) {
  // Déclare les états pour la catégorie sélectionnée et les filtres de prix
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [minPrix, setMinPrix] = useState('');
  const [maxPrix, setMaxPrix] = useState('');

  // Fonction qui applique les filtres lorsqu'on clique sur le bouton de filtrage
  const handleFilter = () => {
    onFilter(selectedCategorie, minPrix, maxPrix);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        select
        label="Catégorie"
        value={selectedCategorie}
        onChange={(e) => setSelectedCategorie(e.target.value)}
      >
        {/* Option vide pour ne pas filtrer par catégorie */}
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {/* Liste des catégories disponibles, chaque catégorie est un élément MenuItem */}
        {categories.map((categorie) => (
          <MenuItem key={categorie.id} value={categorie.id}>
            {categorie.nom}
          </MenuItem>
        ))}
      </TextField>

      {/* Champ pour définir le prix minimum */}
      <TextField
        label="Prix Min"
        type="number"
        value={minPrix}
        onChange={(e) => setMinPrix(e.target.value)}
      />

      {/* Champ pour définir le prix maximum */}
      <TextField
        label="Prix Max"
        type="number"
        value={maxPrix}
        onChange={(e) => setMaxPrix(e.target.value)}
      />

      {/* Bouton pour appliquer le filtre */}
      <Button variant="contained" onClick={handleFilter}>
        Filtrer
      </Button>
    </Box>
  );
}
