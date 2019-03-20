import * as Cookies from 'js-cookie'
import { STATUS_TOSTRING } from './Code'

export const apiGet = (url, authorization) => {
  const headers = {}
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers
  })
    .then(response => {
      return response.json().then(res => {
        if (!response.ok) {
          return { code: STATUS_TOSTRING[response.status], ...res }
        }
        return res
      })
    })
    .then(res => {
      return ({ data: res })
    })
}
export const apiPost = (url, data, multipart, authorization, others) => {
  const headers = {
    'Content-type': multipart ? 'multipart/form-data' : 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
  if (others) {
    Object.keys(others).forEach(k => {
      if (others[k]) { headers[k] = others[k] }
      else {
        delete headers[k]
      }
    })
  }

  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: headers['Content-type'] !== 'application/json' ? data : JSON.stringify(data)
  })
    .then(response => {
      return response.json().then(res => {
        if (!response.ok) {
          return { code: STATUS_TOSTRING[response.status], ...res }
        }
        return res
      })
    })
    .then(res => ({ data: res }))
}

export const apiPut = (url, data, multipart, authorization) => {
  const headers = {
    'Content-type': multipart ? 'multipart/form-data' : 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: multipart ? data : JSON.stringify(data),
    headers
  })
    .then(response => {
      return response.json().then(res => {
        if (!response.ok) {
          return { code: STATUS_TOSTRING[response.status], ...res }
        }
        return res
      })
    })
    .then(res => ({ data: res }))
}

export const apiPatch = (url, data, authorization) => {
  const headers = {
    'Content-type': multipart ? 'multipart/form-data' : 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    body: multipart ? data : JSON.stringify(data),
    headers
  })
    .then(response => {
      return response.json().then(res => {
        if (!response.ok) {
          return { code: STATUS_TOSTRING[response.status], ...res }
        }
        return res
      })
    })
    .then(res => ({ data: res }))
}

export const apiDelete = (url, authorization) => {
  const headers = {
    'Content-type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers
  })
    .then(response => {
      return response.json().then(res => {
        if (!response.ok) {
          return { code: STATUS_TOSTRING[response.status], ...res }
        }
        return res
      })
    })
    .then(res => ({ data: res }))
}
