import { Grid, Skeleton } from '@mui/material'
import * as React from 'react'

export interface ProductSkeletonProps {
  length: number
}

export function ProductSkeleton({ length = 6 }: ProductSkeletonProps) {
  return (
    <>
      {Array.from(new Array(length)).map((category, index) => (
        <Grid key={index} item xs={6} md={4} lg={3}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: {
                xs: '173px',
                md: '375px',
                lg: '244px',
                borderRadius: 20,
              },
            }}
          />
          <Skeleton height={24} />
          <Skeleton height={24} />
        </Grid>
      ))}
    </>
  )
}
