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
    if (action === 'projects') {
      setSelecting(1)
    }
    else if (action === 'staffs') {
      setSelecting(2)
    }
  }

  React.useEffect(() => {
    // Effect
    const url = window.location.pathname
    const action = url.substr(1)
    if (action === '' || action.startsWith('projects')) {
      onClickSidebar('projects')
    }
    else if (action.startsWith('staffs')) {
      onClickSidebar('staffs')
    }
  })

  return (
    <SidebarComponent
      openSidebar={openSidebar}
      onToggleDrawer={onToggleDrawer}
      selecting={selecting}
      onClickSidebar={onClickSidebar}
    />
  )

}
