import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ManageAccount from '../ManageAccount/ManageAccount';
import Actions from '../Action/Action';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  test:{
    marginRight: theme.spacing(2),
    alignItems: 'right',
  }
};

function Appbar({ products, onLogout }) {
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout();
      localStorage.clear();
    }

    if (!onLogout || typeof onLogout !== 'function') {
      navigate('/');
      localStorage.clear();
    }
  };

  const handleAccountManagement = () => {
    setAccountModalOpen(true);
  };

  const handleDeleteAccount = () => {
    // Clear local storage and log out
    localStorage.clear();
    handleLogoutClick();
    setAccountModalOpen(false);
  };

  const username = localStorage.getItem('username');

  return (
    <ThemeProvider theme={theme}>
      <div className={useStyles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={useStyles.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={()=>{navigate('/')}} 
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" onClick={()=>{  navigate('/')}} className={useStyles.title}>
              Grocery App
            </Typography>
       
            {(localStorage.getItem('username'))  ? (
              <>
                <div style={{marginLeft:"80%"}}>
                  <Actions products={products}  />
                </div>
                <span style={{ marginRight: "20px" }}></span>
                <IconButton edge="end" aria-label="print"  style={{ color: '#FFCA33' }}onClick={handleAccountManagement} >
                  <AccountCircleIcon fontSize="large"/>
                </IconButton>

                <IconButton edge="end" style={{ color: '#F74428' }} aria-label="delete" onClick={handleDeleteAccount} >
                  <LogoutIcon fontSize="large"/>
                </IconButton>
                {isAccountModalOpen && (
                  <ManageAccount
                    userEmail={username} // Replace with the user's actual email
                    onDeleteAccount={handleDeleteAccount}
                    onClose={() => setAccountModalOpen(false)}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Appbar;
