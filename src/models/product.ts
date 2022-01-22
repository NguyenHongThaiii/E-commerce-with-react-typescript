export interface Product {
  id: string
  name: string
  imageUrl: any
  description: string
  status: boolean
  trending: boolean
  categoryId: string
  mountSold: number
  price: number
  sliderList: string[]
  createdAt: number
  updatedAt: number
}