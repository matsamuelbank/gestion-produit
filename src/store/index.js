
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilisation du localStorage
import { userInfoReducer } from './userInfo/user-info-slice';
import { categorieListReducer } from './categorie/categorie-list-slice';
import { produitListReducer } from './produit/produit-list-slice';

// Configuration de la persistance pour chaque reducer
const persistConfigUserInfo = {
  key: 'userInfo',
  storage,
};

const persistConfigProduitList = {
  key: 'produitList',
  storage,
};

const persistConfigCategorieList = {
  key: 'categorieList',
  storage,
};

// Reducers persistés
const persistedUserInfoReducer = persistReducer(persistConfigUserInfo, userInfoReducer);
const persistedProduitListReducer = persistReducer(persistConfigProduitList, produitListReducer);
const persistedCategorieListReducer = persistReducer(persistConfigCategorieList, categorieListReducer);

// Configuration du store
export const store = configureStore({
  reducer: {
    USERINFO: persistedUserInfoReducer,
    PRODUIT_LIST: persistedProduitListReducer,
    CATEGORIE_LIST: persistedCategorieListReducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

// Création de l'objet persistor
export const persistor = persistStore(store);
