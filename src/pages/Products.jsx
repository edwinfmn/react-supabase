import { useState, useEffect } from 'react'
import './Products.css'
import { supabase } from '../utils/supabase';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const { data } = await supabase.from('product').select()

    if (data.length > 0) {
      setProducts(data);
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'price', headerName: 'Price' },
    { field: 'size', headerName: 'Size' },
    { field: 'target', headerName: 'Category' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Products</Typography>
          <Typography variant='body'>Manage the products of your warehouse.</Typography>
        </Stack>
        <Button variant='outlined' color='success' size='small' sx={{ m: 1 }} > <Edit sx={{ height: '2dvh', width: '2dvh', mr: 1 }} />Add New</Button>
      </Stack>

      <DataGrid rowCount={10} rows={products} columns={columns} />
    </Box>
  )
}

export default Products
