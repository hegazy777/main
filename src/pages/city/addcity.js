// ** React Imports
// ** MUI Imports
import baseUrl from 'src/API/apiConfig'


import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useState } from 'react';
import axios from 'axios';
import { boolean } from 'yup'


// ...




const AddCity = ({ open, onClose ,fetchData}) => {

  const [cityNameEn, setCityNameEn] = useState('');
  const [cityNameAr, setCityNameAr] = useState('');
  const [cityStatus, setCityStatus] = useState('');
  const [CityId, setCityId] = useState();

  const handleAddCity = async () => {
    try {
      const data = {
        name: {
          ar: cityNameAr,
          en: cityNameEn
        },
        is_active: Boolean(cityStatus)
      };

      const response = await axios.post(`${baseUrl}/api/cities`, data, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs"
        }
      });

      // Handle the response as needed
      console.log(response.data);

      fetchData();

      // Close the add city dialog
      handleAddClose();
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleAddClose = () => {
    // Perform any necessary actions before closing the dialog
    onClose();
  };

  const data = [
    {
      name: 'ahmed',
    }
  ]

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Dialog
              open={open}
              onClose={onClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                add New City Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        name='en'
                        fullWidth
                        label='city name in En'
                        placeholder='enter city name in english'
                        defaultValue=''
                        value={cityNameEn}
                        onChange={(event) => setCityNameEn(event.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        name='ar'
                        fullWidth
                        label='city name in arabic'
                        placeholder='enter city name in arabic'
                        defaultValue=''
                        value={cityNameAr}
                        onChange={(event) => setCityNameAr(event.target.value)}
                        required
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={12}>
                      <CustomTextField
                      name="is_active"
                        select
                        fullWidth
                        label='City Status'
                        value={cityStatus}
                        onChange={(event) => setCityStatus(event.target.value)}
                      >
                        <MenuItem value = 'true' >Active</MenuItem>
                        <MenuItem value= 'false' >Inactive</MenuItem>
                      </CustomTextField>
                    </Grid> */}
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleAddCity}>
                  add city
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleAddClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default AddCity
