import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import './App.css'


function App() {
  return (
    <div>
      <NavBar/>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path='/' component={Home} exact />
              <Route component={Error} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </div>
  )
}

export default App;
