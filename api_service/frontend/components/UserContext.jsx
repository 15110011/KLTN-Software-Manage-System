import * as React from 'react'

const USER_CONTEXT = React.createContext({
  user: null,
  setUser: () => {
    
  },
})

export default USER_CONTEXT;
