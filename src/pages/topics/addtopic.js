// ** React Imports
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from 'src/API/apiConfig'

const AddTopics = ({ open, onClose, fetchData }) => {
  const [areaNameEn, setAreaNameEn] = useState('');
  const [areaNameAr, setAreaNameAr] = useState('');
  const [areaStatus, setAreaStatus] = useState('');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // select city api
  useEffect(() => {
    // fetch data
    const fetchCiteis = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/cities`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs`
          }
        });
        setCities(response.data.data);
        console.log("city", response);
        setSuccessMessage('Area added successfully!');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Failed to add area.');
        setSuccessMessage('');
        console.log(error);
      }
    }
    fetchCiteis()
  }, []);


  const handleAddArea = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: {
          ar: areaNameAr,
          en: areaNameEn
        },
        is_active: Boolean(areaStatus),
        city: cityId,
      };

      const response = await axios.post(`${baseUrl}/api/areas`, data, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs"
        }
      });
      fetchData();
      setAreaNameEn('');
      setAreaNameAr('');
      setAreaStatus('');
      setCityId('');

      // Close the add city dialog
      handleAddClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClose = () => {
    setAreaNameEn('');
    setAreaNameAr('');
    setAreaStatus('');
    setCityId('');
    onClose();
  };

  if (cities) {
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
                add New Area Information
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
                        label='area name in En'
                        placeholder='enter area name in english'
                        value={areaNameEn}
                        onChange={(event) => setAreaNameEn(event.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField
                        name='ar'
                        fullWidth
                        label='area name in arabic'
                        placeholder='enter area name in arabic'
                        value={areaNameAr}
                        onChange={(event) => setAreaNameAr(event.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <CustomTextField
                        name='city'
                        select
                        fullWidth
                        label='Select City'
                        value={cityId}
                        onChange={(event) => setCityId(event.target.value)}
                        required
                      >
                        {cities && cities.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.name.en}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Grid>
                    {/* <Grid item xs={12} sm={12}>
                      <CustomTextField
                        name="is_active"
                        select
                        fullWidth
                        label='area Status'
                        value={areaStatus}
                        onChange={(event) => setAreaStatus(event.target.value)}
                      >
                        <MenuItem value='true' >Active</MenuItem>
                        <MenuItem value='false' >Inactive</MenuItem>
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
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleAddArea}>
                  add Topic
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

export default AddTopics
