import React from 'react'
import { Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Error from './components/Error'
import './App.css'
import './assets/css/dev-support.scss'


function App() {
  return (
    <div className='devHelpTool'>
      <NavBar/>
      <div className="App mainBody">
        <Routes>
          <Route path='/Home' element={<Home />} exact />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
