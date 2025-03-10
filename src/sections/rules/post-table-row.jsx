import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PostTableRow({
  selected,
  nameEN,
  nameHN,
  id,
  onEdit,
  onDelete,
  onModification
}) {
  const [open, setOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editValues, setEditValues] = useState({ nameEN, nameHN });
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' });
  const [deleteFeedback, setDeleteFeedback] = useState({ open: false, message: '', severity: '' });

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenEdit = () => {
    setEditOpen(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleOpenDelete = () => {
    setDeleteOpen(true);
    handleCloseMenu();
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('token');
    console.log("===>>Token",token)
    if (!token) {
      console.error('No token available for editing');
      return;
    }

    try {
       await axios.post(
        `https://api.pasionne.com/api/post-property/edit-rules?id=${id}`,
        editValues,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setFeedback({ open: true, message: 'Data saved successfully', severity: 'success' });
      setEditOpen(false);
      onModification()
      handleCloseEdit();
    } catch (error) {
      console.error('There was an error editing the item!', error);
    }
  };

  const handleDeleteSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token available for deletion');
      return;
    }

    try {
      await axios.delete(
        `https://api.pasionne.com/api/post-property/delete-rules?id=${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setDeleteOpen(false);
      setDeleteFeedback({ open: true, message: 'Data deleted successfully', severity: 'success' })
      onModification();
      handleCloseDelete();
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
  };
  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };
  const handleCloseDeleteFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">&nbsp;</TableCell>

        <TableCell>{nameEN}</TableCell>

        <TableCell>{nameHN}</TableCell>

        <TableCell align="left">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOpenDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="nameEN"
            label="Name EN"
            type="text"
            fullWidth
            value={editValues.nameEN}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="nameHN"
            label="Name HN"
            type="text"
            fullWidth
            value={editValues.nameHN}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDeleteSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={handleCloseFeedback}
      >
        <Alert onClose={handleCloseFeedback} severity={feedback.severity} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteFeedback.open}
        autoHideDuration={6000}
        onClose={handleCloseDeleteFeedback}
      >
        <Alert onClose={handleCloseDeleteFeedback} severity={feedback.severity} sx={{ width: '100%' }}>
          {deleteFeedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

PostTableRow.propTypes = {
  nameHN: PropTypes.string,
  nameEN: PropTypes.string,
  selected: PropTypes.bool,
  id: PropTypes.any,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModification: PropTypes.string
};
