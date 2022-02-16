import { Box, Button } from '@mui/material'
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
            xs: '100%',
            sm: 'unset',
          },
        },
      }}
    >
      <img
        src="https://freepikpsd.com/file/2019/10/empty-cart-png-Transparent-Images.png"
        alt="No have anyone item"
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
