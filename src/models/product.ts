export interface Product {
  id: string | number
  name: string
  imageUrl: any
  description: string
  status: boolean
  trending: boolean
  categoryId: string
  mountSold: number
  price: number

  createdAt: number
  updatedAt: number
}
