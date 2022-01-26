import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
import firebase from 'firebase/compat/app'
import { Cart, CartUser, FirebaseResponse } from 'models'
import { getAccount, getCartListOfAccounts, setAccount, setCartListOfAccounts } from 'utils'

export interface AuthState {
  loading: boolean
  error: any
  user: FirebaseResponse
}

export const getMe = createAsyncThunk('auth/fetchAuth', async (payload: FirebaseResponse) => {
  const userFireBase = await userApi.getMe(payload)
  return userFireBase
})

const initialState: AuthState = {
  loading: false,
  error: '',
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    cartList:
      JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts') as string)?.cartList
        ?.length === 0
        ? []
        : JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts') as string)?.cartList,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.loading = true
      firebase.auth().signOut()
      state.user = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
        cartList: [],
      }
      state.loading = false
    },
    addToCart(state: AuthState, action: PayloadAction<Cart>) {
      const isUser = !!JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts') as string)
        ?.email
      if (!isUser) {
        alert('Please login to Firebase')
        return
      }
      const { id } = action.payload
      const uid = getAccount().uid
      const listUserForCartList = getCartListOfAccounts()
      const indexUser = listUserForCartList.findIndex((user: CartUser) => user.uid === uid)
      const index = listUserForCartList[indexUser]?.cartList.findIndex((user: Cart) => {
        return user.id === (id as unknown)
      })
      const indexUserRedux = state.user.cartList.findIndex((cart: Cart) => cart.id === id)
      const newUser: CartUser = {
        uid,
        cartList: [],
      }
      if (indexUser < 0) {
        newUser.cartList.push(action.payload)
        listUserForCartList.push(newUser)
        state.user.cartList.push(action.payload)

        localStorage.setItem(
          'firebaseui::rememberedCartListAccounts',
          JSON.stringify([...listUserForCartList])
        )
        localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify({ ...state.user }))
      } else {
        if (index < 0) {
          state.user.cartList.push(action.payload)
          listUserForCartList[indexUser].cartList.push(action.payload)
        } else {
          state.user.cartList[indexUserRedux].quantity += action.payload.quantity
          listUserForCartList[indexUser].cartList[index] = state.user.cartList[indexUserRedux]
        }
        localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify({ ...state.user }))
        localStorage.setItem(
          'firebaseui::rememberedCartListAccounts',
          JSON.stringify([...listUserForCartList])
        )
      }
    },

    setQuantity(state: AuthState, action: PayloadAction<Cart>) {
      const uid = getAccount().uid
      const listUserForCartList = getCartListOfAccounts()
      const indexUser = listUserForCartList.findIndex((user: CartUser) => user.uid === uid)
      const index = state.user.cartList.findIndex(
        (cart: Cart) => cart.id === (action.payload.id as unknown)
      )
      if (index >= 0) {
        state.user.cartList[index].quantity = action.payload.quantity
        listUserForCartList[indexUser].cartList[index].quantity = action.payload.quantity
        setCartListOfAccounts([...listUserForCartList])
        setAccount({ ...state.user })
      } else {
        return
      }
    },
    removeFromCart(state: AuthState, action: PayloadAction<string | unknown>) {
      const uid = getAccount().uid
      const listUserForCartList = getCartListOfAccounts()
      const indexUser = listUserForCartList.findIndex((user: CartUser) => user.uid === uid)
      const index = state.user.cartList.findIndex(
        (cart: Cart) => cart.id === (action.payload as unknown)
      )
      if (index >= 0) {
        state.user.cartList.splice(index, 1)
        listUserForCartList[indexUser]?.cartList.splice(index, 1)
        setCartListOfAccounts([...listUserForCartList])
        setAccount({ ...state.user })
      } else {
        return
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state: AuthState) => {
      state.loading = true
    })
    builder.addCase(getMe.fulfilled, (state: AuthState, action) => {
      if (!JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts') as string)) {
        localStorage.setItem('firebaseui::rememberedCartListAccounts', JSON.stringify([]))
      }
      state.loading = false
      state.user = action.payload
      const listUserForCartList = JSON.parse(
        localStorage.getItem('firebaseui::rememberedCartListAccounts') as string
      )
      const indexUser = listUserForCartList.findIndex(
        (user: CartUser) => user.uid === action.payload.uid
      )
      if (indexUser >= 0) state.user.cartList = listUserForCartList[indexUser].cartList

      localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(action.payload))
    })
    builder.addCase(getMe.rejected, (state: AuthState, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export const { logout, addToCart, removeFromCart, setQuantity } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer
