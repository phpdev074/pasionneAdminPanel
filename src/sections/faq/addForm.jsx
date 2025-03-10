/* eslint-disable */
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';
import {
  Grid,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';

const FullScreenContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  alignItems: 'left',
  minHeight: '100vh',
  padding: theme.spacing(4),
  borderRadius: '8px',
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
}));

const FullWidthButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  width: '20%',
}));

const FullWidthTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
}));

const validationSchema = Yup.object({
  question: Yup.string().required('Question is required'),
  answer: Yup.string().required('Answer is required'),
});

const AddForm = ({ onSubmit, onClose, initialData }) => {
  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      question: initialData?.question || '',
      answer: initialData?.answer || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsUploading(true);
        await onSubmit(values);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: initialData ? 'FAQ updated successfully!' : 'FAQ created successfully!',
        });

        formik.resetForm();
        onClose();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while submitting the form.',
        });
      } finally {
        setIsUploading(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <FullScreenContainer maxWidth={false}>
      <Typography variant="h4" align="left" gutterBottom>
        {initialData ? 'Edit FAQ' : 'Add FAQ'}
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FullWidthTextField
              id="question"
              label="Question"
              variant="outlined"
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.question && Boolean(formik.errors.question)}
              helperText={formik.touched.question && formik.errors.question}
            />
          </Grid>
          <Grid item xs={12}>
            <FullWidthTextField
              id="answer"
              label="Answer"
              variant="outlined"
              multiline
              rows={4}
              name="answer"
              value={formik.values.answer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched.answer && formik.errors.answer}
            />
          </Grid>
        </Grid>
        {isUploading ? (
          <CircularProgress sx={{ marginTop: 2 }} />
        ) : (
          <FullWidthButton type="submit">{initialData ? 'Update' : 'Submit'}</FullWidthButton>
        )}
      </form>
    </FullScreenContainer>
  );
};

AddForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

AddForm.defaultProps = {
  initialData: null,
};

export default AddForm;
