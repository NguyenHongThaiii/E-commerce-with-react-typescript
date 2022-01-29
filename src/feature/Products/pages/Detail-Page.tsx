import { Box, Container, Grid, Paper, Theme } from '@mui/material'
import productsApi from 'api/productsApi'
import { addToCart } from 'app/authSlice'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import { InfoDetailSkeleton } from 'components/SkeletonsField/Info-Detail-Skeleton'
import Slide from 'components/Slide/Slide'
import { Cart, Product, QuantityState } from 'models'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import InfoProductDetail from '../components/Info-Product-Detail'
import PreviewImageDetail from '../components/Preview-Image-Detail'
import ProductDetailForm from '../components/Product-Detail-Form'

export interface DetailPageProps {}

export default function DetailPage(props: DetailPageProps) {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await productsApi.getById(productId as string)
        setProduct(response)
      } catch (error) {
        console.log('Fail to fetch product by id', error)
      }
      setLoading(false)
    })()
  }, [])

  const initialValues: QuantityState = {
    quantity: 1,
  }

  const handleOnSubmit = async ({ quantity }: QuantityState) => {
    const data: Cart = {
      quantity,
      id: (product as Product).id,
      product: product as Product,
    }
    const actions = addToCart(data)
    await dispatch(actions)
  }
  return (
    <Box>
      <Slide
        imageUrl="https://js-ecommerce-api.herokuapp.com/asset/img/category_slide_1.jpg"
        name={(product as Product)?.type}
      />
      <CurrentPosition
        current={(product as Product)?.name}
        positionList={[{ name: 'Products', href: '/products' }]}
        loading={loading}
      />

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
                  <ProductDetailForm onSubmit={handleOnSubmit} initialValues={initialValues} />
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
