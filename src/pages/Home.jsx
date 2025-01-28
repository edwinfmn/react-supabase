import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InventoryIcon from '@mui/icons-material/Inventory';

const Home = () => {
  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <PeopleIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Users: 100</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <ShowChartIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Sales: $5000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <InventoryIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Products: 50</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;