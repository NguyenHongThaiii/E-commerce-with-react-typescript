import { Box, Button, Container, Grid, Modal, Paper, Theme, Typography } from '@mui/material'
import productsApi from 'api/productsApi'
import { addToCart } from 'app/authSlice'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import NotFound from 'components/NotFound/Not-Found'
import { InfoDetailSkeleton } from 'components/SkeletonsField/Info-Detail-Skeleton'
import Slide from 'components/Slide/Slide'
import { Cart, Product, QuantityState } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import InfoProductDetail from '../components/Info-Product-Detail'
import PreviewImageDetail from '../components/Preview-Image-Detail'
import ProductDetailForm from '../components/Product-Detail-Form'
import firebase from 'firebase/compat/app'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from 'App'
import { RootState } from 'app/store'
import { handleGetItemFromFB, handleSetQuantityFB } from 'utils'

export interface DetailPageProps {}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

const ToastifyUI = () => (
  <Box
    sx={{
      color: '#333',
      '& > a': {
        textDecoration: 'none',
        color: (theme: Theme) => theme.palette.primary.light,
        fontSize: 16,
        py: 2,
      },
    }}
  >
    <Typography sx={{}}>🦄 You have placed your order successfully.</Typography>

    <Link to="carts">Click here to view!</Link>
  </Box>
)

export default function DetailPage(props: DetailPageProps) {
  const currUser = useSelector((state: RootState) => state.auth.user)
  const { productId } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await productsApi.getById(productId as string)
        setProduct(response)
      } catch (error) {
        console.log('Fail to fetch product by id', error)
        setNotFound(true)
      }
      setLoading(false)
      ;(scrollRef.current as HTMLDivElement).scrollIntoView({
        behavior: 'smooth',
      })
    })()
  }, [productId])

  const initialValues: QuantityState = {
    quantity: 1,
  }

  const handleOnSubmit = async ({ quantity }: QuantityState) => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user: any) => {
      if (!user) {
        handleOpen()
        return
      }

      const data: Cart = {
        quantity,
        id: (product as Product).id,
        product: product as Product,
        userID: currUser?.uid,
      }
      const actions = addToCart(data)
      const colRef = collection(db, 'e-commerce')

      const querySnapshot = await handleGetItemFromFB(
        (product as Product).id,
        currUser.uid,
        'e-commerce'
      )
      if (querySnapshot.docs.length <= 0) {
        addDoc(colRef, data)
      } else {
        handleSetQuantityFB(
          (product as Product).id,
          currUser.uid,
          'e-commerce',
          Number.parseInt(querySnapshot.docs[0].data().quantity) + +quantity
        )
        // const colRefUpdate = doc(db, 'e-commerce', querySnapshot.docs[0].id)
        // await updateDoc(colRefUpdate, {
        //   quantity: querySnapshot.docs[0].data().quantity + quantity,
        // })
      }
      await dispatch(actions)

      toast(<ToastifyUI />)
    })
    return () => unregisterAuthObserver()
  }

  if (notFound) return <NotFound />

  return (
    <Box>
      <Slide
        imageUrl={`${import.meta.env.VITE_TS_PATH}/asset/img/category_slide_1.jpg`}
        name={(product as Product)?.type}
      />
      <Box ref={scrollRef}>
        <CurrentPosition
          current={(product as Product)?.name}
          positionList={[{ name: 'Products', href: '/products' }]}
          loading={loading}
        />
      </Box>
      <Box>
        <Container sx={{ mt: 8 }}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <PreviewImageDetail product={product || ({} as Product)} loading={loading} />
              </Grid>
              <Grid item xs={12} md={6}>
                {loading ? (
                  <InfoDetailSkeleton />
                ) : (
                  <>
                    <InfoProductDetail product={product || ({} as Product)} />
                    <ProductDetailForm
                      onSubmit={handleOnSubmit}
                      initialValues={initialValues}
                      product={product || ({} as Product)}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            You have not logged into your account. Please login to continue purchasing the product.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                p: 0,
                '& > a': {
                  p: '6px 16px ',
                  textDecoration: 'none',
                  color: '#fff',
                },
              }}
            >
              <Link to="/login">Login</Link>
            </Button>

            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
