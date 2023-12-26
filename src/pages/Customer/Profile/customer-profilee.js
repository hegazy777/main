// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'


// ** Icon Imports

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'


// ** Utils Import
import { useRouter } from 'next/router'
import { useAsync } from 'src/hooks/useAsync'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { DialogContentText, TextField } from '@mui/material'



const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  notactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const CustomerView = () => {


  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },

  } = useForm({
    // defaultValues: { "city": 2 },
    mode: 'onSubmit',

  })


  const [areas, setAreas] = useState([]); // Add areas state

  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [data, setData] = useState('')
  const [cities, setCities] = useState([])
  const [customerData, setCustomerData] = useState(null);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const router = useRouter()
  const customerId = router.query.customerId
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAxMTYwNDI1fQ.JruvwV_Xqa1-jTXFk1osKrpzNzMMUVKnAdyC4H5Ei_M';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tqneen-rlyoguxn5a-uc.a.run.app/api/customer/customers/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCustomerData(response.data);
        setData(response.data)
      } catch (error) {
        // Handle error
      }
    };

    if (customerId) {
      fetchData();
    }
  }, [customerId]);



  console.log("data", customerData);

  const onSubmit = async (data) => {
    try {
      await axios.put(`https://tqneen-rlyoguxn5a-uc.a.run.app/api/admin/users/${customerId}`,data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      handleEditClose();
    } catch (error) {
      // Handle error
      debugger
    }
  };


  // useEffect(() => {
  //   if (router.query.customerId) {
  //     execute(router.query.customerId)
  //   }
  // }, [router]);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://tqneen-rlyoguxn5a-uc.a.run.app/api/cities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCities(response.data.data);
      } catch (error) {

      }
    };
    fetchCities();
  }, [])

  const fetchAreas = async (cityId) => {
    try {
      const response = await axios.get('https://tqneen-rlyoguxn5a-uc.a.run.app/api/cities/' + cityId, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      // Assuming the areas API returns an array of areas for the specified cityId
      return response.data.data.areas;
    } catch (error) {

      return [];

    }

  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setValue("city", cityId);
    if (cityId) {
      const areas = await fetchAreas(cityId);
      console.log(areas); // Log the areas variable to check its structure
      setValue("area_id", "");
      setAreas(areas);
    } else {
      setValue("area_id", "");
      setAreas([]);
    }
  };


  if (customerData) {
    return (
      <Grid container spacing={6} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={8} >
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
              {customerData.avatar ? (
                <CustomAvatar
                  src={customerData.avatar}
                  variant='rounded'
                  alt={customerData.full_name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={customerData.avatarColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {customerData.full_name}
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {customerData.full_name}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={customerData.is_active ? "Active" : "Not Active"}
                color={statusColors[customerData.is_active ? "active" : "notactive"]}

                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>
            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Customer More  information
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{customerData.first_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>phone:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{customerData.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>City / Area:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{customerData.area?.name?.en} / {customerData.area?.city?.name?.en}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Customer Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{customerData.address}</Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
            </CardActions>
            <Dialog
              open={openEdit}
              onClose={handleEditClose}
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
                Edit customer Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating customer details will receive a privacy audit.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name='first_name'
                    control={control}
                    rules={{ required: true }}
                    defaultValue={data?.first_name}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label='First Name'
                        onChange={onChange}
                        placeholder=''
                        error={Boolean(errors.first_name)}
                        {...(errors.first_name && { helperText: errors.first_name.message })}
                      />
                    )}
                  />
                  <Controller
                    name='last_name'
                    control={control}
                    rules={{ required: true }}
                    defaultValue={data?.last_name}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label='Last Name'
                        onChange={onChange}
                        placeholder=''
                        error={Boolean(errors.last_name)}
                        {...(errors.last_name && { helperText: errors.last_name.message })}
                      />
                    )}
                  />
                  <Controller
                    name='email'
                    control={control}
                    defaultValue={data?.email}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        type='email'
                        label='Email'
                        value={value}
                        sx={{ mb: 4 }}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder=''
                        {...(errors.email && { helperText: errors.email.message })}
                      />
                    )}
                  />
                  <Controller
                    name='address'
                    control={control}
                    defaultValue={data?.address}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label='address'
                        onChange={onChange}
                        placeholder=''
                        error={Boolean(errors.address)}
                        {...(errors.address && { helperText: errors.address.message })}
                      />
                    )}
                  />
                  <Controller
                    name='phone'
                    control={control}
                    defaultValue={data?.phone}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label='phone'
                        onChange={onChange}
                        placeholder=''
                        error={Boolean(errors.phone)}
                        {...(errors.phone && { helperText: errors.phone.message })}
                      />
                    )}
                  />
                  {/* .. City. */}
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={data?.city?.toLowerCase()}
                    render={({ field: { onChange, ...rest } }) => (
                      <TextField
                        select
                        sx={{ mb: 4 }}
                        fullWidth
                        label={data?.area?.city?.name?.en}
                        onChange={handleCityChange}
                        defaultValue={data?.city?.id}

                        {...rest}
                      >
                        <MenuItem value="" disabled>
                          Select an cities
                        </MenuItem>
                        {cities?.data?.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.name.en}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                  // rules={{ required: true }}

                  />
                  <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        sx={{ mb: 4 }}
                        fullWidth
                        label={data?.area?.name?.en}
                        defaultValue={areas}
                        {...field}
                      >
                        <MenuItem value="" disabled>
                          Select an Area
                        </MenuItem>
                        {data?.areas?.map((area) => (
                          <MenuItem key={area?.id} value={area?.id}>
                            {area?.name?.en}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name='is_active'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        sx={{ mb: 4 }}
                        label='is active'
                        id='validation-is_active-select'
                        error={Boolean(errors.is_active)}
                        aria-describedby='validation-is_active-select'
                        {...(errors.is_active && { helperText: errors.is_active.message })}
                        SelectProps={{ value: value, onChange: e => onChange(e) }}
                      >
                        <MenuItem value=''>is active</MenuItem>
                        <MenuItem value='true'>True</MenuItem>
                        <MenuItem value='false'>False</MenuItem>
                      </CustomTextField>
                    )}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                      Submit
                    </Button>
                    <Button variant='tonal' color='secondary' onClick={handleEditClose}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid >
    )
  } else {
    return null
  }
}

export default CustomerView
