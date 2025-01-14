import { useState, useEffect, Fragment } from 'react'
import './App.css'
import Template from './Template';
import { supabase } from './utils/supabase';
import { Box, Grid2, Typography } from '@mui/material';

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async() => {
    const { data } = await supabase.from('product').select()

    if (data.length > 0) {
      setProducts(data)
    }
  }

  return (
    <Template>
      <Box sx={{ p: 4 }}>
        <Typography variant='h3' sx={{ pb: 3 }}>
          Lista de Productos
        </Typography>
        <Grid2 container spacing={1} width={'100%'} 
            sx={{ '--Grid-borderWidth': '1px',
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

export default App
