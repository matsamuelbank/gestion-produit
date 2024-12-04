import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { Login } from './Components/Login/Login';
import { Accueil } from './Components/Accueil/Accueil';
import { AddCategorie } from './Components/AddCategorie/AddCategorie';
import { AddProduit } from './Components/AddProduit/AddProduit';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { ListeCategorie } from './Components/ListeCategorie/ListeCategorie';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route element={<App />}>
           
              <Route path="/" element={<Login />} />

              <Route path="add-categorie" element={ <PrivateRoute> <AddCategorie /></PrivateRoute>} />
              <Route path="add-produit" element={<PrivateRoute> <AddProduit /> </PrivateRoute>} />
              <Route path='liste-categorie' element={<PrivateRoute> <ListeCategorie/> </PrivateRoute>}></Route>
              <Route path="accueil" element={
              <PrivateRoute>
                <Accueil/>
              </PrivateRoute>
            } />
            </Route>
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

reportWebVitals();
