// ** React Imports
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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

const EditArea = ({ open, onClose ,areaId }) => {
  // ** States
  const [areaNameAr, setAreaNameAr] = useState('');
  const [areaNameEn, setAreaNameEn] = useState('');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  console.log("id",areaId);

  useEffect(() => {
    async function fetchCities() {
      try {
        const apiUrl = '{{url}}api/cities'; // Replace with your actual API URL
        const response = await axios.get(apiUrl);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = '{{url}}api/areas';


      // Replace with your actual API URL
      const payload = {
        name: {
          ar: areaNameAr,
          en: areaNameEn,
        },
        city: cityId,
      };

      const response = await axios.post(apiUrl, payload);
      console.log('Area added successfully:', response.data);

      // Reset form fields
      setAreaNameAr('');
      setAreaNameEn('');
      setCityId('');
    } catch (error) {
      console.error('Error adding area:', error);
    }
  };

  const handleEditClose = () => {

    // Perform any necessary actions before closing the dialog
    onClose();
  };

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
              edit New area Information
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='area name in En'
                      placeholder='enter area name in english'
                      defaultValue=''
                      value={areaNameAr}
                      onChange={(e) => setAreaNameAr(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='area name in en'
                      placeholder='enter area name in arabic'
                      defaultValue=''
                      value={areaNameEn}
                      onChange={(e) => setAreaNameEn(e.target.value)}

                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField select fullWidth label='Select city' defaultValue=''>
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField select fullWidth label='area Status' defaultValue=''>
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
                edit area
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )

}

export default EditArea
