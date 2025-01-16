import { useState, useEffect, Fragment } from 'react'
import './Products.css'
import Template from '../ui/Template';
import { supabase } from '../utils/supabase';
import { Box, Button, Grid2, Stack, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const { data } = await supabase.from('product').select()

    if (data.length > 0) {
      setProducts(data)
    }
  }

  return (
    <Template>
      <Box sx={{ p: 4 }}>
        <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h4'>
            Lista de Productos
          </Typography>
          <Button variant='contained' color='success' > <Edit sx={{ height: '2dvh', width: '2dvh', mr: 1 }} />New</Button>
        </Stack>
        <Grid2 container spacing={1} width={'100%'}
          sx={{
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            },
          }} >
          <Grid2 size={1} sx={{ px: 1 }}><Typography fontWeight={'bold'}>Código</Typography></Grid2>
          <Grid2 size={3} sx={{ px: 1 }}><Typography fontWeight={'bold'}>Producto</Typography></Grid2>
          <Grid2 size={4} sx={{ px: 1 }}><Typography fontWeight={'bold'}>Descripción</Typography></Grid2>
          <Grid2 size={1} sx={{ px: 1 }}><Typography fontWeight={'bold'}>Precio</Typography></Grid2>
          <Grid2 size={1} sx={{ px: 1 }}><Typography fontWeight={'bold'}>Talla</Typography></Grid2>
          <Grid2 size={2} sx={{ px: 1 }}><Typography fontWeight={'bold'}>Categoría</Typography></Grid2>
          {products.map((prod) => (
            <Fragment key={prod.id}>
              <Grid2 size={1} sx={{ px: 1 }}>{prod.id}</Grid2>
              <Grid2 size={3} sx={{ px: 1 }}>{prod.name}</Grid2>
              <Grid2 size={4} sx={{ px: 1 }}>{prod.description}</Grid2>
              <Grid2 size={1} sx={{ px: 1 }}>$ {prod.price}</Grid2>
              <Grid2 size={1} sx={{ px: 1 }}>{prod.size}</Grid2>
              <Grid2 size={2} sx={{ px: 1 }}>{prod.target}</Grid2>
            </Fragment>
          ))
          }
        </Grid2>
      </Box>
    </Template>
  )
}

export default Products
