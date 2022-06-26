import { Box, Container, Grid, Pagination, Typography } from '@mui/material'
import categoriesApi from 'api/categoriesApi'
import productsApi from 'api/productsApi'
import CurrentPosition from 'components/CurrentPostiton/Current-Position'
import NotFound from 'components/NotFound/Not-Found'
import { ProductSkeleton } from 'components/SkeletonsField'
import Slide from 'components/Slide/Slide'
import ProductItem from 'feature/HomePage/components/ProductItem/Product-Item'
import { Category, ListParams, ListResponse, PaginationParams, Product } from 'models'
import queryString from 'query-string'
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductListFilter from '../components/Product-List-Filter'

export interface ListPageProps {}

export default function ListPage(props: ListPageProps) {
  const location = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [productList, setProductList] = useState<Product[]>()
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

  const indexCategory = useMemo(() => {
    return categoryList.findIndex(
      (category: Category) => category.name === queryString.parse(location.search).type
    )
  }, [productList, categoryList])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data, pagination }: ListResponse<Product> = await productsApi.getAll(filters)
        setProductList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Fail to fetch product list', error)
      }
      ;(scrollRef.current as HTMLDivElement).scrollIntoView({
        behavior: 'smooth',
      })

      setLoading(false)
    })()
  }, [filters])

  useEffect(() => {
    ;(async () => {
      try {
        const { data }: ListResponse<Category> = await categoriesApi.getAll()
        setCategoryList(data)
        // navigate({
        //   pathname: location.pathname,
        //   search: queryString.stringify({ ...filters }),
        // })
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
    ;(scrollRef.current as HTMLDivElement).scrollIntoView({
      behavior: 'smooth',
    })
  }

  const handleOnChange = (newFilters: ListParams) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({ ...filters, ...newFilters }),
    })
  }
  return (
    <Box>
      <Slide
        imageUrl={
          categoryList[indexCategory]
            ? categoryList[indexCategory].slide
            : `${import.meta.env.VITE_TS_PATH}/asset/img/category_slide_1.jpg`
        }
        name={categoryList[indexCategory] ? categoryList[indexCategory].name : 'All'}
      />
      <Box ref={scrollRef}>
        <CurrentPosition current="Products" loading={loading} />
      </Box>

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
          {categoryList[indexCategory] ? categoryList[indexCategory].name : 'All'}
        </Typography>
        <Typography
          sx={{
            color: 'rgb(135,135,135)',
            fontStyle: 'italic',
            fontFamily: `"Libre Baskerville", serif`,
            mb: 3,
          }}
        >
          {categoryList[indexCategory]
            ? categoryList[indexCategory].subTitle
            : 'A place filledwith outstanding styles'}
        </Typography>
      </Box>

      <Container>
        {/* <Paper sx={{ p: 2 }} elevation={1}> */}

        {/* Filters */}
        <Box sx={{ my: 2 }}>
          <ProductListFilter categoryList={categoryList} onChange={handleOnChange} />
        </Box>

        {/* Listing */}
        <Grid container spacing={2}>
          {productList ? (
            productList?.map((product) => (
              <Grid key={product.id} item xs={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))
          ) : (
            <ProductSkeleton length={12} />
          )}
          {productList?.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '134px',
                  height: '134px',
                  '&>img': { width: '100%', height: '100%', objectFit: 'cover' },
                }}
              >
                <img src="/find_no_item.png" alt="find_no_item" />
              </Box>
              <Box sx={{ color: 'rgba(0,0,0,.87)', fontSize: '18px', textAlign: 'center' }}>
                <Typography sx={{ mt: '15px', mb: '10px' }}>Không tìm thấy kết quả nào</Typography>
                <Typography sx={{ color: 'rgba(0,0,0,.54)' }}>
                  Hãy thử sử dụng các từ khóa chung chung hơn
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>

        {/* pagination */}
        {productList?.length !== 0 && (
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
              siblingCount={0}
              onChange={handlePageChange}
            />
          </Box>
        )}

        {/* </Paper> */}
      </Container>
    </Box>
  )
}
