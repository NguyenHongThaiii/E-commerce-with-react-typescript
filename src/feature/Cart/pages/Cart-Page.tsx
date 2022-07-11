import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material'
import { Dispatch } from '@reduxjs/toolkit'
import { db } from 'App'
import { clearYourCart } from 'app/authSlice'
import { RootState } from 'app/store'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import Slide from 'components/Slide/Slide'
import { CartProvider } from 'context/cart-context'
import firebase from 'firebase/compat/app'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Cart, CartUser } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { getCartListOfAccounts, handleRemoveCartItem, setCartListOfAccounts } from 'utils'
import NoItemCart from '../components/No-Item-Cart'
import PaymentProductCart from '../components/Payment-Product-Cart'
import ProductCartMobile from '../components/ProductCartMobile/Product-Cart-Mobile'
import TableProductCart from '../components/Table-Product-Cart'

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
  const user = useSelector((state: RootState) => state.auth.user)
  const currentUser = firebase.auth().currentUser
  const checkRef = useRef<boolean>(false)
  const [state, setState] = useState<Cart[]>([])
  if (!currentUser && !user.uid) {
    return <Navigate to="/" />
  }

  const cartList = useSelector((state: RootState) => state.auth.user.cartList)
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      const colRef = collection(db, 'e-commerce')
      const q = query(colRef, where('userID', '==', `${user.uid}`))
      const res = await getDocs(q)
      const temp: Cart[] = []
      res.docs.map((doc) => {
        temp.push(doc.data() as Cart)
      })
      const listUserForCartList = getCartListOfAccounts()
      const indexUser = listUserForCartList.findIndex((item: CartUser) => item.uid === user.uid)
      if (indexUser >= 0 && user.uid) {
        const result = [...listUserForCartList]
        result[indexUser].cartList = [...temp]
        setCartListOfAccounts(result)
        setState([...temp])
      }
      if (indexUser < 0 && user.uid) {
        const newUser: CartUser = {
          uid: user.uid,
          cartList: [...temp],
        }
        const result = [...listUserForCartList]
        result.push(newUser)
        setCartListOfAccounts(result)
        setState([...temp])
      }
    })()
    return () => {}
  }, [cartList])
  const handleClearAllCart = async (): Promise<any> => {
    const colRef = collection(db, 'e-commerce')
    const q = query(colRef, where('userID', '==', user.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach(async (doc) => {
      await handleRemoveCartItem(doc.data().id, user.uid, 'e-commerce')
    })
    setState((prev) => [])
    dispatch(clearYourCart())
    handleClose()
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOnClickRemove = (id: string | unknown) => {
    const newState = state.filter((item: Cart) => item.id !== id)
    setState(newState)
  }
  console.log(state)
  console.log(cartList)
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
        {state?.length > 0 || cartList.length > 0 ? (
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
                <TableProductCart
                  cartList={state.length > 0 ? state : cartList}
                  onClick={handleOnClickRemove}
                />
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
                <ProductCartMobile
                  cartList={state.length > 0 ? state : cartList}
                  onClick={handleOnClickRemove}
                />
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
                    p: 0,
                    '&>a': {
                      textDecoration: 'none',
                      color: '#fff',
                      py: '6px',
                      px: '16px',
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
