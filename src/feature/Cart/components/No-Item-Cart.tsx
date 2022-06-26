import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface NoItemCartProps {}

export default function NoItemCart(props: NoItemCartProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > img': {
          width: {
            xs: '120px',
            sm: '108px',
            objectFit: 'cover',
          },
          height: {
            xs: '120px',
            sm: '98px',
          },
        },
      }}
    >
      <img src="/no_item.png" alt="No have anyone item" />
      <Typography
        sx={{
          color: 'rgba(0,0,0,.4)',
          fontSize: '14px',
          fontWeight: 'bold',
          mt: 2,
        }}
      >
        Your shopping cart is empty
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          p: 0,
          '& > a': {
            textDecoration: 'none',
            color: '#fff',
            py: 1,
            px: '22px',
            display: 'block',
          },
        }}
      >
        <Link to="/products">Go to shopping</Link>
      </Button>
    </Box>
  )
}
