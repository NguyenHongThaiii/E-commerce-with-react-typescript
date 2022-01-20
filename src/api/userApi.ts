import { FirebaseResponse } from '../models'

const userApi = {
  getMe(response: FirebaseResponse): Promise<FirebaseResponse> {
    return new Promise((resolve, reject) => {
      resolve({
        displayName: response.displayName,
        email: response.email,
        uid: response.uid,
        photoURL: response.photoURL,
      })
    })
  },
}

export default userApi
