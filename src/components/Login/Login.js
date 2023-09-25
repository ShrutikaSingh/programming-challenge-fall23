import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();

const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const textFieldStyle = {
  margin: theme.spacing(1),
  width: '300px',
};

const buttonStyle = {
  margin: theme.spacing(2),
};

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim() !== '') {
      // Store the username in local storage
      localStorage.setItem('username', name);
      onLogin(name);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={loginContainerStyle}>
        <h2>Login</h2>
        <form style={formStyle}>
          <TextField
            label="Enter your name"
            variant="outlined"
            style={textFieldStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Login;
