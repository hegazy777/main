// LawyerData.js

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';  // Import the useRouter hook
import LawyerApi from './lawyerApi';

const LawyerData = ({ token }) => {
  const router = useRouter();  // Use the useRouter hook to get the router object
  const { data, loading, execute } = LawyerApi(router.query.lawyerId, token);

  // ... Other code related to displaying data

  if (data) {
    return (
      <Grid container spacing={12}>
        {data.full_name}
      </Grid>
    );
  } else {
    return null;
  }
};

export default LawyerData;
