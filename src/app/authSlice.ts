import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
import firebase from 'firebase/compat/app'
import { Cart, FirebaseResponse } from 'models'

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
        ?.user
      if (!isUser) {
        alert('Please login to Firebase')
        return
      }
      const { id } = action.payload
      const index = state.user.cartList.findIndex((cart: Cart) => cart.id === id)
      if (index < 0) {
        state.user.cartList.push(action.payload)
      } else {
        state.user.cartList[index].quantity += action.payload.quantity
      }
      localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(state.user))

      console.log('state', state)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state: AuthState) => {
      state.loading = true
    })
    builder.addCase(getMe.fulfilled, (state: AuthState, action) => {
      state.loading = false
      localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(action.payload))
      console.log(action.payload)
      state.user = action.payload
    })
    builder.addCase(getMe.rejected, (state: AuthState, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export const { logout, addToCart } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer
