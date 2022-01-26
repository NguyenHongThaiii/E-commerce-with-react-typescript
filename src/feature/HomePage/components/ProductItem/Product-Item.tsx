import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Product } from 'models'
import { format } from 'utils'
import { useNavigate } from 'react-router-dom'
export interface ProductItemProps {
  product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
  const [heart, setHeart] = useState(false)
  const navigate = useNavigate()
  const handleToDetailPage = () => {
    setTimeout(() => {
      navigate(`/products/${product.id}`)
    }, 500)
  }
  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative' }} onClick={handleToDetailPage}>
        <Box
          sx={{
            // height: {
            //   lg: 276,
            //   md: 293,
            //   sm: 398,
            //   xs: 506,
            // },
            // borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <img src={product.imageUrl} alt={product.name} width="100%" />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 6,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0,0.2)',
              borderRadius: '16px 16px 0 0',

              '& > button': {
                color: '#fff',
              },
            },
          }}
        >
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton onClick={() => setHeart((heart) => !heart)}>
            {!heart ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: '#fff', mt: '-6px', textAlign: 'center' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            px: 1,
            textTransform: 'uppercase',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1' /* number of lines to show */,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        <Typography>{format(product.price)}</Typography>
      </Box>
    </Box>
  )
}
