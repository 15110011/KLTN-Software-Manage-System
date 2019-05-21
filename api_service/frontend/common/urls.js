const serverUrl = window.location.host.includes('localhost')
  ? 'http://localhost:8000'
  : `${window.location.protocol}//${window.location.host}`

const serverUrl2 = window.location.host.includes('localhost')
  ? 'http://localhost:8001'
  : `${window.location.protocol}//${window.location.host}`

const API_URL = `${serverUrl}/api/v1/`
const API_URL2 = `${serverUrl2}/api/v1/`

export const MeAPI = `${API_URL}me`
export const LogoutURL = `${API_URL}logout`
export const LoginURL = `${API_URL}login`
export const RegisterURL = `${API_URL}register`
export const USER_URL = `${API_URL}users`

export const REFRESH_TOKEN_URL = `${API_URL}token/refresh`


export const PROJECT_URL = `${API_URL}projects`
export const STAFF_URL = `${API_URL}staffs`

export const PRODUCTS_URL = `${API_URL}products`
export const CONTACT_URL = `${API_URL}contacts`
export const GROUP_URL = `${API_URL}contactgroups`
export const PACKAGES_URL = `${API_URL}packages`
export const CAMPAIGNS_URL = `${API_URL}campaigns`
export const ASSIGNED_CAMPAIGNS_URL = `${API_URL}assigned-campaigns`
export const CONTACT_MARKETING_URL = `${API_URL}contact-marketings`

export const ORDER_URL = `${API_URL}orders`
export const ORDER_HISTORY_URL = `${API_URL}orders-histories`
export const ORDER_CHART_URL = `${API_URL}orders-chart`
export const LICENSE_CHART_URL = `${API_URL}licenses-chart`

export const STEP_DETAIL_URL = `${API_URL}step-detail`


export const LICENSE_URL = `${API_URL}licenses`
export const LIFETIME_LICENSE_URL = `${API_URL}lifetime-licenses`

export const NOTES_URL = `${API_URL}notes`
export const MARKETING_PLANS_URL = `${API_URL}marketing-plans`
export const MARKETING_PLANS_CONDITIONS_URL = `${API_URL}marketing-plans-conditions`
export const CONTACTS_MATCH_CONDITIONS_URL = `${API_URL}contacts-match-conditions`
export const FOLLOW_UP_PLANS_URL = `${API_URL}follow-up-plans`
export const PRODUCT_CATEGORIES_URL = `${API_URL}product-categories`
export const PRODUCT_TYPES_URL = `${API_URL}product-types`
export const GET_ACTIONS_URL = `${API_URL}actions`
export const EVENTS_URL = `${API_URL}events`
export const GET_SALE_REPS_URL = `${API_URL}sale-reps`

export const GMAIL_AUTH_URL = `${API_URL}gmail\\auth`
export const GMAIL_SEND_URL = `${API_URL}gmail\\send`
export const SEND_EMAIL = `${API_URL2}send-email`

export const MAIL_TEMPLATES_URL = `${API_URL}mail-templates`

export const WS_NOFICATION_URL = 'ws://localhost:8000/ws/notifications'
export const WS_MAIL_URL = 'ws://localhost:8001/ws/mail-box'


export { serverUrl, API_URL }
