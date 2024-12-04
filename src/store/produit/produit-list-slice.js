// store/produit/produit-list-slice.js

import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const produitListSlice = createSlice({
    name: 'produitList',
    initialState: {
      produits: []
    },
    reducers: {
      setProduitList: (state, action) => {
        state.produits = action.payload;
      },
      clearProduitList: (state) => {
        state.produits = []; 
    }
    },
});

// Exportation des actions générées par le slice
export const { setProduitList,clearProduitList } = produitListSlice.actions;

export function getListProduit() {
    return async (dispatch, getState) => {
      const state = getState();
      const token = state.USERINFO.userInfo.token;
  
      try {
        const response = await api.get('api/produits', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log(response.data); // Vérifie ce qui est retourné par l'API
        dispatch(setProduitList(response.data));
      } catch (error) {
        // console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
}
// Exportation du reducer du slice
export const produitListReducer = produitListSlice.reducer;

