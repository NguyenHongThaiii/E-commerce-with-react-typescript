import { Product } from './product'

export interface Cart {
  id: string
  product: Product
  quantity: number
  userID?: string
  fbId?: string
}

export interface CartUser {
  uid: string
  cartList: Cart[]
}
