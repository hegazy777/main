// ** React Imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Custom Components
import CustomTextField from 'src/@core/components/mui/text-field'
import baseUrl from 'src/API/apiConfig';


const EditCity = ({ open, onClose, cityId ,fetchData}) => {
  // ** States
  const [cityData, setCityData] = useState(null);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs';
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(`https://tqneen-rlyoguxn5a-uc.a.run.app/api/cities/${cityId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCityData(response.data.data);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [cityId]);

  const handleEditClose = async () => {
    try {
      await axios.put(`${baseUrl}/api/cities/${cityId}`, cityData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData()
      onClose();
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };



  if (cityData) {
    const { name, areas, is_active } = cityData;

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
                Edit City Information
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
                        fullWidth
                        label='City Name (English)'
                        value={name.en}
                        onChange={(e) => setCityData({  name: { ...name, en: e.target.value } })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        fullWidth
                        label='City Name (Arabic)'
                        value={name.ar}
                        onChange={(e) => setCityData({ name: { ...name, ar: e.target.value } })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <CustomTextField
                        select
                        fullWidth
                        label='City Status'
                        value={is_active ? 'active' : 'inactive'}
                        onChange={(e) => setCityData({  is_active: e.target.value === 'active' })}
                      >
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                      </CustomTextField>
                    </Grid>
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
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Edit City
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default EditCity
