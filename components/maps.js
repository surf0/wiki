import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { useTheme } from 'next-themes'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { DataGrid, GridToolbar } from '@mui/x-data-grid'

import maps from '../data/maps'

import CustomizedDialogs from './map'

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

const Maps = () => {
  const [modal, setModal] = useState({ show: false, map: null })

  const openModal = (mapname) => {
    console.log(maps[mapname])
    setModal({ show: true, map: maps[mapname] })
  }

  const handleClose = () => {
    setModal({ show: false, data: '' })
  }

  const rows = Object.values(maps)

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,

      renderCell: (params) => (
        <Button variant="text" onClick={() => openModal(params.value)}>
          {params.value}
        </Button>
      ),
    },
    { field: 'tier', headerName: 'Tier' },

    { field: 'mapper', headerName: 'Mapper', width: 200 },
  ]

  const { theme, setTheme, systemTheme } = useTheme()
  const renderedTheme = theme === 'system' ? systemTheme : theme
  const mounted = useMounted()

  const muitheme = createTheme({
    palette: {
      mode: renderedTheme,
    },
  })

  return (
    <center>
      {mounted && (
        <ThemeProvider theme={muitheme}>
          <CustomizedDialogs
            handleClose={handleClose}
            show={modal.show}
            map={modal.map}
          />
          <Box sx={{ maxWidth: 'xl' }}>
            <Box sx={{ height: 800, width: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.name}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </center>
  )
}

export default Maps
