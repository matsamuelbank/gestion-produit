import React, { useState } from 'react';
import { TextField, Button, TableCell, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export function Produit ({ id, nom, description, prix, categorie, dateCreation, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNom, setEditedNom] = useState(nom);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPrix, setEditedPrix] = useState(prix);
  const [editedCategorie, setEditedCategorie] = useState(categorie);
  const [editedDateCreation, setEditedDateCreation] = useState(dateCreation);

  const handleEditClick = () => {
    if (isEditing) {
      onUpdate(id, editedNom, editedDescription, editedPrix, editedCategorie, editedDateCreation);
    }
    setIsEditing(!isEditing);
  };

  return (
    <TableRow key={id}>
      <TableCell>
        <TextField
          value={editedNom}
          onChange={(e) => setEditedNom(e.target.value)}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={editedPrix}
          onChange={(e) => setEditedPrix(e.target.value)}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={editedCategorie}
          onChange={(e) => setEditedCategorie(e.target.value)}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={editedDateCreation}
          onChange={(e) => setEditedDateCreation(e.target.value)}
          disabled={!isEditing}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleEditClick}>
          <EditIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
