import { Box, Button, Grid, Modal, Paper, Theme, Typography } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { clearYourCart } from 'app/authSlice'
import { RootState } from 'app/store'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import Slide from 'components/Slide/Slide'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NoItemCart from '../components/No-Item-Cart'
import PaymentProductCart from '../components/Payment-Product-Cart'
import ProductCartMobile from '../components/ProductCartMobile/Product-Cart-Mobile'
import TableProductCart from '../components/Table-Product-Cart'

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
  const cartList = useSelector((state: RootState) => state.auth.user.cartList)
  const dispatch: Dispatch = useDispatch()

  const handleClearAllCart = (): void => {
    dispatch(clearYourCart())
    handleClose()
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  return (
    <Box>
      <Slide
        imageUrl={`${import.meta.env.VITE_TS_PATH}/asset/img/category_slide_1.jpg`}
        name="Carts"
      />
      <CurrentPosition current="Carts" />

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          component="span"
          variant="h5"
          sx={{
            position: 'relative',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            '&::after': {
              content: `""`,
              height: 2,
              width: 60,
              position: 'absolute',
              top: '50%',
              left: '-75px',
              backgroundColor: '#000',
            },
            '&::before': {
              content: `""`,
              height: 2,
              width: 60,
              position: 'absolute',
              top: '50%',
              right: '-75px',
              backgroundColor: '#000',
            },
          }}
        >
          YOUR CART ITEMS
        </Typography>
        <Typography
          sx={{
            color: 'rgb(135,135,135)',
            fontStyle: 'italic',
            fontFamily: `"Libre Baskerville", serif`,
            mb: 3,
          }}
        >
          Shop today's deals
        </Typography>
      </Box>

      <Box sx={{ maxWidth: '1280px', m: '0 auto', px: 1.5 }}>
        {cartList?.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                <TableProductCart cartList={cartList} />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'none',
                  },
                }}
                component={Paper}
              >
                <ProductCartMobile cartList={cartList} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    '&>a': {
                      textDecoration: 'none',
                      color: '#fff',
                      fontSize: {
                        xs: 12,
                        sm: 14,
                      },
                    },
                  }}
                >
                  <Link to="/products">Continue Shopping </Link>
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleOpen}
                  sx={{
                    fontSize: {
                      xs: 12,
                      sm: 14,
                    },
                  }}
                >
                  Clear Your Cart
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} lg={4}>
              <PaymentProductCart />
            </Grid>
          </Grid>
        ) : (
          <NoItemCart />
        )}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Are you sure you want to delete all product? This action can not be undone.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', align: 'center', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleClearAllCart}>
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
