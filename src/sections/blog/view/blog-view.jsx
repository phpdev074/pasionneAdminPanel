import axios from 'axios';
import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
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

export default function BlogView() {
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
      const response = await axios.get(` https://pasionneapi.codingacademy.world/api/testimonial/get-blogs`, {
        headers: {
          Authorization: token,
        },
      });
      console.log('response?.data?.data.....', response?.data?.data);
      setPostData(response?.data?.data);
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
      console.log("=====>>>>>newData",newData) 
      await axios.post(
        `${baseUrl}testimonial/create-blogs`,
        { title:newData.title,description:newData.description,images:newData.uploadImages,header:newData.header },
      );
      getUsersData(); 
      setSnackbarMessage('Blogs added successfully');
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
        <Typography variant="h4">Blogs</Typography>
        {!showForm && (
          <Button
            variant="contained"
            color="inherit"
            onClick={handleAdd}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add New Blogs
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
                  { id: 'blogImage', label: 'Blog Image' },
                  { id: 'title', label: 'Title' },
                  { id: 'header', label: 'Header' },
                  { id: '',label:'Action'}
                ]}
                rowCount={PostTableRow.length}
              />
              <TableBody>
                {postData?.length > 0 ? (
                  postData.map((row) => (
                    <PostTableRow
                    key={row._id}
                    nameEN={row.title}
                    nameHN={row.header}
                    images={row.images}
                    description={row.description}
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
