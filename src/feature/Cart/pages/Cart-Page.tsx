import { Box, Button, Grid, Paper, Theme, Typography } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { clearYourCart } from 'app/authSlice'
import { RootState } from 'app/store'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import Slide from 'components/Slide/Slide'
import * as React from 'react'
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
  }
  return (
    <Box>
      <Slide
        imageUrl="https://js-ecommerce-api.herokuapp.com/asset/img/category_slide_1.jpg"
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

      <Box sx={{ maxWidth: '1280px', m: '0 auto' }}>
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
                  my: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    '&>a': {
                      textDecoration: 'none',
                      color: '#fff',
                    },
                  }}
                >
                  <Link to="/products">Continue Shopping </Link>
                </Button>
                <Button color="error" variant="contained" onClick={handleClearAllCart}>
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
    </Box>
  )
}
