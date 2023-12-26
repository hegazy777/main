export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'https://tqneen-rlyoguxn5a-uc.a.run.app/api/admin/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
