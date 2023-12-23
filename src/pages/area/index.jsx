import React from 'react'
import { useRouter } from 'next/router'

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
import EditArea from './editarea'
import AddArea from './addarea'
import { fetchData } from 'src/store/apps/user'

// ** Styled Components

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 100,
    headerName: 'ID',
    renderCell: ({ row }) => <Typography component={LinkStyled} href='#'>{`#${row.id}`}</Typography>
  },

  {
    flex: 0.2,
    minWidth: 100,
    field: 'en',
    headerName: 'area en',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name.en}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'ar',
    headerName: 'area ar',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name.ar}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'city',
    headerName: 'city',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.city.name.ar}</Typography>
  },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'isActive',
    headerName: 'isActive',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.is_active === true ? 'true' : 'false'}</Typography>
    )
  }
]

/* eslint-enable */
const Area = () => {
  // ** State
  const [data, setDates] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editAreaId, setEditAreaId] = useState(null)

  // Handle Edit dialog
  const handleAddClickOpen = () => setOpenAdd(true)
  const handleEditClickOpen = () => setOpenEdit(true)

  const router = useRouter()

  const handleEditClick = () => {
    router.push(`/area/editarea?id=${area.id}`)
  }

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
          setEditAreaId(id)
          setOpenEdit(true)
        }

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete area'>
              <IconButton size='small' sx={{ color: 'text.secondary' }}>
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton size='small' onClick={() => handleEditClick(row.id)}>
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

  const fetchData = async () => {
    try {
      const response = await axios.get('https://tqneen-testing-be1-dot-tqneen-406411.ew.r.appspot.com//api/areas', {
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
    fetchData()
  }, [])

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
              Add New area
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
      <AddArea
        open={openAdd}
        onClose={() => {
          setOpenAdd(false)
        }}
        fetchData={fetchData}
      />
      <EditArea
        open={openEdit}
        areaId={editAreaId}
        onClose={() => {
          setOpenEdit(false)
        }}
        fetchData={fetchData}
      />
    </Grid>
  )
}

export default Area
