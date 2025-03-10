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

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  _id,
  name,
  email,
  rating,
  message,
  onModification,
  avatarUrl,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

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
      console.log('===>>>token', token);
      if (!token) {
        console.error('No token found');
        return;
      }
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
  console.log('===>>avtarUrl', avatarUrl);
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
              src={`https://pasionneapi.codingacademy.world/public/uploadImages/${avatarUrl}`}
              alt={name}
              loading="lazy"
            />
            <Typography variant="subtitle2" style={{marginTop:"8%"}} noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{message}</TableCell>
        <TableCell>{rating}</TableCell>

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
  name: PropTypes.string,
  _id: PropTypes.string,
  email: PropTypes.string,
  rating: PropTypes.string,
  message: PropTypes.string,
  selected: PropTypes.bool,
  onModification: PropTypes.string,
  avatarUrl: PropTypes.string,
};
