//store/categorie/categorie-list-slice.js

import { createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const categorieListSlice = createSlice({
    name: 'categorieList',
    initialState: {
      categories: []
    },
    reducers: {
      setCategorieList: (state, action) => {
        state.categories = action.payload;
      },
      clearCategorieList: (state) => {
        state.categories = []; 
    }
    },
});

// Exportation des actions générées par le slice
export const { setCategorieList,clearCategorieList } = categorieListSlice.actions;

export function getListCategorie() {
    return async (dispatch, getState) => {
      const state = getState();
      const token = state.USERINFO.userInfo.token;
  
      try {
        const response = await api.get('api/categories',
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log(response.data); // Vérifie ce qui est retourné par l'API
        dispatch(setCategorieList(response.data));
      } catch (error) {
        // console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
}
// Exportation du reducer du slice
export const categorieListReducer = categorieListSlice.reducer;

