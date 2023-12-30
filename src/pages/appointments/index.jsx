// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'
import { fetchData } from 'src/store/apps/invoice'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import baseUrl from 'src/API/apiConfig'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Button, MenuItem } from '@mui/material'
import { useAsync } from 'src/hooks/useAsync'
import { format } from 'date-fns'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))


// ** renders client column
const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor || 'primary'}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row.name || 'John Doe')}
    </CustomAvatar>
  )
}

const defaultColumns = [
  {
    flex: 0,
    field: 'id',
    minWidth: 100,
    headerName: 'ID',
    renderCell: ({ row }) => (
      <Typography component={LinkStyled} href={`/appointments/Profile/${row.id}`}>
        {`${row.id}`}
      </Typography>
    )
  },

  {
    flex: 0.15,
    field: 'lawyer',
    minWidth: 100,
    headerName: 'Lawyer',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {row.lawyer.full_name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {row.lawyer.toDate}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'customer',
    minWidth: 100,
    headerName: 'Customer',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {row.customer.full_name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {row.customer.phone}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 100,
    field: 'created data',
    headerName: 'Created Date',
    renderCell: ({ row }) => {
      const AppointmentData = new Date(row.createdAt).toLocaleString()

      return <Typography sx={{ color: 'text.primary' }}>{AppointmentData}</Typography>
    }
  },
  {
    flex: 0.12,
    minWidth: 100,
    field: 'status',
    headerName: 'status',
    renderCell: ({ row }) => {
      return row.status !== 0 ? (
        <Typography color=''>{row.status}</Typography>
      ) : (
        <CustomChip rounded size='small' skin='light' color='success' label='not active' />
      )
    }
  }
]

const AppointmentList = () => {
  // ** State
  const [pageSize] = useState(15)
  const [filters, setFilters] = useState({})

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={`/appointments/Profile/${row.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  const { data, execute, loading, status, error } = useAsync((params) => axios.get(
    `${baseUrl}/api/appointments`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs`
      },
      params: Object.assign({
        page: params?.page ?? 1,
        limit: pageSize,
      }
        , params?.filters ?? {})
    }
  ), { immediate: true })

  const handlePageChange = async (paginationData) => {
    console.log("handlePageChange", paginationData)

    await execute({ page: (paginationData?.page) + 1, pageSize: pageSize, filters })
  }

  if (error) {
    return <p>Error: {error}</p>
  }


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({

    mode: 'onChange',

  })


  const onSubmit = (data) => {
    console.log({ data })

    setFilters(Object.assign(
      data?.fromDate ? { from: format(data.fromDate, "yyyy-MM-dd") } : {},
      data?.toDate ? { to: format(data.toDate, "yyyy-MM-dd") } : {},
      data?.status ? { status: data?.status } : {}
    ))

    execute({
      page: 1, pageSize: pageSize, filters: Object.assign(
        data?.fromDate ? { from: format(data.fromDate, "yyyy-MM-dd") } : {},
        data?.toDate ? { to: format(data.toDate, "yyyy-MM-dd") } : {},
        data?.status ? { status: data?.status } : {}
      )
    })
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField inputRef={ref}  {...props} />
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={3} item xs={12} sm={4} >
                <Grid item xs={12} lg={4}>
                  <DatePickerWrapper display={"flex"} >
                    <Controller
                      name='fromDate'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          id='fromDate'
                          onChange={onChange}
                          selected={value}
                          autoComplete="off"
                          customInput={<CustomInput label="From" />}
                        />

                      )}
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <DatePickerWrapper display={"flex"} >
                    <Controller
                      rules={{
                        validate: (value, fields) => {
                          if (fields && fields?.fromDate && fields.fromDate > value)
                            return "from date must be less than to date"
                        }
                      }}
                      name='toDate'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          id='toDate'
                          onChange={onChange}
                          selected={value}
                          autoComplete="off"
                          customInput={<CustomInput label="To"
                            error={Boolean(errors.toDate)}
                            helperText={errors.toDate?.message}
                            {...(errors.toDate && { helperText: errors.toDate.message })}

                          />}
                        />

                      )}
                    />
                  </DatePickerWrapper>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, ...rest } }) => (
                      <CustomTextField
                        select
                        sx={{ mb: 4 }}
                        fullWidth
                        onChange={onChange}
                        label="Status"
                        {...rest}


                      >
                        <MenuItem  >

                        </MenuItem>
                        {["accepted", "rejected", "paid"].map((status) => (
                          <MenuItem key={status} value={status}>
                            {status.toUpperCase()}
                          </MenuItem>
                        ))}

                      </CustomTextField>
                    )}


                  />
                </Grid>

                <Grid item xs={12} lg={4} display={"flex"} alignItems={"end"}>
                  <Button type='submit' variant='contained'>Submit</Button>
                </Grid>



                {/* <Grid item xs={12} sm={4}>
                  <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
                </Grid> */}
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            loading={loading}
            autoHeight
            rowHeight={62}
            rows={data?.docs ?? []}
            columns={columns}
            checkboxSelection

            disableRowSelectionOnClick
            paginationModel={{ page: (data?.page ?? 1) - 1, pageSize: data?.limit ?? pageSize }}
            onPaginationModelChange={handlePageChange}
            pagination
            paginationMode='server'
            rowCount={data?.totalDocs}
            rowsPerPage={15}

          />
        </Card>
      </Grid>
    </Grid >
  )
}

export default AppointmentList
