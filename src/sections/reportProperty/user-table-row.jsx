import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  _id,
  name,
  email,
  propertyType,
  propertyCreated,
  onModification,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseMenu = () => {
    setOpenMenu(null);
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
      const response = await axios.put(
        `https://api.pasionne.com/api/user/user-soft-delete?id=${_id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      onModification();
      console.log('Response...', response);
      if (response.status === 200) {
        setSuccessMessage('User deleted successfully.');
      } else {
        console.error('Failed to delete user:', response);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">&nbsp;</TableCell>

        <TableCell component="th" scope="row" style={{ marginLeft: '15%', padding: 'none' }}>
          {name}
        </TableCell>

        <TableCell style={{ marginLeft: '15%', padding: 'none' }}>{email}</TableCell>
        <TableCell style={{ marginLeft: '15%', padding: 'none' }}>{propertyType}</TableCell>
        <TableCell style={{ marginLeft: '15%', padding: 'none' }}>{propertyCreated}</TableCell>
      </TableRow>

      <Popover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
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
  email: PropTypes.string,
  name: PropTypes.string,
  propertyType: PropTypes.string,
  propertyCreated: PropTypes.string,
  _id: PropTypes.string,
  selected: PropTypes.bool,
  onModification: PropTypes.string,
};
