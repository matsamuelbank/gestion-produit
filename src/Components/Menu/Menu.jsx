import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { clearUserInfo } from '../../store/userInfo/user-info-slice';
const pages = [
    {
        'page': 'Ajouter un produit',
        'path': 'add-produit'
    },
    {
        'page': 'Ajouter une catégorie',
        'path': 'add-categorie'
    },
    {
      'page': 'Liste des catégorie',
      'path': 'liste-categorie'
    }
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function Menu() {
   const isAuthenticated = useSelector((state) => state.USERINFO.userInfo.isAuthenticated);
   const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLoginLogout = () => {
    if (isAuthenticated) {
      dispatch(clearUserInfo());
      setTimeout(() => {
        navigate('/'); // Redirige vers la page de login après déconnexion
      }, 0);
    } else {
      navigate('/'); // Redirige vers la page de login si l'utilisateur n'est pas connecté
    }
  };
  
  

  const handleNavigate = (path) => {
    navigate(path);
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() =>
              isAuthenticated ? navigate('/accueil'): navigate('/')
            }
          >
            Gestion-Produit App
          </Typography>

          {/* Navigation Buttons */}
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => handleNavigate(`${page.path}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* Login/Logout Icon */}
          <Button
            color="inherit"
            onClick={handleLoginLogout}
            sx={{ ml: 2 }}

          >
            {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}