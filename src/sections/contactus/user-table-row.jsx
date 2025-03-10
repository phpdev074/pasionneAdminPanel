import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
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
  status,
  subject,
  message,
  revertMessage,
  onModification,
  avatarUrl,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openRevertDialog, setOpenRevertDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
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
  const handleRevertDialogClose = () => {
    setOpenRevertDialog(false);
  };
  const handleRevertDialogOpen = () => {
    setReplyMessage(''); 
    setOpenRevertDialog(true);
    handleCloseMenu();
  };

  const handleRevertSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      console.log("here")
      const response = await axios.post(
        `https://pasionneapi.codingacademy.world/api/testimonial/revert-mail?id=${_id}`,
        { replyMessage },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Reply sent successfully.');
        handleRevertDialogClose();
        setTimeout(()=>{
          onModification()
        },0)
      } else {
        console.error('Failed to send reply:', response);
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

  const handleDeleteUser = async () => {
    handleCloseDialog();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.put(
        `${baseUrl}testimonial/delete-contactUs?id=${_id}`,
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
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{subject}</TableCell>
        <TableCell>{message}</TableCell>
        <TableCell>{revertMessage}</TableCell>
        <TableCell>
          {status === 'pending' ? (
            <Button variant="contained" color="success" size="small">
              Pending
            </Button>
          ) : (
            <Button variant="contained" color="warning" size="small">
              Done
            </Button>
          )}
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
         <MenuItem
          onClick={handleRevertDialogOpen}
          sx={{ color: 'primary.main' }}
        >
          <Iconify icon="eva:undo-outline" sx={{ mr: 2 }} />
          Revert
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
      <Dialog open={openRevertDialog} onClose={handleRevertDialogClose} fullWidth>
        <DialogTitle>Reply</DialogTitle>
        <DialogContent>
          <TextField
            label="Reply Message"
            fullWidth
            multiline
            rows={4}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRevertDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRevertSubmit} color="primary" variant="contained">
            Submit
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
  subject: PropTypes.string,
  message: PropTypes.string,
  selected: PropTypes.bool,
  status: PropTypes.string,
  onModification: PropTypes.string,
  avatarUrl: PropTypes.string,
  revertMessage: PropTypes.string,
};
