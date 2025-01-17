import { useState, useEffect } from 'react'
import './Products.css'
import { supabase } from '../utils/supabase';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const { data } = await supabase.from('product').select()

    if (data.length > 0) {
      setProducts(data.concat(data.map(p => p.id = p.id*Math.random().toFixed(0))));
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
        <Button variant='contained' color='success' onClick={ () => navigate('/products/new') } > <Edit sx={{ mr: 1 }} />Add New</Button>
      </Stack>

      <DataGrid
        rows={products}
        columns={columns}
        autoPageSize
        columnHeaderHeight={36}
        rowHeight={36}
        sx={{ '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }} 
      />
    </Box>
  )
}

export default Products
