import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Stack, InputAdornment } from '@mui/material';
import { productSchema } from '../utils/validationSchema';
import { useForm } from 'react-hook-form';
import { supabase } from '../utils/supabase';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';

const ProductModal = ({ open, handleClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = (data) => {
    supabase.from('product').insert([data]).select()
      .then((data, error) => {
        if (error) {
          throw error;
        }
        console.log('data', data);
        toast.success('Product successfully created!');
        supabase.storage.from('product.image').upload(imageFile.name, imageFile)
          .then((data, error) => {
            if (error) {
              throw error;
            }
            toast.success('Image successfully uploaded!');
            handleClose();
          })
          .catch(error => toast.error(`Error uploading image: ${error.message}`));
      })
      .catch(error => toast.error(`Error creating product: ${error.message}`));

  };

  const handleImageChange = (event) => {
    setImageFile(event.currentTarget.files[0]);
    setValue('image', event.currentTarget.files[0].name);
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
      <Box sx={{ p: 6, bgcolor: 'background.paper', margin: 'auto', maxWidth: 'md', borderRadius: 2 }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Register a New Product</Typography>
          <Typography variant='body'>Complete the new product information.</Typography>
        </Stack>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name')}
            fullWidth
            margin="normal"
            label="Product Name"
            size='small'
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('description')}
            label="Product Description"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('price')}
            label="Price"
            variant='outlined'
            fullWidth type='number'
            margin="normal"
            size='small'
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
            }}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            {...register('size')}
            label="Size"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            error={!!errors.size}
            helperText={errors.size?.message}
          />
          <TextField
            {...register('color')}
            label="Color"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            error={!!errors.color}
            helperText={errors.color?.message}
          />
          <TextField
            {...register('target')}
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            error={!!errors.target}
            helperText={errors.target?.message}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {!!errors.image && (
            <Typography color="error">{errors.image?.message}</Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
            <Button color="primary" variant="contained" type="submit">
              Create
            </Button>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductModal;