import * as React from 'react';
import SidebarComponent from './SidebarComponent';
export default function SidebarContainer(props) {
  // state = {
  //   openSidebar: false,
  //   selecting: 1
  // };
  const [openSidebar, setOpenSidebar] = React.useState(false)
  const [selecting, setSelecting] = React.useState(1)

  const onToggleDrawer = () => {
    setOpenSidebar(!openSidebar)
  }

  const onClickSidebar = action => {
    setSelecting(action)
  }

  React.useEffect(() => {
    // Effect
    const url = window.location.pathname
    const action = url.substr(1)
    if (action === '' || action.startsWith('dashboard')) {
      onClickSidebar('dashboard')
    }
    else if (action.startsWith('contacts')) {
      onClickSidebar('contacts')
    }
    else if (action.startsWith('marketing')) {
      onClickSidebar('marketing-plans')
    }
    else if (action.startsWith('email-templates')) {
      onClickSidebar('email-templates')
    }
    else if (action.startsWith('follow-up-plans')) {
      onClickSidebar('follow-up-plans')
    }
    else if (action.startsWith('campaigns')) {
      onClickSidebar('campaigns')
    }
    else if (action.startsWith('stocks')) {
      onClickSidebar('stocks')
    }
    else if (action.startsWith('products')) {
      onClickSidebar('products')
    }
    else if (action.startsWith('invoices')) {
      onClickSidebar('invoices')
    }
    else if (action.startsWith('orders')) {
      onClickSidebar('orders')
    }
    else if (action.startsWith('deals')) {
      onClickSidebar('deals')
    }
    else if (action.startsWith('reports')) {
      onClickSidebar('reports')
    }
    else if (action.startsWith('inbox')) {
      onClickSidebar('inbox')
    }
    else if (action.startsWith('notes')) {
      onClickSidebar('notes')
    }
    else if (action.startsWith('calendar')) {
      onClickSidebar('calendar')
    }
    else if (action.startsWith('settings')) {
      onClickSidebar('settings')
    }
  })

  return (
    <SidebarComponent
      openSidebar={openSidebar}
      onToggleDrawer={onToggleDrawer}
      user={props.user}
      selecting={selecting}
      onClickSidebar={onClickSidebar}
    />
  )

}
