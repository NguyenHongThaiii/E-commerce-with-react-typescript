import { Box, Button, Grid, IconButton, Modal, Theme, Typography } from '@mui/material'
import { Cart } from 'models'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { totalProductListCost } from 'feature/Cart/Cart-Selector'
import { format, handleRemoveCartItem, handleSetQuantityFB } from 'utils'
import { Dispatch } from '@reduxjs/toolkit'
import { removeFromCart, setQuantity } from 'app/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'app/store'

export interface InfoProductCartMobileProps {
  cart: Cart
  onClick: (id: string | unknown) => void
}

export default function InfoProductCartMobile({ cart, onClick }: InfoProductCartMobileProps) {
  const totalPrice = useSelector(totalProductListCost)
  const currUser = useSelector((state: RootState) => state.auth.user)

  const [isTrigger, setIsTrigger] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch: Dispatch = useDispatch()
  const navigate = useNavigate()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  }

  const handleSetQuantity = async (cart: Cart) => {
    if (cart.quantity < 1 || cart.quantity > 20) return
    setIsTrigger(true)
    await handleSetQuantityFB(cart.id, currUser.uid, 'e-commerce', cart.quantity)
    dispatch(setQuantity(cart))
    setIsTrigger(false)
  }

  const handleOnRemove = async (id: string | unknown) => {
    await handleRemoveCartItem(id, currUser.uid, 'e-commerce')
    onClick(id)
    dispatch(removeFromCart(id))
    setOpen(false)
  }

  const handleToRedirectDetailPage = (id: string | unknown) => {
    navigate(`/products/${id}`)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container>
        <Grid item xs={4}>
          <Box
            sx={{
              height: '100%',
              p: 1,
              cursor: 'pointer',
            }}
            onClick={() => handleToRedirectDetailPage(cart.product.id)}
          >
            <img
              src={cart.product.imageUrl || 'https://via.placeholder.com/270'}
              alt={cart.product.name}
              width="100%"
              height="100%"
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ p: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 1,

                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {cart.product.name}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mb: 1, color: (theme: Theme) => theme.palette.error.light, fontWeight: 'bold' }}
            >
              {format(cart.product.price)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <IconButton
                disabled={cart.quantity === 1}
                onClick={() => handleSetQuantity({ ...cart, quantity: cart.quantity - 1 })}
                sx={{ color: `${isTrigger && '#ccc'}` }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{cart.quantity}</Typography>
              <IconButton
                disabled={cart.quantity === 20}
                onClick={() => handleSetQuantity({ ...cart, quantity: cart.quantity + 1 })}
                sx={{ color: `${isTrigger && '#ccc'}` }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                {format(totalPrice)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <IconButton
        sx={{ position: 'absolute', top: '-5px', right: '-5px', p: 0 }}
        onClick={handleOpen}
      >
        <HighlightOffTwoToneIcon />
      </IconButton>

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
    </Box>
  )
}
