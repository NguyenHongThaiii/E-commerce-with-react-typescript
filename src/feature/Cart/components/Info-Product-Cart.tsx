import { Box, IconButton, TableCell, TableRow, Theme, Typography } from '@mui/material'
import { Cart } from 'models'
import * as React from 'react'
import { format } from 'utils'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { removeFromCart, setQuantity } from 'app/authSlice'

export interface InfoProductCartProps {
  cart: Cart
}

export default function InfoProductCart({ cart }: InfoProductCartProps) {
  const dispatch: Dispatch = useDispatch()
  const handleSetQuantity = (cart: Cart) => {
    dispatch(setQuantity(cart))
  }
  const handleOnRemove = (id: string | unknown) => {
    dispatch(removeFromCart(id))
  }
  return (
    <TableRow
      sx={{
        '& > td': {
          textAlign: 'center',
        },
        '& > td:first-of-type': {
          textAlign: 'left',
        },
        '& > td:last-of-type': {
          textAlign: 'right',
        },
      }}
    >
      <TableCell size="medium">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',

            '& > img': {
              width: {
                lg: 60,
                xs: 80,
              },
              height: {
                lg: 80,
                xs: 100,
              },
            },
          }}
        >
          <img src={cart.product.imageUrl} alt={cart.product.name} width="40px" />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: 1,
            }}
          >
            <Typography
              sx={{
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                fontWeight: 500,
              }}
            >
              {cart.product.name}
            </Typography>

            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',

                fontSize: '13px',
              }}
            >
              {cart.product.description}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          color: (theme: Theme) => theme.palette.primary.light,
          fontWeight: 'bold',
        }}
      >
        {format(cart.product.price)}
      </TableCell>
      <TableCell size="medium" sx={{ width: '125px' }}>
        <Box>
          <IconButton onClick={() => handleSetQuantity({ ...cart, quantity: cart.quantity - 1 })}>
            <RemoveIcon />
          </IconButton>
          <Typography component="span">{cart.quantity}</Typography>
          <IconButton onClick={() => handleSetQuantity({ ...cart, quantity: cart.quantity + 1 })}>
            <AddIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          color: (theme: Theme) => theme.palette.error.light,
          fontWeight: 'bold',
        }}
      >
        {format(cart.product.price * cart.quantity)}
      </TableCell>
      <TableCell size="medium">
        <IconButton onClick={() => handleOnRemove(cart.id)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
