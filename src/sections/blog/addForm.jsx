/* eslint-disable */
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/system';
import {
  Grid,
  Button,
  Container,
  TextField,
  Typography,
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

// Enhanced validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters long'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  header: Yup.string()
    .required('Header is required')
    .min(5, 'Header must be at least 5 characters long'),
});

const AddForm = ({ onSubmit, onClose, initialData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      header: initialData?.header || '',
      blogImage: null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsUploading(true);

        let uploadedImagePath = initialData?.uploadImages;

        if (values.blogImage) {
          const imageFormData = new FormData();
          imageFormData.append('image', values.blogImage);

          const uploadResponse = await axios.post(
            'https://pasionneapi.codingacademy.world/api/user/upload-images',
            imageFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          uploadedImagePath = uploadResponse?.data?.data.fileName;

          if (!uploadedImagePath) {
            throw new Error('Image upload failed');
          }
        }

        const finalData = {
          title: values.title,
          description: values.description,
          header: values.header,
          uploadImages: uploadedImagePath,
        };

        await onSubmit(finalData);

        setIsUploading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: initialData ? 'Blog updated successfully!' : 'Blog created successfully!',
        });

        onClose(); // Close the form after successful submission
      } catch (error) {
        setIsUploading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading the image or submitting the form.',
        });
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('blogImage', file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (initialData?.uploadImages) {
      setUploadedImage(` https://pasionneapi.codingacademy.world/public/uploadImages/${initialData.uploadImages}`);
    }
  }, [initialData]);

  return (
    <FullScreenContainer maxWidth={false}>
      <Typography variant="h4" align="left" gutterBottom>
        {initialData ? 'Edit Blog' : 'Add Blog'}
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FullWidthTextField
              label="Title"
              variant="outlined"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <FullWidthTextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <FullWidthTextField
              label="Header"
              variant="outlined"
              name="header"
              value={formik.values.header}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.header && Boolean(formik.errors.header)}
              helperText={formik.touched.header && formik.errors.header}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Upload Blog Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginTop: '8px' }}
            />
          </Grid>
          {uploadedImage && (
            <Grid item xs={12}>
              <Typography variant="subtitle1">Image Preview:</Typography>
              <img
                src={uploadedImage}
                alt="Preview"
                style={{
                  width: '50%',
                  maxWidth: '300px',
                  height: '150px',
                  marginTop: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            </Grid>
          )}
        </Grid>
        {isUploading ? (
          <CircularProgress sx={{ marginTop: 2 }} />
        ) : (
          <>
          <FullWidthButton type="submit" sx={{ marginRight: 2 }}>{initialData ? 'Update' : 'Submit'}</FullWidthButton>
          {!initialData && (
            <FullWidthButton type="button" onClick={onClose}>
              Cancel
            </FullWidthButton>
          )}
        </>
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

export default AddForm;