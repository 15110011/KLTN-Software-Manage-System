const serverUrl = window.location.host.includes('localhost')
  ? 'http://localhost:8000'
  : `${window.location.protocol}//${window.location.host}`

const API_URL = `${serverUrl}/api/v1/`

export const MeAPI = `${API_URL}me`
export const LogoutURL = `${API_URL}logout`
export const LoginURL = `${API_URL}login`
export const RegisterURL = `${API_URL}register`

export const REFRESH_TOKEN_URL = `${API_URL}token/refresh`


export const PROJECT_URL = `${API_URL}projects`
export const STAFF_URL = `${API_URL}staffs`

export const PRODUCTS_URL = `${API_URL}products`
export const PACKAGES_URL = `${API_URL}packages`

export { serverUrl, API_URL }
