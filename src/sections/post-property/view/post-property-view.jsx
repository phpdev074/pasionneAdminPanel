import axios from 'axios';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { Pagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { baseUrl } from 'src/helper/axios';

import Scrollbar from 'src/components/scrollbar';

import PostTableRow from '../post-table-row';
import PostTableHead from '../blog-table-head';
import TableEmptyRows from '../table-empty-rows'; 


export default function ParkingData() {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const getUsersData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get(`${baseUrl}post-property/get-deleted-property`, {
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

  useEffect(() => {
    getUsersData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(postData.length / rowsPerPage);

  const emptyRows = Math.max(0, (page + 1) * rowsPerPage - postData.length);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Delted Property</Typography>
      </Stack>

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <PostTableHead
              headLabel={[
                { id: 'name', label: 'Name' },
                { id: 'userType', label: 'User Type' },
                { id: 'postType', label: 'Post Type' },
                { id: 'propertyType', label: 'Property Type' },
                { id: '', label: 'Action' },
              ]}
              rowCount={postData.length}
            />
            <TableBody>
              {postData.length > 0 ? (
                postData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PostTableRow
                      key={row?._id}
                      id={row?._id}
                      name={row?.userId?.name}
                      userType={row?.userId?.userType}
                      purpose={row?.requestData?.postType}
                      propertyType={row?.requestData?.details?.propertyType}
                      onModification={getUsersData}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <div style={{ marginTop: '10%',fontWeight:"bold" }}>No Data Found</div>
                  </TableCell>
                </TableRow>
              )}

              {/* Render empty rows to maintain table structure */}
              {postData.length > 0 &&
                Array.from({ length: emptyRows }).map((_, index) => <TableEmptyRows key={index} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Stack alignItems="center" mt={2} mb={2}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => handleChangePage(event, value - 1)}
          color="primary"
        />
      </Stack>
    </Container>
  );
}
