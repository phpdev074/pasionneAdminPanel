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
  selected,
  question,
  answer,
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
      await axios.delete(`${baseUrl}testimonial/delete-faqs`, { params: { id } });
      setFeedback({ open: true, message: 'Item deleted successfully', severity: 'success' });
      onModification();
      setConfirmDeleteOpen(false); 
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
        `${baseUrl}testimonial/edit-faq?id=${id}`,
        {
          question: updatedData?.question,
          answer: updatedData?.answer,
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
        <TableCell>{question}</TableCell>
        <TableCell>{answer}</TableCell>
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
            question,
            answer
          }}
          onClose={handleCloseEdit}
          onSubmit={handleSubmit}
        />
        <DialogActions
          sx={{ justifyContent: 'flex-end', position: 'absolute', marginTop: 39, right: 16 }}
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
  question: PropTypes.string,
  answer: PropTypes.string,
  id: PropTypes.string.isRequired,
  onModification: PropTypes.func.isRequired,
};
