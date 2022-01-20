import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firebase from 'firebase/compat/app'
import userApi from './../api/userApi'
import { FirebaseResponse } from './../models'

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
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.loading = true
      localStorage.removeItem('firebaseui::rememberedAccounts')
      firebase.auth().signOut()
      state.user = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
      }
      setTimeout(() => {
        state.loading = false
      }, 1000)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state: AuthState) => {
      state.loading = true
    })
    builder.addCase(getMe.fulfilled, (state: AuthState, action) => {
      state.loading = false
      localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(action.payload))
      state.user = action.payload
    })
    builder.addCase(getMe.rejected, (state: AuthState, action) => {
      state.loading = false
      state.error = action.error
    })
  },
})

export const { logout } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer
