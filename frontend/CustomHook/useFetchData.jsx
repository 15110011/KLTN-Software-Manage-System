import * as React from 'react'
import { apiGet } from '../common/Request'
import * as CODE from '../common/Code'

export default function FetchData(inputUrl, history, init = null) {
  const [data, setData] = React.useState(init)
  const [update, setUpdate] = React.useState(1)
  const [url, setUrl] = React.useState(inputUrl)

  const ref = React.useRef();

  const getData = () => {
    apiGet(url, true).then(res => {
      if (res.data.code == CODE.NOT_AUTHORIZED) {
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
