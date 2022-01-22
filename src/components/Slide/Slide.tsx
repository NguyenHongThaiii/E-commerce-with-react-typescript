import { Box, Typography } from '@mui/material'
import React from 'react'

export interface SlideProps {
  imageUrl: string
  name: string
}

export default function Slide({ imageUrl, name }: SlideProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <img src={imageUrl} alt={name} width="100%" height="150px" />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '7px',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Typography
          component="span"
          variant="h5"
          sx={{
            position: 'relative',
            fontWeight: '500',
            color: '#fff',
            fontFamily: `"Libre Baskerville",serif`,
            fontSize: '36px',
            fontStyle: 'italic',
            letterSpacing: 1,
            '&::after': {
              content: `""`,
              height: 2,
              width: 60,
              position: 'absolute',
              top: '50%',
              left: '-75px',
              backgroundColor: '#fff',
            },
            '&::before': {
              content: `""`,
              height: 2,
              width: 60,
              position: 'absolute',
              top: '50%',
              right: '-75px',
              backgroundColor: '#fff',
            },
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  )
}
