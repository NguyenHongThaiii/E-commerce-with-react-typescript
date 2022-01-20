import { Box, Container, Grid, Pagination, Paper, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productsApi from '../../../api/productsApi'
import { ListResponse, Product, PaginationParams, Category, ListParams } from '../../../models'
import ProductItem from '../../HomePage/components/ProductItem/Product-Item'
import queryString from 'query-string'
import CurrentPosition from '../../../components/CurrentPostiton/Current-Position'
import categoriesApi from '../../../api/categoriesApi'
import ProductListFilter from '../components/Product-List-Filter'
export interface ListPageProps {}

export default function ListPage(props: ListPageProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [productList, setProductList] = useState<Product[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [pagination, setPagination] = useState<PaginationParams>({
    _page: 1,
    _limit: 12,
    _totalRows: 1,
  })
  const filters = useMemo(() => {
    const params = queryString.parse(location.search)
    const queryParams = {
      _page: 1,
      _limit: 12,
      ...params,
    }
    return queryParams
  }, [location.search])

  useEffect(() => {
    ;(async () => {
      try {
        const { data, pagination }: ListResponse<Product> = await productsApi.getAll(filters)
        setProductList(data)
        setPagination(pagination)
        // navigate({
        //   pathname: location.pathname,
        //   search: queryString.stringify({ ...filters }),
        // })
      } catch (error) {
        console.log('Fail to fetch product list', error)
      }
    })()
  }, [filters])

  useEffect(() => {
    ;(async () => {
      try {
        const { data }: ListResponse<Category> = await categoriesApi.getAll()
        setCategoryList(data)
      } catch (error) {
        console.log('Fail to fetch category list', error)
      }
    })()
  }, [])

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    const newFilter = {
      ...filters,
      _page: page,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({ ...newFilter }),
    })
  }

  const handleOnChange = (newFilters: ListParams) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({ ...filters, ...newFilters }),
    })
  }
  return (
    <Box
      sx={{
        // backgroundColor: '#fff',
        mt: 8,
      }}
    >
      <CurrentPosition current="Products" />

      <Container>
        <Paper sx={{ p: 2 }} elevation={1}>
          <Box sx={{ textAlign: 'center' }}>
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
              All
            </Typography>
            <Typography
              sx={{
                color: 'rgb(135,135,135)',
                fontStyle: 'italic',
                fontFamily: `"Libre Baskerville", serif`,
                mb: 3,
              }}
            >
              A place filled with outstanding styles
            </Typography>
          </Box>

          {/* Filters */}
          <Box sx={{ my: 2 }}>
            <ProductListFilter categoryList={categoryList} onChange={handleOnChange} />
          </Box>
          {/* Listing */}
          <Grid container spacing={2}>
            {productList.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>

          {/* pagination */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              mt: 3,
            }}
          >
            <Pagination
              page={pagination._page}
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              color="primary"
              size="large"
              onChange={handlePageChange}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
