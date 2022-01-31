import { Box, Grid } from '@mui/material'
import { Cart } from 'models'
import * as React from 'react'
import InfoProductCartMobile from './Info-Product-Cart-Mobile'

export interface ProductCartMobileProps {
  cartList: Cart[]
}

export default function ProductCartMobile({ cartList }: ProductCartMobileProps) {
  return (
    <Box>
      {cartList?.map((cart: Cart) => (
        <InfoProductCartMobile key={cart.id} cart={cart} />
      ))}
    </Box>
  )
}
