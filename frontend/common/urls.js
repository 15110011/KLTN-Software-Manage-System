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
export const CONTACT_URL = `${API_URL}contacts`
export const GROUP_URL = `${API_URL}contactgroups`
export const PACKAGES_URL = `${API_URL}packages`
export const CAMPAIGNS_URL = `${API_URL}campaigns`
export const MARKETING_PLANS_URL = `${API_URL}marketing-plans`
export const FOLLOW_UP_PLANS_URL = `${API_URL}follow-up-plans`
export const GET_ACTIONS_URL = `${API_URL}actions`

export { serverUrl, API_URL }
