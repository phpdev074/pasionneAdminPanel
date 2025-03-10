import axios from 'axios';
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';  
import Snackbar from '@mui/material/Snackbar';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

// import { posts } from 'src/_mock/blog';
import { baseUrl } from 'src/helper/axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import PostSearch from '../post-search';
import AddForm from '../addForm';
import PostTableRow from '../post-table-row';
import PostTableHead from '../blog-table-head';

// ----------------------------------------------------------------------

export default function FoodTypeData() {
  const [postData, setPostData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getUsersData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}post-property/get-food-type-data`, {
        headers: {
          Authorization: token,
        },
      });
      setPostData(response?.data?.data?.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

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
        `${baseUrl}post-property/create-food-types`,
        { nameEN: newData.itemEnglish, nameHN: newData.itemHindi },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getUsersData();
      setSnackbarMessage('Food Charges data added successfully');
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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Food Types</Typography>

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
