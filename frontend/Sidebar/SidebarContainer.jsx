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
    else if (action.startsWith('products')) {
      onClickSidebar('products')
    }
    else if (action.startsWith('contacts')) {
      onClickSidebar('contacts')
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
