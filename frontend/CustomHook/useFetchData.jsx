import * as React from 'react'
import { apiGet, apiPost } from '../common/Request'
import * as CODE from '../common/Code'
import { REFRESH_TOKEN_URL } from '../common/urls'

export default function FetchData(inputUrl, history, init = null) {
  const [data, setData] = React.useState(init)
  const [update, setUpdate] = React.useState(1)
  const [url, setUrl] = React.useState(inputUrl)

  const ref = React.useRef();

  const getData = () => {
    apiGet(url, true).then(res => {
      if (res.data.code == "token_not_valid") {
        apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
          if (res.data.code == "token_not_valid" || res.data.code == CODE.BAD_REQUEST) {
            history.push('/logout')
          }
          else {
            localStorage.setItem("token", res.data.access)
            getData()
          }
        })
      }
      else if (res.data.code == CODE.NOT_AUTHORIZED) {
        history.push('/logout')
      }
      else {
        setData({ ...init, ...res.data })
        ref.current = res.data
      }
    })
  }
  React.useEffect(() => {
    // Effect
    getData()
    // }
  }, [url, update])

  const forceFetchData = () => {
    setUpdate(update + 1)
  }
  return [data, setData, setUrl, forceFetchData]
}
