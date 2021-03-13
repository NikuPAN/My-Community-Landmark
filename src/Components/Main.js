import React from 'react'
import { Route, NavLink, HashRouter } from "react-router-dom";

import MapAndSave from './MapAndSave';
import Saved from './Saved';
import About from "./About";

export const Main = () => {
  return (
    <HashRouter>
      <h2>My Community Landmark</h2>
          <ul className="header">
            <li><NavLink exact to="/">Map - Your Location</NavLink></li>
            <li><NavLink to="/saved">Saved Short Notes</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={MapAndSave}/>
            <Route path="/saved" component={Saved}/>
            <Route path="/about" component={About}/>
          </div>
    </HashRouter>
  )
}

export default Main;

