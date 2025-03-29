import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { baseUrl } from 'src/helper/axios';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}user/get-all-user-data`, {
        headers: {
          Authorization: token,
        },
      });
      setTotalUsers(response?.data?.data.totalUsers || 0);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={totalUsers}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Payments"
            total="900 £"
            color="info"
            icon={
              <img
                alt="Payment summary icon"
                src="https://pasionneapi.codingacademy.world/public/uploadImages/3b9a0e1c-9a36-4551-b242-afc6331d1d5e_payments.png"
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          &nbsp;
        </Grid>
      </Grid>
    </Container>
  );
}
