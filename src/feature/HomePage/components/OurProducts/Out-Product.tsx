import { Box, Grid, Typography } from '@mui/material'
import productsApi from 'api/productsApi'
import { ProductSkeleton } from 'components/SkeletonsField'
import { ListResponse, Product } from 'models'
import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem/Product-Item'

export interface OurProductProps {}

export default function OurProduct(props: OurProductProps) {
  const [state, setState] = useState<Product[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const { data }: ListResponse<Product> = await productsApi.getAll({
          _page: 1,
          _limit: 12,
          trending: true,
        })
        setState(data)
      } catch (error) {
        console.log('Fail to fetch categories api', error)
      }
    })()
  }, [])

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
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
        Our Products
      </Typography>
      <Typography
        sx={{
          color: 'rgb(135,135,135)',
          fontStyle: 'italic',
          fontFamily: `"Libre Baskerville", serif`,
          mb: 3,
        }}
      >
        Top view in the week
      </Typography>

      <Box>
        <Grid container spacing={2}>
          {state.length > 0 ? (
            state.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))
          ) : (
            <ProductSkeleton length={12} />
          )}
        </Grid>
      </Box>
    </Box>
  )
}
