import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Filtre } from '../Filtre/Filtre';
import { ListeProduit } from '../ListeProduit/ListeProduit';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategorie } from '../../store/categorie/categorie-list-slice';

export function Accueil() {
  const { filters, handleFilter } = useOutletContext(); // Récupérer les filtres et la fonction pour gérer les filtres
  const dispatch = useDispatch();
  const listeCategorie = useSelector((state) => state.CATEGORIE_LIST.categories); // Récupère la liste des catégories depuis le store

  const lesCategories = listeCategorie?.member || []; // Extraire les catégories ou une liste vide si pas de catégories

  // Effectue la requête pour obtenir les catégories si la liste est vide
  useEffect(() => {
    if (!listeCategorie || listeCategorie.length === 0) {
      dispatch(getListCategorie()); // Dispatche l'action pour récupère les catégories
    }
  }, [dispatch, listeCategorie]); // Déclenche l'effet lors du changement de listeCategorie

  return (
    <div className="flex flex-row gap-4 p-4 mt-4">
      <div className="w-1/4">
        <Filtre categories={lesCategories} onFilter={handleFilter} />
      </div>
      <div className="w-3/4">
        <ListeProduit filters={filters} />
      </div>
    </div>
  );
}
