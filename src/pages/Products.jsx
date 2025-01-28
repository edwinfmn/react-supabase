import { useState, useEffect } from 'react'
import './Products.css'
import { supabase } from '../utils/supabase';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { GridRowEditStopReasons, DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { productSchema } from '../utils/validationSchema';
import ProductModal from './ProductModal';
import { toast, Toaster } from 'sonner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const apiRef = useGridApiRef();

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const { data } = await supabase.from('product').select().order('id', { ascending: true });

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
    { field: 'color', headerName: 'Color', editable: true },
    { field: 'target', headerName: 'Category', editable: true },
    { field: 'image', 
      headerName: 'Image',
      renderCell: (params) => <ImageCell params={params} />,
     },
  ];

  const handleRowEditStop = async (params, event) => {
    console.log('params', params);
    console.log('event', event);
  
    if (params.reason === GridRowEditStopReasons.escapeKeyDown) {
      event.defaultMuiPrevented = true; // Prevent the default discard behavior
      const editedRow = apiRef.current.getRow(params.id);
  
      // Optionally confirm with the user (if needed)
      const result = await confirm({
        description: 'Do you want to save the changes before leaving?',
        cancellationText: 'No',
        confirmationText: 'Yes',
      }).catch(() => null);
  
      if (result) {
        console.log('Saving changes:', editedRow);
        // Manually trigger save logic for the edited row
        await handleProductUpdate(editedRow, params.row);
      } else {
        console.log('Keeping changes locally without saving');
      }
    }
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      confirm({ description: 'Are you sure you want to save your changes?' })
        .then( () => event.defaultMuiPrevented = true )
        .catch( () => {} );
    }
  };

  const handleNew = () => {
    setOpen(true);
    // const id = '_' + Math.floor(Math. random()*10);
    // setProducts((oldRows) => [
    //   ...oldRows,
    //   { id, name: '', description: '', price: '', size: '', target: '' },
    // ]);
  };

  const validateProduct = async (product) => {
    try {
      await productSchema.validate(product, { abortEarly: false });
      return { isValid: true, errors: null };
    } catch (validationError) {
      return { isValid: false, errors: validationError.errors };
    }
  };

  const handleProductUpdate = async (newRow, oldRow) => {

    const isNewRow = newRow.id.toString().startsWith('_');

    if (isNewRow) { // inserting a new row
      try {
        const validationResult = await validateProduct(newRow);
        if (!validationResult.isValid) {
          toast.error(validationResult.errors);
          return null;
        }
        delete newRow.id;
        const { data, error } = await supabase
          .from('product')
          .insert([newRow])
          .select();

        if (error) {
          throw error;
        }
        setProducts((oldRows) => oldRows.filter(row => !row.id.toString().startsWith('_')).concat(data[0]));
        toast.success('Product successfully added!');
        return data[0];
      } catch (error) {
        console.error('Error adding product:', error.message);
      }
    } else { // updating an existing row
      // if no changes do nothing
      if (Object.keys(newRow).every(key => newRow[key] === oldRow[key])) {
        return oldRow;
      }

      const validationResult = await validateProduct(newRow);
      if (!validationResult.isValid) {
        toast.error(validationResult.errors);
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
        toast.success('Product successfully updated!');
        return data[0];
      } catch (error) {
        console.error('Error updating product:', error.message);
      }
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Toaster />
      <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Products</Typography>
          <Typography variant='body'>Manage the products of your warehouse.</Typography>
        </Stack>
        <Button variant='text' color='success' onClick={ handleNew } > <Edit sx={{ mr: 1 }} />
          Add New
        </Button>
      </Stack>

      <Box sx={{ py: 2, textAlign: 'center', flexGrow: 1 }}>
        <Typography variant='caption' >Click on a row to select a product, press Enter or double-click to edit a product</Typography>
      </Box>

      <DataGrid
        rows={products}
        columns={columns}
        apiRef={apiRef}
        columnHeaderHeight={36}
        rowHeight={36}
        editMode='row'
        onRowEditStop={ handleRowEditStop }
        processRowUpdate={ (newRow, oldRow) => handleProductUpdate(newRow, oldRow) }
        onProcessRowUpdateError={ (error) => console.error('Error updating product:', error) }
        sx={{ '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }} 
      />

      <ProductModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  )
}

const ImageCell = ({params}) => {
  const [signedUrl, setSignedUrl] = useState('');

  useEffect(() => {
    const getSignedUrl = async () => {
      if (params.value !== null) {
        const { data } = await supabase.storage.from('product.image').createSignedUrl(params.value, 3600);
        setSignedUrl(data.signedUrl);
      }
    }

    getSignedUrl();
  }, [params.value])
  
  return (
    (signedUrl !== '') ? 
      <Box
        component={'img'}
        alt={params.value}
        src={signedUrl || ''}
        sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
        /> 
      : 
      <></>
  )
}

export default Products
