import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link, Snackbar, Alert } from '@mui/material';

import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  

  const handleLogin = (event) => {
    event.preventDefault();

    let valid = true;

    if (!username || !password) {
      setError('Username and password are required');
      setSnackbarOpen(true); 
      valid = false;
      return;
    }

    if (!username) {
      setError('Username is required');
      setUsernameError('Username is required');
      valid = false;
    } else {
      setError('');
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      setError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
      setError('');
    }

    if (valid) {
      // Perform login logic
      if (username === 'maalana@12345' && password === 'maalana@12345') {
        // Successful login
        // Redirect to dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <div className="login-container">
      <Box component="form" className="login-form" onSubmit={handleLogin}>
        <Typography variant="h4" className="login-header">Admin Login</Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
        />
        <Link href="#" className="forgot-password-link">Forgot Password?</Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
        >
          Login
        </Button>
      </Box>
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="error" onClose={handleSnackbarClose}>
        {error}
      </Alert>
    </Snackbar>
    </div>
  );
};

export default Login;
