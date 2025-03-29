import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Stack,
  Dialog,
  Button,
  Popover,
  Snackbar,
  TableRow,
  MenuItem,
  TableCell,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { baseUrl } from 'src/helper/axios';

import Iconify from 'src/components/iconify';

export default function UserTableRow({
  selected,
  _id,
  name,
  onModification,
  price,
  duration,
  discountPrice,
  offers,
  features,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // State for editing fields
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editDuration, setEditDuration] = useState(duration);
  const [editDiscountPrice, setEditDiscountPrice] = useState(discountPrice);
  const [editOffers, setEditOffers] = useState(offers);
  const [editFeatures, setEditFeatures] = useState(features);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
    handleCloseMenu();
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteUser = async () => {
    handleCloseDialog();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.delete(`${baseUrl}testimonial/delete-membership`, {
        headers: { Authorization: `${token}` },
        data: { id: _id }, // Sending the ID properly
      });

      if (response.data.statusCode === 200) {
        setSuccessMessage('Membership deleted successfully.');
        onModification();
      } else {
        console.error('Failed to delete membership:', response);
      }
    } catch (error) {
      console.error('Error deleting membership:', error.response?.data || error.message);
    }
  };

  const handleUpdateMembership = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const updatedData = {
        id: _id,
        name: editName,
        price: editPrice,
        duration: editDuration,
        discountPrice: editDiscountPrice,
        offers: editOffers,
        features: editFeatures,
      };

      const response = await axios.put(`${baseUrl}testimonial/update-membership`, updatedData, {
        headers: { Authorization: `${token}` },
      });

      if (response.data.statusCode === 200) {
        setSuccessMessage('Membership updated successfully.');
        onModification();
        setOpenEditDialog(false);
      } else {
        console.error('Failed to update membership:', response);
      }
    } catch (error) {
      console.error('Error updating membership:', error.response?.data || error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">&nbsp;</TableCell>

        <TableCell align="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{price}</TableCell>
        <TableCell>{duration}</TableCell>
        <TableCell>{discountPrice}</TableCell>
        <TableCell>{offers}</TableCell>
        <TableCell>{features}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 140 } }}
      >
        <MenuItem onClick={handleOpenEditDialog}>
          <Iconify icon="eva:edit-outline" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this membership?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Membership Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Membership</DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {' '}
          {/* Added margin-top */}
          <Stack spacing={2} sx={{ width: 600 }}>
            <TextField
              fullWidth
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />
            <TextField
              fullWidth
              label="Duration"
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
            />
            <TextField
              fullWidth
              label="Discount Price"
              value={editDiscountPrice}
              onChange={(e) => setEditDiscountPrice(e.target.value)}
            />
            <TextField
              fullWidth
              label="Offers"
              value={editOffers}
              onChange={(e) => setEditOffers(e.target.value)}
            />
            <TextField
              fullWidth
              label="Features"
              value={editFeatures}
              onChange={(e) => setEditFeatures(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateMembership} color="success" autoFocus>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </>
  );
}

UserTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onModification: PropTypes.func.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discountPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offers: PropTypes.string,
  features: PropTypes.string,
};
