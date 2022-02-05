import { Box, Button, Paper, Theme, Typography } from '@mui/material'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { format } from 'utils'
import { totalProductListCost, totalProductListQuantity } from '../Cart-Selector'

export interface PaymentProductCartProps {}

export default function PaymentProductCart(props: PaymentProductCartProps) {
  const totalCost = useSelector(totalProductListCost)
  const totalQuantity = useSelector(totalProductListQuantity)

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography component="h2" variant="h6" sx={{ borderBottom: '1px solid #0000001f', pb: 1 }}>
        Cart Total
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          borderBottom: '1px solid #0000001f',
        }}
      >
        <Typography>Total Products</Typography>
        <Typography
          sx={{ color: (theme: Theme) => theme.palette.primary.main, fontWeight: 'bold' }}
        >
          {totalQuantity}
        </Typography>
      </Box>
      <Box
        sx={{
          py: 2,
          borderBottom: '1px solid #0000001f',
        }}
      >
        <Typography>Choose your shipping options</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1,
        }}
      >
        <Typography component="h2" variant="h6">
          Total Price
        </Typography>
        <Typography sx={{ color: (theme: Theme) => theme.palette.error.light, fontWeight: 'bold' }}>
          {format(totalCost)}
        </Typography>
      </Box>
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        sx={{ mt: 1, backgroundColor: (theme: Theme) => theme.palette.primary.dark }}
      >
        Proceed to checkout
      </Button>
    </Box>
  )
}
