import { Box, Grid, Paper, Typography } from '@mui/material'
import { RootState } from 'app/store'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import Slide from 'components/Slide/Slide'
import * as React from 'react'
import { useSelector } from 'react-redux'
import NoItemCart from '../components/No-Item-Cart'
import PaymentProductCart from '../components/Payment-Product-Cart'
import ProductCartMobile from '../components/ProductCartMobile/Product-Cart-Mobile'
import TableProductCart from '../components/Table-Product-Cart'

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
  const cartList = useSelector((state: RootState) => state.auth.user.cartList)
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
