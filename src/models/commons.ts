import { Cart } from './cart'

export interface PaginationParams {
  _limit: number
  _page: number
  _totalRows: number
}
export interface ListResponse<T> {
  data: T[]
  pagination: PaginationParams
}

export interface FirebaseResponse {
  displayName: string
  email: string
  photoURL: string
  uid: string
  cartList: Cart[]
}
export interface ListParams {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: string

  [key: string]: any
}

export interface QuantityState {
  quantity: number
}
