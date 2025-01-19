import { useState, useEffect } from 'react'
import './Products.css'
import { supabase } from '../utils/supabase';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    { field: 'name', headerName: 'Name', editable: true, flex: 0.5 },
    { field: 'description', headerName: 'Description', editable: true, flex: 1 },
    { field: 'price', headerName: 'Price', editable: true },
    { field: 'size', headerName: 'Size', editable: true },
    { field: 'target', headerName: 'Category', editable: true },
  ];

  const handleRowEditStop = (data) => {
    console.log(data);
  }

  const handleProductUpdate = async (newRow, oldRow) => {
    if (Object.keys(newRow).every(key => newRow[key] === oldRow[key])) {
      return oldRow;
    }

    try {
      const { data, error } = await supabase
        .from('product')
        .update([newRow])
        .eq('id', newRow.id)
        .select();

      if (error) {
        throw error;
      }
      console.log('Product updated:', data[0]);
      return data[0];
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Products</Typography>
          <Typography variant='body'>Manage the products of your warehouse.</Typography>
        </Stack>
        <Button variant='text' color='success' onClick={ () => navigate('/products/new') } > <Edit sx={{ mr: 1 }} />
          Add New
        </Button>
      </Stack>

      <Box sx={{ py: 2, textAlign: 'center', flexGrow: 1 }}>
        <Typography variant='caption' >Click on a row to select a product, press Enter or double-click to edit a product</Typography>
      </Box>

      <DataGrid
        rows={products}
        columns={columns}
        columnHeaderHeight={36}
        rowHeight={36}
        editMode='row'
        onRowEditStop={ handleRowEditStop }
        processRowUpdate={ (newRow, oldRow) => handleProductUpdate(newRow, oldRow) }
        onProcessRowUpdateError={ (error) => console.error('Error updating product:', error) }
        sx={{ '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }} 
      />
    </Box>
  )
}

export default Products
