
import { useState } from 'react'
import './App.css'
import { Landing } from './page/Landing'
import { Index } from './page/Index'
import { IndexExample } from './page/IndexExample'

function App() {
  const [showCatalog, setShowCatalog] = useState(false)

  return showCatalog ? <Index onBackToLanding={() => setShowCatalog(false)} /> : <Landing onStartClick={() => setShowCatalog(true)} />
}

export default App
