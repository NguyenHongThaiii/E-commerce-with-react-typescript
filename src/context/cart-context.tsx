import { Cart } from 'models'
import { createContext, ReactChild, useContext } from 'react'

export const CartContext = createContext([])
type CartProviderProps = {
  state: Cart[]
  children: ReactChild
}
const CartProvider = (props: CartProviderProps) => {
  return <CartContext.Provider value={props.state as any}>{props.children}</CartContext.Provider>
}

const useCartContext = () => {
  const context = useContext(CartContext)

  if (typeof context === 'undefined')
    throw new Error('useCartContext musted be within CartProvider')

  return context
}

export { useCartContext, CartProvider }
