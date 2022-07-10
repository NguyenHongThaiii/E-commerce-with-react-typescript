import { createSelector } from '@reduxjs/toolkit'
import { AuthState } from 'app/authSlice'
import { RootState } from 'app/store'

const cartListSelect = (state: RootState) => state.auth

export const totalProductListCost = createSelector(cartListSelect, (items: AuthState) =>
  items.user.cartList?.reduce(
    (subtotal, item) => +subtotal + +item.product.price * item.quantity,
    0
  )
)
export const totalProductListQuantity = createSelector(cartListSelect, (items: AuthState) =>
  items.user.cartList?.reduce((subtotal, item) => +subtotal + +item.quantity, 0)
)
