import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

export const facebookProvider = new FacebookAuthProvider()
facebookProvider.addScope('email')
facebookProvider.addScope('public_profile')

// export const gitHubProvider = new GithubAuthProvider()
// export const googleProvider = new GoogleAuthProvider()
