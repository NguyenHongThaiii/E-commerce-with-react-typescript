import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import { Product } from 'models'
import * as React from 'react'
import { format } from 'utils'

export interface InfoProductDetailProps {
  product: Product
}

export default function InfoProductDetail({ product }: InfoProductDetailProps) {
  return (
    <Box>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: {
            xs: '500',
          },
          fontSize: {
            xs: 20,
            sm: 28,
          },
        }}
      >
        {product.name}
      </Typography>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        {format(product.price as number)}
      </Typography>
      <Typography
        component="h4"
        variant="h6"
        sx={{
          fontSize: '16px',
          fontWeight: '400',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '4' /* number of lines to show */,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.description}
      </Typography>
    </Box>
  )
}
