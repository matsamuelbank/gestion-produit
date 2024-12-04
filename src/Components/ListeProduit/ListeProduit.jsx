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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getListProduit } from '../../store/produit/produit-list-slice';
import api from '../../api';

export function ListeProduit({ filters }) {
  const [editableProduitId, setEditableProduitId] = useState(null); // ID du produit en cours d'édition
  const [produitEdit, setProduitEdit] = useState({}); // État pour gérer les modifications en cours du produit
  const dispatch = useDispatch();

  // Sélectionne les données depuis le store Redux
  const token = useSelector((state) => state.USERINFO.userInfo.token);
  const listeProduit = useSelector((state) => state.PRODUIT_LIST.produits.member || []);
  const listeCategorie = useSelector((state) => state.CATEGORIE_LIST.categories.member || []);

  // Charge les produits au démarrage de la page
  useEffect(() => {
    dispatch(getListProduit());
  }, [dispatch]);

  // Associe chaque produit à sa catégorie
  const produitsAvecCategorie = listeProduit.map((produit) => {
    const categorieAssociee = listeCategorie.find((cat) => `/api/categories/${cat.id}` === produit.categorie);
    return {
      ...produit,
      categorieId: categorieAssociee ? categorieAssociee.id : null,
      categorieNom: categorieAssociee ? categorieAssociee.nom : 'Non catégorisé',
    };
  });

  // Filtre les produits selon les filtres passés en props
  const filteredProduits = produitsAvecCategorie.filter((produit) => {
    const produitCategorieId = produit.categorieId;
    return (
      (filters.categorie === '' || produitCategorieId === filters.categorie) &&
      (filters.minPrix === '' || produit.prix >= filters.minPrix) &&
      (filters.maxPrix === '' || produit.prix <= filters.maxPrix)
    );
  });

  // Gérer l'édition des produits
  const handleEdit = (produit) => {
    setEditableProduitId(produit.id); // Défini le produit à éditer
    setProduitEdit({ ...produit }); // Met à jour l'état avec les valeurs actuelles du produit
  };

  const handleSave = async (id) => {
    try {
      // Effectue une requête PATCH pour mettre à jour les données du produit
      await api.patch(`/api/produits/${id}`,
        {
          nom: produitEdit.nom,
          description: produitEdit.description,
          prix: parseFloat(produitEdit.prix),
          categorie: produitEdit.categorie,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json',
          },
        }
      );
      setEditableProduitId(null); // Réinitialise l'ID en cours d'édition
      dispatch(getListProduit()); // Rafraîchit la liste des produits après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
    }
  };

  const handleCancel = () => {
    setEditableProduitId(null); // Annule l'édition en réinitialisant l'ID du produit
  };

  const handleDelete = async (id) => {
    try {
      // Effectue une requête DELETE pour supprimer le produit
      await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getListProduit()); // Rafraîchit la liste des produits après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Catégorie</TableCell>
            <TableCell>Date de Création</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProduits.map((produit) => (
            <TableRow key={produit.id}>
              <TableCell>
                {editableProduitId === produit.id ? (
                  <TextField
                    value={produitEdit.nom}
                    onChange={(e) => setProduitEdit({ ...produitEdit, nom: e.target.value })} // Met à jour le nom du produit
                  />
                ) : (
                  produit.nom
                )}
              </TableCell>
              <TableCell>
                {editableProduitId === produit.id ? (
                  <TextField
                    value={produitEdit.description}
                    onChange={(e) => setProduitEdit({ ...produitEdit, description: e.target.value })} // Met à jour la description du produit
                  />
                ) : (
                  produit.description
                )}
              </TableCell>
              <TableCell>
                {editableProduitId === produit.id ? (
                  <TextField
                    type="number"
                    value={produitEdit.prix}
                    onChange={(e) => setProduitEdit({ ...produitEdit, prix: e.target.value })} // Met à jour le prix du produit
                  />
                ) : (
                  produit.prix
                )}
              </TableCell>
              <TableCell>{produit.categorieNom}</TableCell>
              <TableCell>{produit.dateCreation}</TableCell>
              <TableCell>
                {editableProduitId === produit.id ? (
                  <>
                    <Button onClick={() => handleSave(produit.id)} color="primary">
                      Enregistrer
                    </Button>
                    <Button onClick={handleCancel} color="secondary">
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(produit)}>Modifier</Button>
                    <Button onClick={() => handleDelete(produit.id)} color="secondary">
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
  );
}
