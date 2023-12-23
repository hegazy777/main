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
import { use } from 'i18next';
import { headers } from 'next/dist/client/components/headers';

const EditArea = ({ open, onClose, areaId, fetchData }) => {
  // ** States
  const [areaNameEn, setAreaNameEn] = useState('');
  const [areaNameAr, setAreaNameAr] = useState('');
  const [areaStatus, setAreaStatus] = useState('');
  const [cityId, setCityId] = useState();
  const [cities, setCities] = useState([]);

  const router = useRouter();

  // const { id } = router.query;
  console.log("id", areaId);

  // fetch area data
  useEffect(() => {
    const fetchArea = async () => {

      try {
        const response = await axios.get(`https://tqneen-testing-be1-dot-tqneen-406411.ew.r.appspot.com/api/areas/${areaId}`, {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs"
          }
        });

        const area = response.data.data;
        console.log(area);
        setAreaNameEn(area.name.en);
        setAreaNameAr(area.name.ar);
        setAreaStatus(area.is_active ? 'true' : 'false');
        setCityId(area.city.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArea();
  }, [areaId])


  // Fetch city data
  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://tqneen-testing-be1-dot-tqneen-406411.ew.r.appspot.com/api/cities',
  //         {
  //           headers: {
  //             Authorization:
  //               'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs',
  //           },
  //         }
  //       );

  //       const citiesData = response.data.data;

  //       console.log("citeies request", response);


  //       const cityNames = citiesData.map((city) => city.name.en);
  //       setCities(cityNames);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCities();
  // }, []);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          'https://tqneen-testing-be1-dot-tqneen-406411.ew.r.appspot.com/api/cities',
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs',
            },
          }
        );

        const citiesData = response.data.data;
        setCities(citiesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  const handleUpdateArea = async (e) => {
    e.preventDefault();
    try {
      // const data = {
      //   name: {
      //     ar: areaNameAr,
      //     en: areaNameEn
      //   },
      //   is_active:  JSON.parse(areaStatus),
      //   city: cityId,
      // };

      const response = await axios.put(`https://tqneen-testing-be1-dot-tqneen-406411.ew.r.appspot.com/api/areas/${areaId}`, {
        name: {
          en: areaNameEn,
          ar: areaNameAr,
        },
        is_active: areaStatus === 'true',
        city: cityId,
      },
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs"
          }
        });

      // Handle the response as needed
      console.log("update", response.data);

      fetchData();

      // Close the edit area dialog
      onClose();
    } catch (error) {
      // Handle error
      console.error(error);
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
              <form >
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name='en'
                      fullWidth
                      label='Area name in English'
                      placeholder='Enter area name in English'
                      value={areaNameEn}
                      onChange={(event) => setAreaNameEn(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name='ar'
                      fullWidth
                      label='Area name in arabic'
                      placeholder='Enter area name in arabic'
                      value={areaNameAr}
                      onChange={(event) => setAreaNameAr(event.target.value)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <CustomTextField
                      name="city"
                      select
                      fullWidth
                      label="Select City"
                      value={cityId}
                      onChange={(event) => setCityId(event.target.value)}
                      required
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name.en} {/* or {city.name.ar} for Arabic name */}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField
                      select
                      fullWidth
                      label="Area Status"
                      value={areaStatus}
                      onChange={(event) => setAreaStatus(event.target.value)}
                      required
                    >
                      <MenuItem value="true">Active</MenuItem>
                      <MenuItem value="false">Inactive</MenuItem>
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
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdateArea}>
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
