import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';
import {
  Grid,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
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
  width: '100%',
}));

const FullWidthTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
}));

const validationSchema = Yup.object({
  itemEnglish: Yup.string().required('Item English is required'),
  itemHindi: Yup.string().required('Item Hindi is required'),
});

const AddForm = ({ onSubmit, onClose }) => {
  const formik = useFormik({
    initialValues: {
      itemEnglish: '',
      itemHindi: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <FullScreenContainer maxWidth={false}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        <Close />
      </IconButton>
      <Typography variant="h4" align="left" gutterBottom>
        Add Facility Commercial
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FullWidthTextField
              label="Item English"
              variant="outlined"
              name="itemEnglish"
              value={formik.values.itemEnglish}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.itemEnglish && Boolean(formik.errors.itemEnglish)}
              helperText={formik.touched.itemEnglish && formik.errors.itemEnglish}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FullWidthTextField
              label="Item Hindi"
              variant="outlined"
              name="itemHindi"
              value={formik.values.itemHindi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.itemHindi && Boolean(formik.errors.itemHindi)}
              helperText={formik.touched.itemHindi && formik.errors.itemHindi}
              required
            />
          </Grid>
        </Grid>
        <FullWidthButton
          type="submit"
          variant="contained"
        >
          Submit
        </FullWidthButton>
      </form>
    </FullScreenContainer>
  );
};

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddForm;
