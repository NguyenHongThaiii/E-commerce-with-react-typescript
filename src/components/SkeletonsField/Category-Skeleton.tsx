import { Grid, Skeleton } from '@mui/material'
import * as React from 'react'

export interface CategorySkeletonProps {
  length: number
}

export function CategorySkeleton({ length = 6 }: CategorySkeletonProps) {
  return (
    <>
      {Array.from(new Array(length)).map((category, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: {
                xs: '445px',
                md: '375px',
                lg: '244px',
                borderRadius: 20,
              },
            }}
          />
        </Grid>
      ))}
    </>
  )
}
