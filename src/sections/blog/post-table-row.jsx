/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  TableRow,
  TableCell,
  Avatar,
  IconButton,
  Popover,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import AddForm from './addForm'; 
import Iconify from 'src/components/iconify';
import { baseUrl } from 'src/helper/axios';

export default function PostTableRow({
  description,
  selected,
  nameEN,
  nameHN,
  images,
  id,
  onModification,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: '' });

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const handleOpenEdit = () => {
    setEditOpen(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => setEditOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}testimonial/delete-blogs`, { params: { id } });
      setFeedback({ open: true, message: 'Item deleted successfully', severity: 'success' });
      onModification(); // Trigger re-fetch in the parent
      setConfirmDeleteOpen(false); // Close the confirmation dialog
    } catch (error) {
      setFeedback({
        open: true,
        message: error.response?.data?.message || 'Failed to delete item',
        severity: 'error',
      });
    }
  };

  const handleSubmit = async (updatedData) => {
    try {
      await axios.put(
        `${baseUrl}testimonial/edit-blog?id=${id}`,
        {
          title: updatedData?.title,
          description: updatedData?.description,
          images: updatedData?.uploadImages,
          header: updatedData?.header,
        },
      );

      setFeedback({ open: true, message: 'Blog updated successfully', severity: 'success' });
      onModification(); // Trigger re-fetch in the parent
      setEditOpen(false); // Close the edit dialog
    } catch (error) {
      setFeedback({
        open: true,
        message: error.response?.data?.message || 'Failed to update blog',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox" />
        <TableCell>
          <Avatar
            alt="Blog Image"
            src={
              images
                ? ` https://pasionneapi.codingacademy.world/public/uploadImages/${images}`
                : '/path/to/default/image.jpg'
            }
          />
        </TableCell>
        <TableCell>{nameEN}</TableCell>
        <TableCell>{nameHN}</TableCell>
        <TableCell align="left">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 140 } }}
      >
        <MenuItem onClick={handleOpenEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => setConfirmDeleteOpen(true)}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {/* Full-Screen Dialog for AddForm */}
      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <AddForm
          initialData={{
            title: nameEN,
            header: nameHN,
            description,
            uploadImages: images,
          }}
          onClose={handleCloseEdit}
          onSubmit={handleSubmit}
        />
        <DialogActions
          sx={{ justifyContent: 'flex-end', position: 'absolute', marginTop: 83.5, right: 16 }}
        >
          <Button onClick={handleCloseEdit} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}>
        <Alert
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          severity={feedback.severity}
          sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

PostTableRow.propTypes = {
  selected: PropTypes.bool,
  nameEN: PropTypes.string,
  nameHN: PropTypes.string,
  images: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  onModification: PropTypes.func.isRequired,
};
