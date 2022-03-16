import React from 'react'
import {Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'


function App() {
  return (
    <div>
      <NavBar/>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path='/' component={About} exact />
            <Route component={Error} />
          </Switch>
        </header>
      </div>
    </div>
  )
}

export default App;
