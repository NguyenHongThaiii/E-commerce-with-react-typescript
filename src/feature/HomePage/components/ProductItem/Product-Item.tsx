import { Box, IconButton, Theme, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Product } from 'models'
import { format } from 'utils'
import { useNavigate } from 'react-router-dom'
import { MouseEvent } from 'react'
export interface ProductItemProps {
  product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
  const [heart, setHeart] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleToDetailPage = (): void => {
    setTimeout(() => {
      navigate(`/products/${product.id}`)
    }, 500)
  }

  const handleToTypeProduct = (e: MouseEvent): void => {
    e.stopPropagation()
    navigate(`/products?type=${product.type}`)
  }

  const handleClickHeart = (e: MouseEvent): void => {
    e.stopPropagation()
    setHeart((heart: boolean) => !heart)
  }

  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 100 }} onClick={handleToDetailPage}>
        <Box
          sx={{
            lineHeight: 0,
            '& > img': {
              minHeight: {
                xs: '172px',
                md: '275px',
              },
            },

            overflow: 'hidden',
          }}
        >
          <img
            src={product.imageUrl || 'https://via.placeholder.com/270'}
            alt={product.name}
            width="100%"
          />
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
          <IconButton onClick={handleToTypeProduct}>
            <SearchIcon />
          </IconButton>

          <IconButton onClick={handleClickHeart}>
            {!heart ? (
              <FavoriteBorderIcon
                sx={{
                  zIndex: 1000,
                }}
              />
            ) : (
              <FavoriteIcon
                sx={{
                  zIndex: 1000,
                  color: '#e91e63',
                }}
              />
            )}
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
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
        <Typography>{format(product.price)} - Dollars</Typography>
      </Box>
    </Box>
  )
}
