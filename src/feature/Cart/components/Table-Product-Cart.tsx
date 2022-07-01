import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Cart } from 'models'
import * as React from 'react'
import InfoProductCart from './Info-Product-Cart'

export interface TableProductCartProps {
  cartList: Cart[]
  onClick: (id: string | unknown) => void
}

export default function TableProductCart({ cartList, onClick }: TableProductCartProps) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name Product</TableCell>
              <TableCell align="center" sx={{ minWidth: '100px' }}>
                Until Price
              </TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartList?.map((cart: Cart) => (
              <InfoProductCart cart={cart} key={cart.id} onClick={onClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
