import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import firebase from 'firebase/compat/app'

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser
  if (currentUser) return currentUser.getIdToken()
  const hasLogin = localStorage.getItem('firebaseui::rememberedAccounts')
  if (!hasLogin) return null

  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null)
    }, 10000)

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      // if (!user) {
      //   reject(null)
      //   return
      // }
      const token = await user?.getIdToken()
      resolve(token)
      unregisterAuthObserver()
      clearTimeout(waitTimer)
    })
  })
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_TS_ECOMMERCE as string,
  headers: {
    'Content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async function (config: AxiosRequestConfig | any) {
    // Do something before request is sent
    const token = await getFirebaseToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
export default axiosClient
