import { unwrapResult } from '@reduxjs/toolkit'
import { getMe } from 'app/authSlice'
import { RootState } from 'app/store'
import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import NotFound from 'components/NotFound/Not-Found'
import LoginPage from 'feature/Auth/components/pages/Login-Page'
import CartFeature from 'feature/Cart/Cart-Feature'
import Delivery from 'feature/HomePage/components/Delivery'
import HomePage from 'feature/HomePage/Home-Page'
import ListingFeature from 'feature/Products'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const cartList = useSelector((state: RootState) => state.auth.user.cartList) || []

  // Configure Firebase.
  const config = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    // ...
  }
  firebase.initializeApp(config)

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user: any) => {
      if (!user) {
        console.log('user is not login')
        return
      }

      try {
        const resultAction = await dispatch(getMe({ ...user.providerData[0], cartList }))
        console.log('user', user)
        const currentUser = unwrapResult<any>(resultAction)
        // const token = await user.getIdToken()
      } catch (error) {
        console.log('Fail to login', error)
      }
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/products/*" element={<ListingFeature />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/carts/*" element={<CartFeature />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {location.pathname !== '/login' && (
        <>
          <Delivery />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
