import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import { useTheme } from 'next-themes'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { DataGrid, GridToolbar } from '@mui/x-data-grid'

function secondsToDHM(seconds) {
  var d = Math.floor(seconds / (3600 * 24))
  var h = Math.floor((seconds % (3600 * 24)) / 3600)
  var m = Math.floor((seconds % 3600) / 60)
  return (d !== 0 ? d + 'd ' : '') + (h !== 0 ? h + 'h ' : '') + m + 'm'
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

const Maps = () => {
  const rows = []

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: (params) => (
        <strong>
          <Link href={'/map/' + params.value}>{params.value}</Link>
        </strong>
      ),
    },
    { field: 'tier', headerName: 'Tier' },

    { field: 'b_count', headerName: 'Bonuses' },
    { field: 'cp_count', headerName: 'Stages / CPs', width: 150 },
    { field: 'maptype', headerName: 'Map type' },
    {
      field: 'created',
      headerName: 'Created',
      width: 150,
      valueFormatter: ({ value }) => value.toDateString(),
    },
  ]

  const { theme, setTheme, systemTheme } = useTheme()
  const renderedTheme = theme === 'system' ? systemTheme : theme
  const mounted = useMounted()

  const muitheme = createTheme({
    palette: {
      mode: renderedTheme,
    },
  })

  console.log(renderedTheme)

  return (
    <center>
      {mounted && (
        <ThemeProvider theme={muitheme}>
          <Box sx={{ maxWidth: 'xl' }}>
            <Paper>
              <Box sx={{ height: 800, width: 1 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                  componentsProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </ThemeProvider>
      )}
    </center>
  )
}

export default Maps
