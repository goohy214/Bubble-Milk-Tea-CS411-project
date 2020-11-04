import React from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Edit from './Edit';

function App()  {
  return (
    <BrowserRouter>
     <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/edit" component={Edit} />
    </Switch>
    </BrowserRouter>
);
}

export default App;