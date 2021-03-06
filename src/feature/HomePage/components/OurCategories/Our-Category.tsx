import { Box, Grid, Typography } from '@mui/material'
import categoriesApi from 'api/categoriesApi'
import { CategorySkeleton } from 'components/SkeletonsField'
import { Category, ListResponse } from 'models'
import React, { useEffect, useState } from 'react'
import CategoryItem from '../CategoryItem/Category-Item'

export interface OurCategoryProps {}

export default function OurCategory(props: OurCategoryProps) {
  const [state, setState] = useState<Category[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const { data }: ListResponse<Category> = await categoriesApi.getAll()
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
        Categories
      </Typography>
      <Typography
        sx={{
          color: 'rgb(135,135,135)',
          fontStyle: 'italic',
          fontFamily: `"Libre Baskerville", serif`,
          mb: 3,
        }}
      >
        All Categories
      </Typography>

      <Box>
        <Grid container spacing={2}>
          {state.length > 0 ? (
            state.map((category, index) => (
              <Grid key={category.id} item xs={6} md={4} lg={2}>
                <CategoryItem category={category} />
              </Grid>
            ))
          ) : (
            <CategorySkeleton length={6} />
          )}
        </Grid>
      </Box>
    </Box>
  )
}
