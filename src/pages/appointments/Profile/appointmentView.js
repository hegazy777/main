// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { useAsync } from 'src/hooks/useAsync'
import { useRouter } from 'next/router'
import axios from 'axios'

const data = {
  id: 1,
  role: 'Lawyer',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  accepted: 'Manual - Cash',
  contact: '(479) 232-9151',
  avatar: '/images/avatars/3.png'
}

const roleColors = {
  admin: 'error',
  rejected: 'error',

  // accepted: 'info',

  accepted: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}



const UserViewLeft = () => {


  const router = useRouter()

  console.log(router);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAxNTk1OTc4fQ.m_FHMEoXEAhn6WE3TkroNyZIClCZLz-vuJaA2JMoHqs';

  const { data, loading, execute } = useAsync((appiontd) => axios.get(`https://tqneen-testing-be1-dot-tqneen-406411.ew.r.appspot.com/api/appointments/${appiontd}`, { headers: { Authorization: `Bearer ${token}` } }), { immediate: false })

  useEffect(() => {
    if (router.query.appiontd) {
      execute(router.query.appiontd)
    }
  }, [router]);

  console.log("router", router.query.appiontd);


  // ** States

  console.log("Appointment", data);

  if (data) {
    return (
      <Grid container spacing={12}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
              {data.customer.avatar ? (
                <CustomAvatar
                  src={data.customer.avatar}
                  variant='rounded'
                  alt={data.customer.full}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {data.customer.full_name}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.customer.type}
                color={roleColors[data.role]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>
            <Divider sx={{ my: '0 !important', mx: 6 }} />
            <CardContent sx={{ pb: 4 }}>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 , alignItems:'center'  }}>
                  <Typography sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary'  , textAlign:'center'}}>Appointment  Number :</Typography>
                  <Typography sx={{ color:'text.secondary' }}> {data.id} </Typography>
                </Box>
                <Box sx={{  mb: 3, mr: 2, fontWeight: 'bold', color: 'text.secondary '}}>
                  <Typography sx={{ fontWeight: 'bold', color: 'text.secondary '}} color={roleColors[data.status]} >Appointment Status : {data.status}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary '}}>Created at:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{new Date(data.createdAt).toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary '}}>Topic:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.topic.name.en} { }</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary ' }}>fees:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.fees}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary ' }}>Phone Number: </Typography>
                    <Typography >{data.customer.phone} </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary ' }}>Description: <Typography>{data.description} </Typography></Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
              {data.avatar ? (
                <CustomAvatar
                  src={data.lawyer.avatar}
                  variant='rounded'
                  alt={data.lawyer.full_name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {data.lawyer.full_name}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.lawyer.type}
                color={roleColors[data.status]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>
            {/* customer */}
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
