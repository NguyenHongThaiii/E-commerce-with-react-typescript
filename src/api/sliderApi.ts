import { ListResponse, Slider } from '../models'
import axiosClient from './axiosClient'

const sliderApi = {
  getAll(): Promise<ListResponse<Slider>> {
    const url = '/sliders'
    return axiosClient.get(url, { params: { _page: 1, _limit: 5 } })
  },
}
export default sliderApi
