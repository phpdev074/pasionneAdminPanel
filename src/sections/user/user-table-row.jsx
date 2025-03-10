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
import {Box, Grid,Avatar } from '@mui/material';
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
  mobileNumber,
  gender,
  userType,
  status,
  onModification,
  avatarUrl,
  dob,
  addInterestAge,
  addInterestHeight,
  addInterestLocation,
  blockedBy,
  cookingAndBaking,
  dance,
  education,
  englishLanguages,
  ethnicity,
  eyeColor,
  faithInterest,
  filmTV,
  frenchLanguages,
  fromAgeInterest,
  gaming,
  germanLanguages,
  hairColor,
  hairLength,
  height,
  history,
  hobbies,
  intellectualPursuit,
  interests,
  isBlocked,
  isDeleted,
  languageLearning,
  likes,
  listeningMusic,
  literature,
  locationName,
  lookingFor,
  lookingForEthnicity,
  maritalStatus,
  otherLanguages,
  personalityMessage,
  philosophy,
  primaryLanguages,
  psychology,
  russianLanguage,
  shortDescription,
  socialLifeStyle,
  spanishLanguages,
  sportsFitness,
  toAgeInterest,
  userProfileImages,
  artsAndCrafts,
  outDoors,
  reports,
  review,
  travel,
  science
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const renderArrayData = (label, array) => (
    <Typography variant="body1">
      <strong>{label}:</strong>{' '}
      {array && array.length > 0
        ? array.join(', ') 
        : 'The user has not filled this value'}
    </Typography>
  );
  
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

  const handleOpenInfoDialog = () => setOpenInfoDialog(true);
  const handleCloseInfoDialog = () => setOpenInfoDialog(false);

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
        <TableCell>
          <Button
            variant="contained"
            sx={{
              width: '100px',
              height: '40px',
              fontSize: '14px',
              backgroundColor: gender === 'male' ? 'blue' : 'deeppink',
              color: 'white',
              '&:hover': {
                backgroundColor: gender === 'male' ? 'darkblue' : 'deeppink',
              },
            }}
          >
            {gender === 'male' ? 'Male' : 'Female'}
          </Button>
        </TableCell>

        <TableCell>{mobileNumber}</TableCell>
        <TableCell>
          <Button variant="contained" onClick={handleOpenInfoDialog}>
            Info
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
      <Dialog open={openInfoDialog} onClose={handleCloseInfoDialog} fullScreen>
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
        }}
      >
        User Information
      </DialogTitle>

      {/* Dialog Content */}
      <Dialog open={openInfoDialog} onClose={handleCloseInfoDialog} fullScreen>
  <DialogTitle>User Information</DialogTitle>
  <DialogContent>
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Name:</strong> {name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Mobile:</strong> {mobileNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Date of Birth:</strong> {dob}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Interest Age:</strong> from {addInterestAge[0]} to {addInterestAge[1]}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Interest Height:</strong> from {addInterestHeight[0]} to {addInterestHeight[1]}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Location:</strong> {addInterestLocation}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Cooking and Baking:</strong> {renderArrayData(cookingAndBaking)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Dance:</strong> {dance}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Education:</strong> {education}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>English Languages:</strong> {englishLanguages}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Ethnicity:</strong> {ethnicity}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Eye Color:</strong> {eyeColor}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Faith Interest:</strong> {faithInterest}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Film and TV:</strong> {filmTV}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>French Languages:</strong> {frenchLanguages}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>From Age Interest:</strong> {fromAgeInterest}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Gaming:</strong> {gaming}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>German Languages:</strong> {germanLanguages}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Hair Color:</strong> {hairColor}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Hair Length:</strong> {hairLength}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Height:</strong> {height}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>History:</strong> {history}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Hobbies:</strong> {hobbies}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Intellectual Pursuits:</strong> {intellectualPursuit}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Interests:</strong> {interests}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Is Blocked:</strong> {isBlocked}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Is Deleted:</strong> {isDeleted}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Language Learning:</strong> {languageLearning}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Listening to Music:</strong> {listeningMusic}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Arts and Crafts:</strong> {artsAndCrafts}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Literature:</strong> {literature}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Location Name:</strong> {locationName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Looking For:</strong> {lookingFor}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Looking For Ethnicity:</strong> {lookingForEthnicity}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Marital Status:</strong> {maritalStatus}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Other Languages:</strong> {otherLanguages}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Personality Message:</strong> {personalityMessage}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Philosophy:</strong> {philosophy}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Primary Languages:</strong> {primaryLanguages}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Psychology:</strong> {psychology}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Russian Language:</strong> {russianLanguage}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Short Description:</strong> {shortDescription}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Social Lifestyle:</strong> {socialLifeStyle}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Spanish Languages:</strong> {spanishLanguages}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>Sports and Fitness:</strong> {sportsFitness}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            <strong>To Age Interest:</strong> {toAgeInterest}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Profile Images:</strong> {userProfileImages}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseInfoDialog} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>


      {/* Dialog Actions */}
      <DialogActions
        sx={{
          justifyContent: 'center',
          py: 2,
        }}
      >
        <Button onClick={handleCloseInfoDialog} variant="contained" color="primary">
          Close
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
  mobileNumber: PropTypes.string,
  _id: PropTypes.string,
  selected: PropTypes.bool,
  status: PropTypes.string,
  gender: PropTypes.string,
  onModification: PropTypes.string,
  avatarUrl: PropTypes.string,
  dob: PropTypes.string,
  addInterestAge: PropTypes.string,
  addInterestHeight: PropTypes.string,
  addInterestLocation: PropTypes.string,
  blockedBy: PropTypes.string,
  cookingAndBaking: PropTypes.string,
  dance: PropTypes.string,
  education: PropTypes.string,
  englishLanguages: PropTypes.string,
  ethnicity: PropTypes.string,
  eyeColor: PropTypes.string,
  faithInterest: PropTypes.string,
  filmTV: PropTypes.string,
  frenchLanguages: PropTypes.string,
  fromAgeInterest: PropTypes.string,
  gaming: PropTypes.string,
  germanLanguages: PropTypes.string,
  hairColor: PropTypes.string,
  hairLength: PropTypes.string,
  height: PropTypes.string,
  history: PropTypes.string,
  hobbies: PropTypes.string,
  intellectualPursuit: PropTypes.string,
  interests: PropTypes.string,
  isBlocked: PropTypes.string,
  isDeleted: PropTypes.string,
  languageLearning: PropTypes.string,
  likes: PropTypes.string,
  listeningMusic: PropTypes.string,
  literature: PropTypes.string,
  locationName: PropTypes.string,
  lookingFor: PropTypes.string,
  lookingForEthnicity: PropTypes.string,
  maritalStatus: PropTypes.string,
  otherLanguages: PropTypes.string,
  personalityMessage: PropTypes.string,
  philosophy: PropTypes.string,
  primaryLanguages: PropTypes.string,
  psychology: PropTypes.string,
  russianLanguage: PropTypes.string,
  shortDescription: PropTypes.string,
  socialLifeStyle: PropTypes.string,
  spanishLanguages: PropTypes.string,
  sportsFitness: PropTypes.string,
  toAgeInterest: PropTypes.string,
  userProfileImages: PropTypes.string,
  artsAndCrafts: PropTypes.string,
  outDoors: PropTypes.string,
  reports: PropTypes.string,
  review: PropTypes.string,
  travel: PropTypes.string,
  science: PropTypes.string,
};
