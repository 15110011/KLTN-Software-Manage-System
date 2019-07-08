import * as Cookies from 'js-cookie';
import { STATUS_TOSTRING } from './Code';
import { flatObject } from './Utils';

export const apiGet = (url, authorization) => {
  const headers = {};
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers,
  })
    .then(response => response.json().then((res) => {
      if (!response.ok) {
        res = flatObject(res, {});
        return { code: STATUS_TOSTRING[response.status], ...res };
      }
      return res;
    }))
    .then(res => ({ data: res }));
};
export const apiPost = (url, data, multipart, authorization, others) => {
  const headers = {
    'Content-type': 'application/json',
  };
  if (others) {
    Object.keys(others).forEach((k) => {
      if (others[k]) {
        headers[k] = others[k];
      } else {
        delete headers[k];
      }
    });
  }

  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers,
    body:
      headers['Content-type'] !== 'application/json'
        ? data
        : JSON.stringify(data),
  })
    .then(response => response.json().then((res) => {
      if (!response.ok) {
        res = flatObject(res, {});
        return { code: STATUS_TOSTRING[response.status], ...res };
      }
      return res;
    }))
    .then(res => ({ data: res }));
};

export const apiPut = (url, data, multipart, authorization) => {
  const headers = {
    'Content-type': multipart ? 'multipart/form-data' : 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
  };
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: multipart ? data : JSON.stringify(data),
    headers,
  })
    .then(response => response.json().then((res) => {
      if (!response.ok) {
        res = flatObject(res, {});
        return { code: STATUS_TOSTRING[response.status], ...res };
      }
      return res;
    }))
    .then(res => ({ data: res }));
};

export const apiPatch = (url, data, multipart, authorization) => {
  const headers = {
    'Content-type': multipart ? 'multipart/form-data' : 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
  };
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    body: multipart ? data : JSON.stringify(data),
    headers,
  })
    .then(response => response.json().then((res) => {
      if (!response.ok) {
        res = flatObject(res, {});
        return { code: STATUS_TOSTRING[response.status], ...res };
      }
      return res;
    }))
    .then(res => ({ data: res }));
};

export const apiDelete = (url, data, authorization) => {
  const headers = {
    'Content-type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
  };
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    body: JSON.stringify(data),
    headers,
  })
    .then(response => response.json().then((res) => {
      if (!response.ok) {
        res = flatObject(res, {});
        return { code: STATUS_TOSTRING[response.status], ...res };
      }
      return res;
    }))
    .then(res => ({ data: res }));
};

export const apiFile = (url, method, data, authorization) => {
  const headers = {};
  if (authorization) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return fetch(url, {
    method,
    credentials: 'include',
    headers,
    body: data,
  })
    .then(response => response.json().then((res) => {
      if (!response.ok) {
        res = flatObject(res, {});
        return { code: STATUS_TOSTRING[response.status], ...res };
      }
      return res;
    }))
    .then(res => ({ data: res }));
};
