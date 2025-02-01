import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box, TextField, Stack, Typography } from '@mui/material';
import { Toaster } from 'sonner';
import { Edit } from '@mui/icons-material';

const Inventory = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddProduct = () => {
    const newEntry = {
      id: rows.length + 1,
      product: newProduct,
      quantity: newQuantity,
    };
    setRows([...rows, newEntry]);
    setNewProduct('');
    setNewQuantity('');
    handleClose();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'product', headerName: 'Product', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Toaster />
      <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Inventory</Typography>
          <Typography variant='body'>Manage your available product inventory.</Typography>
        </Stack>
        <Button variant='text' color='success' onClick={handleOpen} > <Edit sx={{ mr: 1 }} />
          Add Inventory
        </Button>
      </Stack>

      <Box sx={{ py: 2, textAlign: 'center', flexGrow: 1 }}>
        <Typography variant='caption' >Click on a row to select a product, press Enter or double-click to edit the quantity</Typography>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        columnHeaderHeight={36}
        rowHeight={36}
        editMode='row'
        sx={{ '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' } }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add New Inventory</h2>
          <TextField
            label="Product"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddProduct}>
            Add
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Inventory;