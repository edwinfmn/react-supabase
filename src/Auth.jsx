import React, { useState } from 'react';
import { supabase } from './utils/supabase';
import { Box, Button, Divider, Icon, Paper, Stack, TextField, Typography } from '@mui/material';
import { Google, TableBarRounded } from '@mui/icons-material';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Sign-up successful! Please check your email to confirm.');
    }
  };

  // Sign in with Email and Password
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Sign-in successful!');
    }
  };

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Log out
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Logged out successfully.');
    }
  };

  return (
    <Box sx={{ height: '100dvh', width: '100dvw', display: 'flex', flexDirection: 'row'}}>

      <Box sx={{ flex: { sm: 0, md: 0.5, lg: 1 }, backgroundColor: 'rgba(129, 150, 150, 0.33)' }} >
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }, pt: 6, pl: 6 }} >
          <Stack direction='row' spacing={2} >
            <Box component='img' sx={{ width: '4dvh', height: '4dvh', overflow: 'hidden' }} src='table.svg' />
            <Typography variant='h4'>React + Vite + Supabase</Typography>
          </Stack>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ flex: { sm: 1, md: 1, lg: 0.5 } , px: 4, width: { xs: '90dvw', md: '70dvw', lg: '40dvw' } }} >
        <Box sx={{ px: { xs: 1, md: 3, lg: 8 }, height: '100dvh',  display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }} >

          <Typography variant='h4' fontWeight='bold' sx={{ pt: 3 }} >Welcome back</Typography>
          <Typography variant='body' sx={{ pb: 3 }} >Sign in to your account</Typography>

          <Button variant='outlined' color='inherit' size='large' onClick={handleGoogleSignIn}
            sx={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }}
            >
            <Google sx={{ pr: 2 }} />
            Continue with Google
          </Button>

          <Divider sx={{ my: 3 }} >or</Divider>

          <TextField type='email' 
            label='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            fullWidth 
            sx={{ mb: 3 }}
            size='small'
            />
          <TextField type='password' 
            label='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            fullWidth 
            sx={{ mb: 3 }}
            size='small'
            />

          <Button variant='contained' color='primary' size='large' onClick={handleSignIn} 
            sx={{ mb: 3, textTransform: 'none', fontSize: 16, fontWeight: 'bold' }}
            >
            Sign In
          </Button>

          {/* <Typography variant='body'>Don't have an account? 
            <Button color='primary' onClick={handleSignUp}
              sx={{ textTransform: 'none', fontSize: 16 }}
              >
              Sign Up
            </Button>
          </Typography> */}

          {message && <Typography color='red' >{message}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
