export interface Category {
  id: number | string
  name: string
  imageUrl: string
  slide: string
  subTitle: string
  [key: string]: string | number
}
