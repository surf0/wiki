import * as React from 'react'

import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export async function getStaticProps() {
  const file = await fetch('../data/maps.json')
  const jsonData = file.json()
  return {
    maps: jsonData,
  }
}

const CustomizedDialogs = (props) => {
  const map = props.map

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.show}
      maxWidth="lg"
    >
      {map == null ? (
        <p>Loading...</p>
      ) : (
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleClose}
          >
            {map.name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box sx={{ padding: 2 }}>
              <img
                src={
                  'https://raw.githubusercontent.com/Sayt123/SurfMapPics/Maps-and-bonuses/csgo/' +
                  map.goname +
                  '.jpg'
                }
                alt={map.name}
              ></img>
              <Box sx={{ padding: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    Mapper: <strong>{map.mapper}</strong>
                    <br></br>
                    Tier {map.tier}
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ padding: 2 }}>
                <h2 className="text-3xl">Records</h2>
                <Button
                  variant="contained"
                  href={'https://surfheaven.eu/map/' + map.goname}
                  target="_blank"
                  rel="noopener"
                >
                  Surfheaven
                </Button>
              </Box>
              {map.howto !== '' && (
                <Box sx={{ padding: 2 }}>
                  <h2 className="text-3xl">How to Video</h2>
                  <iframe
                    width="100%"
                    height="430"
                    src={'https://www.youtube.com/embed/' + map.howto}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              )}
              {Object.keys(map.wr).length !== 0 && (
                <Box sx={{ padding: 2 }}>
                  <h2 className="text-3xl">WR</h2>
                  <Card sx={{ margin: 2, padding: 2 }}>
                    <PersonIcon /> Surfed by {map.wr.player}
                  </Card>
                  <iframe
                    width="100%"
                    height="430"
                    src={'https://www.youtube.com/embed/' + map.wr.video_id}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <Card sx={{ margin: 2, padding: 2, whiteSpace: 'pre-wrap' }}>
                    {map.wr.info}
                  </Card>
                </Box>
              )}
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default CustomizedDialogs
