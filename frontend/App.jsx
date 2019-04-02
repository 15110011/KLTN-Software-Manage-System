import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThroughProvider } from 'react-through'
import {
  BrowserRouter
} from 'react-router-dom'
import Content from './Content'
import './assets/index.css'

const ProvidedContent = () => (
  <BrowserRouter>
    <ThroughProvider>
      <Content />
    </ThroughProvider>
  </BrowserRouter>
)

ReactDOM.render(<ProvidedContent />, document.getElementById('app'))
