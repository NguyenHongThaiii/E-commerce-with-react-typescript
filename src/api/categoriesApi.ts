import { Category, ListResponse } from '../models'
import axiosClient from './axiosClient'

const categoriesApi = {
  getAll(): Promise<ListResponse<Category>> {
    const url = '/categories'
    return axiosClient.get(url, { params: { _page: 1, _limit: 6 } })
  },
}
export default categoriesApi
