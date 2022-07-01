export interface Product {
  id: string
  name: string
  imageUrl: string
  description: string
  status: boolean
  trending: boolean
  categoryId: string
  mountSold: number
  price: number
  type: string
  sliderList: string[]
  createdAt: number
  updatedAt: number
}
