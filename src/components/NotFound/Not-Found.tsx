import { Box, Button } from '@mui/material'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface NotFoundProps {}

export default function NotFound(props: NotFoundProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        m: '24px auto',
        maxWidth: 1280,
      }}
    >
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="Not found page"
        width="100%"
      />

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          '& > a': {
            textDecoration: 'none',
            color: '#fff',
          },
        }}
      >
        <Link to="/products">Go to shopping</Link>
      </Button>
    </Box>
  )
}
