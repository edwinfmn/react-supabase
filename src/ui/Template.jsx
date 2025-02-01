import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, CssBaseline, Box, IconButton, Stack, Tooltip, Popover, Divider, MenuItem } from '@mui/material';
import { AssignmentInd, BusinessOutlined, ExitToApp, Home, InventoryOutlined, LogoutOutlined, Menu, PlumbingOutlined, WarehouseOutlined } from '@mui/icons-material';
import { supabase } from '../utils/supabase';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const drawerWidth = 15;

const Template = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
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
                    <Box component='img' sx={{ width: '4dvh', height: '4dvh', borderRadius: '50%' }} src={user.picture} />
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
              {user.name && <Typography variant='body2' sx={{ px: 2, pt: 1 }}>{user.name}</Typography>}
              <Typography variant='body2' sx={{ px: 2, py: 1 }}>{user.email}</Typography>
              <Divider />
              <IconButton
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}
                sx={{ px: 2 }}
              >
                <LogoutOutlined /> <Typography variant='body2' sx={{ ml: 1 }} >Logout</Typography>
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
        <Box sx={{ overflow: 'auto', mt: '7dvh', height: '90dvh', pt: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <MenuItem onClick={() => navigate('/dashboard')} >
              <Home sx={{ mr: 1 }} />Home
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate('/company')} >
              <BusinessOutlined sx={{ mr: 1 }} />Company
            </MenuItem>
            <MenuItem onClick={() => navigate('/products')} >
              <WarehouseOutlined sx={{ mr: 1 }} />Products
            </MenuItem>
            <MenuItem onClick={() => navigate('/inventory')} >
              <InventoryOutlined sx={{ mr: 1 }} />Inventory
            </MenuItem>
          </Box>
          <Box>
            <Divider />
            <MenuItem onClick={() => navigate('/company')} >
              <PlumbingOutlined sx={{ mr: 1 }} />Settings
            </MenuItem>
            <MenuItem onClick={handleLogout} >
              <LogoutOutlined sx={{ mr: 1 }} />Logout
            </MenuItem>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', ml: open ? `${drawerWidth}dvw` : 0, width: open ? `${100 - drawerWidth}dvw` : '100dvw', p: 3, marginTop: '6vh' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Template;