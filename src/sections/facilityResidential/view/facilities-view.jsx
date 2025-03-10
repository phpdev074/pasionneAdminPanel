/* eslint-disable */
import axios from 'axios';
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { baseUrl } from 'src/helper/axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import AddForm from '../addForm';
import PostTableRow from '../post-table-row';
import PostTableHead from '../blog-table-head';

// ----------------------------------------------------------------------

export default function FacilityResidential() {
  
  const [postData, setPostData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [residentialData, setResidentialData] = useState([]);  
  const [selectedResidential, setSelectedResidential] = useState(''); 

  const getUsersData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    if (!selectedResidential) {
      console.error('No residential selected');
      return;
    }
      try {
      const response = await axios.get(`${baseUrl}post-property/get-fac-resi-item?id=${selectedResidential}`, {
        headers: {
          Authorization: token,
        },
      });
      setPostData(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      alert(error.message);
    }
  };
  

  const getResidentialData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}post-property/get-fac-residential`, {
        headers: {
          Authorization: token,
        },
      });
      setResidentialData(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching residential data:', error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    getUsersData();
    getResidentialData();  
  }, [selectedResidential]); 

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (newData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.post(
        `${baseUrl}post-property/create-fac-resi-item`,
        { nameEN: newData.itemEnglish, nameHN: newData.itemHindi,residentailId:selectedResidential  },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getUsersData(); 
      setSnackbarMessage('Property type added successfully');
      setShowSnackbar(true);
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form data:', error.message);
      alert(error.message);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleResidentialSelect = (event) => {
    setSelectedResidential(event.target.value);  
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Residential Property</Typography>

        {!showForm && (
          <Button
            variant="contained"
            color="inherit"
            onClick={handleAdd}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Typography variant="body1">Select Residential:</Typography>
        <Select
          value={selectedResidential}
          onChange={handleResidentialSelect}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Residential' }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="" disabled>Select an option</MenuItem>
          {residentialData.map((residential) => (
            <MenuItem key={residential._id} value={residential._id}>
              {residential.nameEN}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      {showForm ? (
        <AddForm onSubmit={handleFormSubmit} onClose={handleClose} />
      ) : (
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PostTableHead
                headLabel={[
                  { id: 'itemEnglish', label: 'Item English' },
                  { id: 'itemHindi', label: 'Item Hindi' },
                  { id: 'action', label: 'Action' },
                ]}
                rowCount={postData.length}
              />
              <TableBody>
                {postData.length > 0 ? (
                  postData.map((row) => (
                    <PostTableRow
                      key={row._id}
                      nameEN={row.nameEN}
                      nameHN={row.nameHN}
                      id={row._id}
                      onModification={getUsersData}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <div style={{ marginTop: '10%', fontWeight: 'bold' }}>No Data Found</div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      )}
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
