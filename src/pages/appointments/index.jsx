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
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridRow } from '@mui/x-data-grid'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import baseUrl from 'src/API/apiConfig'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Spacing from 'src/@core/theme/spacing'
import { Button } from '@mui/material'
import { useAsync } from 'src/hooks/useAsync'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** Vars
const userStatusObj = {
  rejected: 'success',
  pending: 'primary',
  false: 'secondary'
}

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
              {row.lawyer.phone}
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
/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const AppointmentList = () => {
  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  // const [endDateRange, setEndDateRange] = useState(null)
  // const [selectedRows, setSelectedRows] = useState([])
  // const [startDateRange, setStartDateRange] = useState(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15, total: 0 })
  const [error, setError] = useState(null)
  // const [data, setData] = useState([])
  // const [count, setCount] = useState(0)
  // const [page, setPage] = useState(0)

  // ** Hooks
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      fetchData({
        dates,
        q: value,
        status: statusValue
      })
    )
  }, [dispatch, statusValue, value, dates])

  const handleFilter = val => {
    setValue(val)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

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

  const { data, execute, loading, status } = useAsync((params = { page: paginationModel.page + 1, limit: paginationModel.limit }) => axios.get(
    `${baseUrl}/api/appointments`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs`
      },
      params: {
        page: params.page ?? paginationModel.page + 1, // Use the correct page parameter
        limit: params.limit ?? paginationModel.limit
      }
    }
  ), { immediate: true })
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token =
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs'

  //       const headers = {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAyMzY2NDE0fQ.3bOsxc0tjcOThhsmUaUsw6lNIumDWp3H9sC8FjU1bcs`
  //       }

  //       const response = await

  //         setCount(response.data.totalDocs)
  //       setData(response.data.docs)
  //       setPage(response.data.totalPages)
  //     } catch (error) {
  //       console.error(error)
  //       setError(error.message)
  //     }
  //   }

  //   fetchData()
  // }, [paginationModel])

  const handlePageChange = async (data) => {
    console.log("handlePageChange", data)

    execute({ page: (data.page) + 1, limit: data.pageSize })
    // const newPage = params.page + 1 // Add 1 to match your backend page indexing

    // setPaginationModel(prevState => ({
    //   ...prevState,
    //   page: newPage
    // }))
  }

  if (error) {
    return <p>Error: {error}</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  const {
    reset,
    control,
    setValue: setFormValue,
    setError: setFormError,
    handleSubmit,
    formState: { errors },

  } = useForm({

    mode: 'onChange',

  })

  const onSubmit = () => {
    alert("submit")
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    console.log({ props })
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

                    <DatePicker
                      selected={new Date()}
                      id='from-date'
                      customInput={<CustomInput label="From" />}
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <DatePickerWrapper display={"flex"} >

                    <DatePicker
                      selected={new Date()}
                      id='to-date'
                      customInput={<CustomInput label="To" />}
                    />
                  </DatePickerWrapper>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Button type='submit'>Submit</Button>
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
            paginationModel={{ page: data?.page - 1, pageSize: data?.limit }}
            onPaginationModelChange={handlePageChange}
            onRowSelectionModelChange={rows => setSelectedRows()}
            pagination
            rowsPerPageOptions={[10, 30, 50, 70, 100]}
            paginationMode='server'
            // onPageChange={handlePageChange}
            rowCount={data?.totalDocs}
            page={data?.totalPages}
            // rowsPerPage={Number(paginationModel.limit)}
            pageSize={data?.totalPages}
          />
        </Card>
      </Grid>
    </Grid >
  )
}

export default AppointmentList
