import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Category } from '../../../../models/category'

export interface CategoryItemProps {
  category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`products?type=${category.name}`)
  }
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <img src={category.imageUrl} alt={category.name} width="100%" />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0,0.2)',
        }}
      >
        <Box>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: 3,
              fontSize: {
                xs: 48,
                sm: 40,
                md: 32,
              },
            }}
            component="h4"
            variant="h6"
          >
            {category.name}
          </Typography>
          <Button variant="contained" size="medium" onClick={handleOnClick}>
            Go now!
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
