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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { Button } from '@mui/material'

import axios from 'axios'

import AddCity from './addspecializations'
import EditSpecializations from './editspecializations'
import AddSpecializations from './addspecializations'
import baseUrl from 'src/API/apiConfig'

// import EditCity from './editcity'

// ** Styled Components

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const defaultColumns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 100,
    headerName: 'ID',
    renderCell: ({ row }) => <Typography component={LinkStyled} href='#'>{`#${row.id}`}</Typography>
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'specializationsAr',
    headerName: 'specializations en',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name.en} </Typography>
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'specializationsEn',
    headerName: 'specializations ar',
    renderCell: ({ row }) =>
    <Typography sx={{ display: 'flex', color: 'text.secondary' }}>
    {row.name.ar}
    </Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'Number of topics',
    headerName: 'Number of topics',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}> ({row.topics.length}) </Typography>
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'isActive',
    headerName: 'isActive',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.is_active === true ? 'active' : 'not active'}</Typography>
    )
  }
]

/* eslint-enable */
const Specializations = () => {
  // ** State
  const [data, setDates] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [SpecializationsId, setEditSpecializationsId] = useState(null)

  // Handle Edit dialog
  const handleAddClickOpen = () => setOpenAdd(true)
  const handleEditClickOpen = () => setOpenEdit(true)


  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        const handleEditClick = id => {
          setEditSpecializationsId(id)
          handleEditClickOpen();
        };

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete specializations'>
              <IconButton size='small' sx={{ color: 'text.secondary' }}>
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              {/* <Link href={`/editcityid/${row.id}`}> */}
                <IconButton size='small' onClick={() => handleEditClick(row.id)}>
                  <Icon icon='tabler:edit' />
                </IconButton>
              {/* </Link> */}
            </Tooltip>
          </Box>
        );
      },
    },
  ];


    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/specializations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = response.data
        setDates(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box
          sx={{
            py: 0,
            px: 0,
            display: 'flex',
            float: 'right'
          }}
        >
          <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap' }}>
            <Button variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleAddClickOpen}>
              <Icon fontSize='1.125rem' icon='tabler:plus' />
              Add New Specializations
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            pagination
            rowHeight={62}
            rows={data.data ?? []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}

            // onRowSelectionModelChange={rows => setSelectedRows(rows)}
          />
        </Card>
      </Grid>
      <AddSpecializations open={openAdd} onClose={() => {setOpenAdd(false)}} fetchData={fetchData} />
      <EditSpecializations open={openEdit} onClose={() => {setOpenEdit(false)}} SpecializationsId={SpecializationsId} fetchData={fetchData} />
    </Grid>
  )
}

export default Specializations
