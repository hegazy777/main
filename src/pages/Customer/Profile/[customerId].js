import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import CustomerView from './CustomerView'

import { useRouter } from 'next/router';

const CustomerProfile = ({ tab, invoiceData }) => {

  const router = useRouter()
const customerid = router.query.customerId;

console.log("custID",customerid);

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} lg={12}> 
          <CustomerView />
        </Grid>

      </Grid>
    </div>
  );
};

export default CustomerProfile;
