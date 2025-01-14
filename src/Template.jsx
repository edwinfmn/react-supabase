import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

const drawerWidth = 15;

const Template = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ height: '6dvh', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
          </IconButton>
          <Typography variant="h5" noWrap>
            React - Supabase Demo
          </Typography>
          <Typography variant="body" noWrap>
            User
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        variant="persistent"
        sx={{
          marginTop: '6dvh',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: `${drawerWidth}dvw`, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto', mt: '7dvh' }}>
          <Button variant='text' size='large' fullWidth>
            <Typography>Menu Option 1</Typography>
          </Button>
          
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', ml: open ? `${drawerWidth}dvw` : 0, p: 3, marginTop: '8vh' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Template;