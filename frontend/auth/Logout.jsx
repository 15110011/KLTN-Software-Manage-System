import * as React from 'react'

import { apiGet } from '../common/Request'
import { LogoutURL } from '../common/urls'
import { } from '../components/UserContext'

export default class Logout extends React.Component {
  componentDidMount() {
    console.log(1)
    apiGet(LogoutURL).then(res => {
      this.props.history.push('/login')
      this.props.setUser({})

    })
  }

  render() {
    return <div>Sign out...</div>
  }
}
