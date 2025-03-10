/* eslint-disable */
import axios from 'axios';
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { baseUrl } from 'src/helper/axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import AddForm from '../addForm';
import PostTableRow from '../post-table-row';
import PostTableHead from '../blog-table-head';

export default function CommercialData() {
  const [postData, setPostData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [commercialData, setCommercialData] = useState([]);  
  const [selectedCommercial, setSelectedCommercial] = useState(''); 

  const getUsersData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    if (!selectedCommercial) {
      console.error('No Commercial selected');
      return;
    }
      try {
      const response = await axios.get(`${baseUrl}post-property/get-commercial-items?id=${selectedCommercial}`, {
        headers: {
          Authorization: token,
        },
      });
      setPostData(response?.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      alert(error.message);
    }
  };

  const getCommercialData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}post-property/get-commercial`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response?.data?.data)
      setCommercialData(response?.data?.data?.amenities || []);
    } catch (error) {
      console.error('Error fetching residential data:', error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    getUsersData();
    getCommercialData();  
  }, [selectedCommercial]); 

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
        `${baseUrl}post-property/create-commercial-items`,
        { nameEN: newData.itemEnglish, nameHN: newData.itemHindi ,commercialAmenitiesId:selectedCommercial},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getUsersData();
      setSnackbarMessage('Commercial data added successfully');
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
    setSelectedCommercial(event.target.value);  
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Commercial Property</Typography>

        {!showForm && (
          <Button
            variant="contained"
            onClick={handleAdd}
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Typography variant="body1">Select Commercial:</Typography>
        <Select
          value={selectedCommercial}
          onChange={handleResidentialSelect}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Commercial' }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="" disabled>Select an option</MenuItem>
          {commercialData.map((commercial) => (
            <MenuItem key={commercial._id} value={commercial._id}>
              {commercial.nameEN}
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
                      onModification={() => {
                        getUsersData();
                      }}
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
