import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Stack, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import { Close, Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '../utils/validationSchema';
import { supabase } from '../utils/supabase';

const NewProduct = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from('product').insert([data]);

      if (error) {
        throw error;
      }
      setSnackbarMessage('Product successfully saved!');
      setSnackbarSeverity('success');
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error saving product:', error.message);
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Register a New Product</Typography>
          <Typography variant='body'>Complete the new product information.</Typography>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' color='warning' onClick={ handleCancel } > <Close sx={{ mr: 1 }} />Cancel</Button>
          <Button variant='contained' color='success' onClick={handleSubmit(onSubmit)} > <Save sx={{ mr: 1 }} />Save</Button>
        </Stack>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', px: 30 }} >
        <form noValidate autoComplete="off" >
          <TextField
            {...register('name')}
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('description')}
            label="Product Description"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Stack direction='row' spacing={2} marginTop={1} >
            <TextField
              {...register('size')}
              label="Size"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.size}
              helperText={errors.size?.message}
            />
            <TextField
              {...register('price')}
              label="Price"
              variant='outlined'
              fullWidth type='number'
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Stack>
          <TextField
            {...register('target')}
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.target}
            helperText={errors.target?.message}
          />
          
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewProduct;