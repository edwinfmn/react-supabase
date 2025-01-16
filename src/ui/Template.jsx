import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Drawer, CssBaseline, Box, IconButton, Stack, Tooltip, Popover, Divider } from '@mui/material';
import { Assignment, AssignmentInd, ExitToApp, Menu } from '@mui/icons-material';
import { supabase } from '../utils/supabase';
import useAuth from '../hooks/useAuth';

const drawerWidth = 15;

const Template = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const {user, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setShowUserMenu(!showUserMenu);
  }

  const closeUserMenu = () => {
    setAnchorEl(null);
    setShowUserMenu(!showUserMenu);
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log('Logged out successfully.');
      }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ height: '6dvh', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
          </IconButton>
          <Typography variant="h5" noWrap>
            React - Supabase Demo
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>

            <Tooltip title="User Profile">
              <IconButton onClick={handleUserMenu} color="inherit" aria-label="user profile" sx={{ ml: 1 }}>
                {
                  user.picture ?
                  <Box component='img' sx={{ width: '4dvh', height: '4dvh', borderRadius: '50%' }} src={ user.picture } />
                  :
                  <AssignmentInd color='inherit' sx={{ width: '4dvh', height: '4dvh' }} />
                }
              </IconButton>
            </Tooltip>

            <Popover
              open={showUserMenu}
              anchorEl={anchorEl}
              onClose={closeUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {user.name && <Typography sx={{ px: 3, pt: 2 }}>{user.name}</Typography>}
              <Typography sx={{ px: 3, py: 2 }}>{user.email}</Typography>
              <Divider />
              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
                sx={{ p: 2 }}
                >
                <ExitToApp /> <Typography sx={{ ml: 2 }} >Logout</Typography>
              </IconButton>
            </Popover>
          </Stack>

        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        variant='persistent'
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