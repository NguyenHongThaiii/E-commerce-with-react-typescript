import { ListParams, ListResponse, Product } from 'models'
import axiosClient from './axiosClient'

const productsApi = {
  getAll(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/products'
    return axiosClient.get(url, { params })
  },
  getById(id: string): Promise<Product> {
    const url = `/products/${id}`
    return axiosClient.get(url)
  },
}
export default productsApi
