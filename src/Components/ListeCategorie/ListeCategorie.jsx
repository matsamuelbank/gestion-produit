import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getListCategorie } from '../../store/categorie/categorie-list-slice';
import api from '../../api';

export function ListeCategorie() {
  const [editableCategorieId, setEditableCategorieId] = useState(null);
  const [categorieEdit, setCategorieEdit] = useState({ nom: '' });
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false); // To distinguish success and error

  const dispatch = useDispatch();

  // Sélectionne le token et la liste des catégories depuis le store Redux
  const token = useSelector((state) => state.USERINFO.userInfo.token);
  const listeCategorie = useSelector((state) => state.CATEGORIE_LIST.categories.member || []);

  // Charge les catégories dès que le composant est rendu
  useEffect(() => {
    dispatch(getListCategorie());
  }, [dispatch]);

  // Gère l'édition d'une catégorie
  const handleEdit = (categorie) => {
    setEditableCategorieId(categorie.id);
    setCategorieEdit({ nom: categorie.nom });
  };

  // Gère la sauvegarde des modifications d'une catégorie
  const handleSave = async (id) => {
    try {
      // Met à jour la catégorie via l'API
      await api.patch(`/api/categories/${id}`,
        { nom: categorieEdit.nom },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json',
          },
        }
      );
      // Annule l'état d'édition et rafraîchit la liste
      setEditableCategorieId(null);
      dispatch(getListCategorie());
      setModalMessage('Modification réussie !');
      setModalSuccess(true);
      setOpenModal(true);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error);
      setModalMessage('Erreur lors de la modification de la catégorie.');
      setModalSuccess(false);
      setOpenModal(true);
    }
  };

  // Gère l'annulation de l'édition
  const handleCancel = () => {
    setEditableCategorieId(null);
  };

  // Gère la suppression d'une catégorie
  const handleDelete = async (id) => {
    try {
      // Supprime la catégorie via l'API
      await axios.delete(`http://localhost:8000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Rafraîchit la liste après la suppression
      dispatch(getListCategorie());
      setModalMessage('Catégorie supprimée avec succès');
      setModalSuccess(true);
      setOpenModal(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie :', error);
      setModalMessage('Erreur lors de la suppression de la catégorie.');
      setModalSuccess(false);
      setOpenModal(true);
    }
  };

  // Ferme la modale
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Affiche les catégories sous forme de lignes dans la table */}
            {listeCategorie.map((categorie) => (
              <TableRow key={categorie.id}>
                <TableCell>
                  {/* Si la catégorie est en mode édition, affiche un champ de texte */}
                  {editableCategorieId === categorie.id ? (
                    <TextField
                      value={categorieEdit.nom}
                      onChange={(e) => setCategorieEdit({ ...categorieEdit, nom: e.target.value })}
                    />
                  ) : (
                    categorie.nom
                  )}
                </TableCell>
                <TableCell>
                  {/* Affiche les boutons d'édition ou de sauvegarde selon l'état d'édition */}
                  {editableCategorieId === categorie.id ? (
                    <>
                      <Button onClick={() => handleSave(categorie.id)} color="primary">
                        Enregistrer
                      </Button>
                      <Button onClick={handleCancel} color="secondary">
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(categorie)}>Modifier</Button>
                      <Button onClick={() => handleDelete(categorie.id)} color="secondary">
                        Supprimer
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modale de succès ou d'erreur */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{modalSuccess ? 'Succès' : 'Erreur'}</DialogTitle>
        <DialogContent>
          <p>{modalMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
