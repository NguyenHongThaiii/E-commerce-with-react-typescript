import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Theme,
  Typography,
  Modal,
  Button,
} from '@mui/material'
import { Cart } from 'models'
import React, { useRef, useState } from 'react'
import { format } from 'utils'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { removeFromCart, setQuantity } from 'app/authSlice'
import { useNavigate } from 'react-router-dom'

export interface InfoProductCartProps {
  cart: Cart
}

export default function InfoProductCart({ cart }: InfoProductCartProps) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch: Dispatch = useDispatch()
  const navigate = useNavigate()
  const timeRef = useRef<any>(null)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  }

  const handleSetQuantity = (cart: Cart) => {
    if (cart.quantity < 1 || cart.quantity > 20) return

    dispatch(setQuantity(cart))
  }

  const handleOnRemove = (id: string | unknown) => {
    dispatch(removeFromCart(id))
    setOpen(false)
  }

  const handleToRedirectDetailPage = (id: string | unknown) => {
    navigate(`/products/${id}`)
  }

  return (
    <>
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
              cursor: 'pointer',

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
            onClick={() => handleToRedirectDetailPage(cart.product.id)}
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
        <TableCell size="medium" sx={{ minWidth: '140px' }}>
          <Box>
            <IconButton
              disabled={cart.quantity === 1}
              onClick={() => handleSetQuantity({ ...cart, quantity: cart.quantity - 1 })}
            >
              <RemoveIcon />
            </IconButton>
            <Typography component="span" sx={{ display: 'inline-block', minWidth: '25px' }}>
              {cart.quantity}
            </Typography>
            <IconButton
              disabled={cart.quantity === 20}
              onClick={() => handleSetQuantity({ ...cart, quantity: cart.quantity + 1 })}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </TableCell>
        <TableCell
          sx={{
            color: (theme: Theme) => theme.palette.error.light,
            fontWeight: 'bold',
            minWidth: '128px',
          }}
        >
          {format(cart.product.price * cart.quantity)}
        </TableCell>
        <TableCell size="medium">
          <IconButton onClick={handleOpen}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Are you sure you want to delete this product? This action can not be undone.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', align: 'center', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={() => handleOnRemove(cart.id)}>
              Remove
            </Button>
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
