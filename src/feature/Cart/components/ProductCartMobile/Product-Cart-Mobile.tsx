import { Box } from '@mui/material'
import { Cart } from 'models'
import * as React from 'react'
import InfoProductCartMobile from './Info-Product-Cart-Mobile'

export interface ProductCartMobileProps {
  cartList: Cart[]
  onClick: (id: string | unknown) => void
}

export default function ProductCartMobile({ cartList, onClick }: ProductCartMobileProps) {
  return (
    <Box>
      {cartList?.map((cart: Cart) => (
        <InfoProductCartMobile key={cart.id} cart={cart} onClick={onClick} />
      ))}
    </Box>
  )
}
