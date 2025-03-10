import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { baseUrl } from 'src/helper/axios';

import Iconify from 'src/components/iconify';

export default function UserTableRow({
  selected,
  _id,
  name,
  email,
  role,
  userType,
  status,
  onModification,
  avatarUrl,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false); // For Verify popup

  // Menu handlers
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  // Dialog handlers
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenVerifyDialog = () => {
    setOpenVerifyDialog(true);
  };

  const handleCloseVerifyDialog = () => {
    setOpenVerifyDialog(false);
  };

  // API Calls
  const token = localStorage.getItem('token');
  const handleDeleteUser = async () => {
    handleCloseDialog();
    try {
      const response = await axios.put(
        `${baseUrl}user/user-soft-delete?id=${_id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      onModification();
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

  const handleVerifyUser = async () => {
    handleCloseVerifyDialog();
    try {
      const response = await axios.put(
        `https://pasionneapi.codingacademy.world/api/user/verify-user?id=${_id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage('User verified successfully.');
        setTimeout(() => {
          setSuccessMessage('');
          onModification(); 
        }, 3000);
      } else {
        console.error('Failed to verify user:', response);
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

        <TableCell component="th" scope="row" align="center" padding="none">
          <Stack direction="row" alignItems="right" spacing={1}>
            <Avatar
              src={`https://api.pasionne.com/public/uploadImages/${avatarUrl}`}
              alt={name}
              loading="lazy"
            />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>
          <Button variant="contained" onClick={handleOpenVerifyDialog}>
            Verify
          </Button>
        </TableCell>
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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {/* Delete Confirmation Dialog */}
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

      {/* Verify Confirmation Dialog */}
      <Dialog
        open={openVerifyDialog}
        onClose={handleCloseVerifyDialog}
        aria-labelledby="alert-verify-dialog-title"
        aria-describedby="alert-verify-dialog-description"
      >
        <DialogTitle id="alert-verify-dialog-title">Confirm Verify</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-verify-dialog-description">
            Are you sure you want to verify this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVerifyDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerifyUser} color="success" autoFocus>
            Verify
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
  userType: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  _id: PropTypes.string,
  selected: PropTypes.bool,
  status: PropTypes.string,
  onModification: PropTypes.func, // Fixed prop type
  avatarUrl: PropTypes.string,
};
