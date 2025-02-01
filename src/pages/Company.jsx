import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Stack } from '@mui/material';
import { Toaster } from 'sonner';

const Company = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleLogoUpload = (event) => {
    setCompanyLogo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ companyName, companyDescription, companyLogo });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Toaster />
      <Stack direction='row' spacing={2} sx={{ pb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction='column'>
          <Typography variant='h5' fontWeight='bold' >Company</Typography>
          <Typography variant='body'>Manage your company information.</Typography>
        </Stack>
      </Stack>

      <Box sx={{ mt: 2, pr: 10 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            label="Company Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Company Logo
            <input
              type="file"
              hidden
              onChange={handleLogoUpload}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Company;