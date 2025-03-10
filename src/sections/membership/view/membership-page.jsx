/* eslint-disable */ 
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import { applyFilter, getComparator } from '../utils';

export default function MembershipPage() {
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [order] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy] = useState('name');
  const [filterName] = useState('');
  const [rowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  // State for Membership Form
  const [membershipData, setMembershipData] = useState({
    name: '',
    price: '',
    duration: '',
    discountPrice: '',
    offers: '',
    features: '',
  });

  // Fetch Membership Data
  const getUsersData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await axios.get(`https://pasionneapi.codingacademy.world/api/testimonial/get-membership-plan`, {
        headers: { Authorization: token },
      });
      setUserData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  // Handle Dialog Open/Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMembershipData({
      name: '',
      price: '',
      duration: '',
      discountPrice: '',
      offers: '',
      features: '',
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setMembershipData({ ...membershipData, [e.target.name]: e.target.value });
  };

  // Handle Adding Membership
  const handleAddMembership = async () => {
    try {
      const formattedData = {
        ...membershipData,
        price: Number(membershipData.price),
        discountPrice: Number(membershipData.discountPrice),
        offers: membershipData.offers.split(',').map((offer) => offer.trim()), // Convert comma-separated string to array
        features: membershipData.features.split(',').map((feature) => feature.trim()), // Convert to array
      };

      await axios.post('https://pasionneapi.codingacademy.world/api/testimonial//create-membership', formattedData, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      handleClose();
      getUsersData();
    } catch (error) {
      console.error('Error adding membership:', error.message);
    }
  };

  // Handle Pagination Change
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Membership</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Membership
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userData.length}
                numSelected={selected.length}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'price', label: 'Price' },
                  { id: 'duration', label: 'Duration' },
                  { id: 'discountPrice', label: 'Discount Price' },
                  { id: 'offers', label: 'Offers' },
                  { id: 'features', label: 'Features' },
                  { id: 'action', label: '' },
                ]}
              />
              <TableBody>
                {userData.length > 0 ? (
                  userData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
                    <UserTableRow
                      key={row._id}
                      name={row?.name}
                      price={row?.price}
                      duration={row.duration}
                      discountPrice={row.discountPrice}
                      offers={row.offers?.join(', ')}
                      features={row.features?.join(', ')}
                      _id={row._id}
                      avatarUrl={row.userImage}
                      userType={row.userType}
                      selected={selected.indexOf(row.name) !== -1}
                      onModification={getUsersData}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <div style={{ marginTop: '10%', fontWeight: 'bold' }}>No Data Found</div>
                    </TableCell>
                  </TableRow>
                )}
                <TableEmptyRows height={77} emptyRows={rowsPerPage - userData.length % rowsPerPage} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Stack alignItems="center" mt={2} mb={2}>
          <Pagination count={Math.ceil(userData.length / rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
        </Stack>
      </Card>

      {/* Dialog for Adding Membership */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Membership</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="price" label="Price" type="number" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="duration" label="Duration" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="discountPrice" label="Discount Price" type="number" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="offers" label="Offers " fullWidth margin="normal" onChange={handleChange} />
          <TextField name="features" label="Features" fullWidth margin="normal" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddMembership} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
