import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import List from './pages/List'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StreetArtDetail from './pages/StreetArtDetail'
import NewStreetArt from './pages/NewStreetArt'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/list" component={List} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/new-street-art" component={NewStreetArt} />
        <Route
          path="/street-art-detail/:streetArtId"
          component={StreetArtDetail}
        />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </div>
  )
}
